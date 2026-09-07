const { test } = require('node:test');
const assert = require('node:assert/strict');
const { advance, MAX_ANGLE } = require('./toy-physics');
test('a thrown ball stays bounded and eventually comes to rest', function () {
    let state = { angle: 1.2, velocity: 7 };
    for (let i = 0; i < 12000; i++) {
        state = advance(state, 1 / 60);
        assert.ok(Number.isFinite(state.angle));
        assert.ok(Math.abs(state.angle) <= MAX_ANGLE);
    }
    assert.deepEqual(state, { angle: 0, velocity: 0 });
});
test('a delayed frame cannot launch the ball out of bounds', function () {
    assert.deepEqual(advance({ angle: 0.5, velocity: 3 }, 60), advance({ angle: 0.5, velocity: 3 }, 0.032));
});
test('gravity brings a released ball toward its resting point', function () {
    const state = advance({ angle: 0.5, velocity: 0 }, 1 / 60);
    assert.ok(state.angle < 0.5 && state.velocity < 0);
});
test('reduced motion accepts keyboard play without starting animation', function () {
    const vm = require('node:vm');
    const fs = require('node:fs');
    const handlers = {};
    const ball = { style: {}, addEventListener(type, fn) { handlers[type] = fn; } };
    const string = { setAttribute() {} };
    const toy = { querySelector(selector) { return selector === '.toy-ball' ? ball : string; } };
    let frames = 0;
    vm.runInNewContext(fs.readFileSync(require.resolve('./app.js'), 'utf8'), {
        window: { SITE_CONFIG: { catToy: { enabled: true } }, ToyPhysics: require('./toy-physics'), matchMedia() { return { matches: true, addEventListener() {} }; } },
        document: { hidden: false, querySelectorAll() { return []; }, getElementById() { return toy; }, addEventListener() {} },
        requestAnimationFrame() { frames++; }, cancelAnimationFrame() {}, performance: { now() { return 0; } }
    });
    handlers.keydown({ key: 'ArrowRight', preventDefault() {} });
    assert.equal(frames, 0);
    assert.equal(ball.style.left, '50%');
});
