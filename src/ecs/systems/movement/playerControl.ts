import { defineQuery, defineSystem } from "bitecs";
import { KeyListenerInstance } from "../../../keyListener/keyListener";
import { PCTag } from "../tags";
import { Position, Velocity } from "./types";

const MOVE_SPEED = 4;

const playerControllerQuery = defineQuery([PCTag, Position, Velocity]);

export const playerControllerSystem = defineSystem((world) => {
    const ents = playerControllerQuery(world);
    const input = KeyListenerInstance.state;

    for (let i = 0; i < ents.length; i++) {
        const eid = ents[i];

        Velocity.x[eid] = 0;
        Velocity.y[eid] = 0;

        if (input.has("d")) {
            Velocity.x[eid] = MOVE_SPEED;
        }

        if (input.has("a")) {
            Velocity.x[eid] = -MOVE_SPEED;
        }

        if (input.has("w")) {
            Velocity.y[eid] = -MOVE_SPEED;
        }
        if (input.has("s")) {
            Velocity.y[eid] = MOVE_SPEED;
        }
    }
    return world;
});
