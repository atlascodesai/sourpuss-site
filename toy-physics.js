(function (root) {
    const MAX_ANGLE = 0.63;
    function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
    function advance(state, seconds) {
        const dt = clamp(seconds, 0, 0.032);
        let velocity = (state.velocity - Math.sin(state.angle) * 18 * dt) * Math.exp(-0.65 * dt);
        let angle = state.angle + velocity * dt;
        if (Math.abs(angle) > MAX_ANGLE) {
            angle = Math.sign(angle) * MAX_ANGLE;
            if (Math.sign(velocity) === Math.sign(angle)) velocity *= -0.55;
        }
        if (Math.abs(angle) < 0.001 && Math.abs(velocity) < 0.005) return { angle: 0, velocity: 0 };
        return { angle, velocity };
    }
    const physics = { advance, clamp, MAX_ANGLE };
    if (typeof module !== 'undefined') module.exports = physics;
    else root.ToyPhysics = physics;
})(typeof window !== 'undefined' ? window : {});
