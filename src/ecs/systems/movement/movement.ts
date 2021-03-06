import { Changed, defineQuery, defineSystem } from "bitecs";
import { Actors } from "../../..";
import { Position, Velocity } from "./types";

const movementQuery = defineQuery([Position, Velocity]);

export const movementSystem = defineSystem((world) => {
    const ents = movementQuery(world);
    for (let i = 0; i < ents.length; i++) {
        const eid = ents[i];

        Position.x[eid] += Velocity.x[eid];
        Position.y[eid] += Velocity.y[eid];
    }
    return world;
});

const changedPositionQuery = defineQuery([Changed(Position)]);

export const movedTransformSystem = defineSystem((world) => {
    const ents = changedPositionQuery(world);
    for (let i = 0; i < ents.length; i++) {
        const actor = Actors.get(ents[i]);
        actor?.update();
    }
    return world;
});
