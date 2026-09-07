(function (root) {
    const MAX_ANGLE = 0.95;
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
    function brushImpulse(from, to, ball) {
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < 1) return 0;
        const along = clamp(((ball.x - from.x) * dx + (ball.y - from.y) * dy) / distanceSquared, 0, 1);
        const distance = Math.hypot(from.x + along * dx - ball.x, from.y + along * dy - ball.y);
        if (distance > ball.radius) return 0;
        let direction = Math.sign(dx);
        if (Math.abs(dx) < 2) direction = to.x < ball.x ? 1 : -1;
        const speed = Math.sqrt(distanceSquared) / Math.max(8, to.time - from.time);
        return direction * clamp(speed * 1.2, 0.15, 2.8);
    }
    const physics = { advance, clamp, brushImpulse, MAX_ANGLE };
    if (typeof module !== 'undefined') module.exports = physics;
    else root.ToyPhysics = physics;
})(typeof window !== 'undefined' ? window : {});
