import { defineQuery, defineSystem } from "bitecs";
import { Position, Velocity } from "./types";

const movementQuery = defineQuery([Position, Velocity]);

export const movementSystem = defineSystem((world) => {
    const ents = movementQuery(world);
    for (let i = 0; i < ents.length; i++) {
        const eid = ents[i];
        Position.x[eid] += Velocity.x[eid];
        Position.y[eid] += Velocity.y[eid];
        Position.z[eid] += Velocity.z[eid];
    }
    return world;
});
