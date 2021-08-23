import { defineQuery, defineSystem } from "bitecs";
import { Actors, gameContainer, gameHeight, gameWidth } from "../../..";
import { PCTag } from "../tags";

const findFocus = defineQuery([PCTag]);

export const cameraFollowSystem = defineSystem((world) => {
    const ents = findFocus(world);

    if (ents.length === 0 || ents.length > 1) {
        throw new Error("Something is really worng... More than one PC tagged object");
    }

    const eid = ents[0];

    const actor = Actors.get(eid);

    if (actor === undefined) {
        throw new Error(`Something is really worng... No Actor with EID: ${eid}`);
    }

    gameContainer.pivot.x = actor.getGraphics().x;
    gameContainer.pivot.y = actor.getGraphics().y;

    gameContainer.position.x = gameWidth / 2;
    gameContainer.position.y = gameHeight / 2;

    return world;
});
