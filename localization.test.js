const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
for (const page of ["", "privacy/", "support/"]) {
  test(`Spanish ${page || "home"} has localized navigation and matching alternates`, () => {
    const html = fs.readFileSync(`es/${page}index.html`, "utf8");
    assert.ok(html.includes('<html lang="es">'));
    assert.ok(html.includes(`href="https://sourpuss.app/es/${page}"`));
    assert.ok(html.includes(`href="/${page}" lang="en"`));
    assert.ok(!html.includes("In development for iPhone."));
    assert.ok(!html.includes("CONTACT_EMAIL_PLACEHOLDER"));
    assert.ok(html.includes('href="/logo.png"'));
  });
}
test("English and Spanish privacy and support have matching section counts", () => {
  const en = require("./config");
  const es = require("./config.es");
  assert.equal(en.privacy.sections.length, es.privacy.sections.length);
  assert.equal(en.support.faqs.length, es.support.faqs.length);
});
test("sitemap includes every language and page", () => {
  const xml = fs.readFileSync("sitemap.xml", "utf8");
  for (const prefix of ["", "es/"])
    for (const page of ["", "privacy/", "support/"])
      assert.ok(xml.includes(`https://sourpuss.app/${prefix}${page}</loc>`));
});
