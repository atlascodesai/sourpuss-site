const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sourpuss-site-import-'));
  fs.copyFileSync(path.join(__dirname, 'import-screenshots.js'), path.join(root, 'import-screenshots.js'));
  const bundle = path.join(root, 'bundle'); fs.mkdirSync(bundle);
  const manifest = { source: { commit: 'candidate-sha', dirty: false }, artifacts: [] };
  const review = { images: [] };
  for (const locale of ['en-US', 'es-ES']) {
    const config = { locale, features: ['explore', 'journal', 'compare', 'saved'].map(id => ({ id, image: null })) };
    fs.writeFileSync(path.join(root, locale === 'en-US' ? 'screenshot-features.json' : 'screenshot-features.es.json'), JSON.stringify(config));
    for (const screen of config.features.map(f => f.id)) for (const profile of ['iphone-6.9', 'ipad-13']) {
      const outputRelativePath = `${locale}-${screen}-${profile}.png`;
      const bytes = Buffer.from(outputRelativePath);
      const outputSHA256 = crypto.createHash('sha256').update(bytes).digest('hex');
      fs.writeFileSync(path.join(bundle, outputRelativePath), bytes);
      manifest.artifacts.push({ locale, screen, profile, outputRelativePath, outputSHA256 });
      review.images.push({ sha256: outputSHA256, verdict: 'accept' });
    }
  }
  function run(options = []) {
    fs.writeFileSync(path.join(bundle, 'release-manifest.json'), JSON.stringify(manifest));
    fs.writeFileSync(path.join(root, 'review.json'), JSON.stringify(review));
    return spawnSync(process.execPath, [path.join(root, 'import-screenshots.js'), bundle, path.join(root, 'review.json'), ...options]);
  }
  return { root, bundle, manifest, review, run, cleanup: () => fs.rmSync(root, { recursive: true, force: true }) };
}
test('imports the exact bilingual device matrix and provenance', () => {
  const f = fixture(); try {
    assert.equal(f.run().status, 0);
    const config = JSON.parse(fs.readFileSync(path.join(f.root, 'screenshot-features.es.json')));
    assert.equal(config.features[0].images.iphone, '/screenshots/es-ES/explore-iphone.png');
    assert.equal(config.features[0].images.ipad, '/screenshots/es-ES/explore-ipad.png');
    assert.equal(config.features[0].captureSourceCommit, 'candidate-sha');
  } finally { f.cleanup(); }
});
test('missing Spanish iPad image fails before any site changes', () => {
  const f = fixture(); try {
    f.manifest.artifacts.pop(); assert.notEqual(f.run().status, 0);
    assert.equal(fs.existsSync(path.join(f.root, 'screenshots')), false);
    assert.equal(JSON.parse(fs.readFileSync(path.join(f.root, 'screenshot-features.json'))).features[0].image, null);
  } finally { f.cleanup(); }
});
test('changed artwork and unreviewed artwork are rejected', () => {
  const f = fixture(); try {
    f.review.images[0].verdict = 'reject'; assert.notEqual(f.run().status, 0);
    f.review.images[0].verdict = 'accept';
    fs.writeFileSync(path.join(f.bundle, f.manifest.artifacts[0].outputRelativePath), 'changed');
    assert.notEqual(f.run().status, 0);
    assert.equal(fs.existsSync(path.join(f.root, 'screenshots')), false);
  } finally { f.cleanup(); }
});

test('explicit phone-only import records iPad as pending and still requires both languages', () => {
  const f = fixture(); try {
    f.manifest.artifacts = f.manifest.artifacts.filter(item => item.profile === 'iphone-6.9');
    assert.notEqual(f.run().status, 0);
    assert.equal(f.run(['--iphone-only']).status, 0);
    const config = JSON.parse(fs.readFileSync(path.join(f.root, 'screenshot-features.es.json')));
    assert.equal(config.features[0].images.ipad, undefined);
    assert.equal(config.features[0].captureState, 'iphone-reviewed-ipad-pending');
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(f.root, 'screenshots/provenance.json'))).pendingProfiles, ['ipad-13']);
  } finally { f.cleanup(); }
  const missing = fixture(); try {
    missing.manifest.artifacts = missing.manifest.artifacts.filter(item => item.locale !== 'es-ES');
    assert.notEqual(missing.run(['--iphone-only']).status, 0);
    assert.equal(fs.existsSync(path.join(missing.root, 'screenshots')), false);
  } finally { missing.cleanup(); }
});
