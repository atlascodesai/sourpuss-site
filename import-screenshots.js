#!/usr/bin/env node
// Import exact San-rendered artwork only after per-image visual review.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const bundle = path.resolve(process.argv[2] || '');
const reviewPath = process.argv[3];
const phoneOnly = process.argv[4] === '--iphone-only';
if (process.argv[4] && !phoneOnly) throw new Error('Unknown screenshot import option.');
const devices = phoneOnly ? [['iphone', 'iphone-6.9']] : [['iphone', 'iphone-6.9'], ['ipad', 'ipad-13']];
if (!process.argv[2] || !reviewPath) throw new Error('Provide San artwork directory and exact-image visual review JSON.');
const manifest = JSON.parse(fs.readFileSync(path.join(bundle, 'release-manifest.json'), 'utf8'));
const reviews = JSON.parse(fs.readFileSync(reviewPath, 'utf8'));
const digest = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
if (manifest.source?.dirty !== false || !manifest.source?.commit) throw new Error('Clean source-bound San artwork required.');
const files = [];
for (const locale of ['en-US', 'es-ES']) {
  const configFile = locale === 'en-US' ? 'screenshot-features.json' : 'screenshot-features.es.json';
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, configFile), 'utf8'));
  if (config.locale !== locale) throw new Error('Wrong feature language.');
  for (const feature of config.features) {
    feature.images = {};
    for (const [device, profile] of devices) {
      const items = manifest.artifacts.filter(item => item.locale === locale && item.screen === feature.id && item.profile === profile);
      if (items.length !== 1) throw new Error(`Expected exactly one image for ${locale}/${feature.id}/${profile}.`);
      const item = items[0];
      const source = path.resolve(bundle, item.outputRelativePath);
      if (!source.startsWith(bundle + path.sep)) throw new Error('Invalid image path.');
      if (digest(source) !== item.outputSHA256) throw new Error('Artwork changed after San rendering.');
      const review = reviews.images.find(row => row.sha256 === item.outputSHA256);
      if (review?.verdict !== 'accept') throw new Error(`Visual review missing for ${item.outputRelativePath}.`);
      const destination = `screenshots/${locale}/${feature.id}-${device}.png`;
      files.push({ source, destination });
      feature.images[device] = '/' + destination;
    }
    feature.image = feature.images.iphone;
    feature.captureState = phoneOnly ? 'iphone-reviewed-ipad-pending' : 'visually-reviewed';
    feature.captureSourceCommit = manifest.source.commit;
  }
  files.push({ destination: configFile, content: JSON.stringify(config, null, 2) + '\n' });
}
// Validate the entire locale/device matrix before changing site assets or configuration.
for (const file of files) {
  const destination = path.join(__dirname, file.destination);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  if (file.source) fs.copyFileSync(file.source, destination);
  else fs.writeFileSync(destination, file.content);
}
fs.mkdirSync(path.join(__dirname, 'screenshots'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'screenshots/provenance.json'), JSON.stringify({ source: manifest.source, runID: manifest.runID, pendingProfiles: phoneOnly ? ['ipad-13'] : [], images: reviews.images }, null, 2) + '\n');
console.log(`Imported ${phoneOnly ? 8 : 16} visually reviewed screenshots with matching English/Spanish images.${phoneOnly ? ' iPad screenshots remain pending.' : ''}`);
