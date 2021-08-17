import { defineSystem } from "bitecs";

export const timeSystem = defineSystem((world) => {
    const { time } = world;
    const now = performance.now();
    const delta = now - time.then;
    time.delta = delta;
    time.elapsed += delta;
    time.then = now;

    return world;
});
