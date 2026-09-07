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
test('brushing across the ball adds momentum in either direction', function () {
    const { brushImpulse } = require('./toy-physics');
    const ball = { x: 160, y: 160, radius: 40 };
    assert.ok(brushImpulse({ x: 80, y: 160, time: 0 }, { x: 240, y: 160, time: 50 }, ball) > 0);
    assert.ok(brushImpulse({ x: 240, y: 160, time: 0 }, { x: 80, y: 160, time: 50 }, ball) < 0);
    assert.equal(brushImpulse({ x: 80, y: 250, time: 0 }, { x: 240, y: 250, time: 50 }, ball), 0);
});
test('mouse movement alone swats the ball, including the first hover event', function () {
    const vm = require('node:vm');
    const fs = require('node:fs');
    const handlers = {};
    const frames = [];
    const ball = { style: {}, getBoundingClientRect() { return { left: 127.5, top: 127.5, width: 65, height: 65 }; } };
    const string = { setAttribute() {} };
    const toy = { querySelector(selector) { return selector === '.toy-ball' ? ball : string; } };
    vm.runInNewContext(fs.readFileSync(require.resolve('./app.js'), 'utf8'), {
        window: { SITE_CONFIG: { catToy: { enabled: true } }, ToyPhysics: require('./toy-physics'), matchMedia() { return { matches: false, addEventListener() {} }; } },
        document: { hidden: false, querySelectorAll() { return []; }, getElementById() { return toy; }, addEventListener(type, callback) { handlers[type] = callback; } },
        requestAnimationFrame(callback) { frames.push(callback); return frames.length; }, cancelAnimationFrame() {}, performance: { now() { return 0; } }
    });
    assert.equal(handlers.click, undefined);
    assert.equal(handlers.mousedown, undefined);
    handlers.mousemove({ clientX: 140, clientY: 160, buttons: 0 });
    assert.equal(frames.length, 1);
    frames.shift()(16);
    assert.notEqual(ball.style.left, '50%');
});
