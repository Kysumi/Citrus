import * as PIXI from "pixi.js";
import "./style.css";
import { renderGrid } from "./grid/gridRenderer";
import { loadSprites } from "./asset-loaders/spriteLoader";
import { Actor } from "./actor/actor";
import { Container } from "pixi.js";
import { createWorld, addComponent, pipe } from "bitecs";
import { movedTransformSystem, movementSystem } from "./ecs/systems/movement/movement";
import { timeSystem } from "./ecs/systems/time/time";
import { PCTag } from "./ecs/systems/tags";
import { playerControllerSystem } from "./ecs/systems/movement/playerControl";
import { cameraFollowSystem } from "./ecs/systems/camera/follow";

const world = createWorld();
world.time = { delta: 0, elapsed: 0, then: performance.now() };

const pipeline = pipe(playerControllerSystem, movementSystem, movedTransformSystem, cameraFollowSystem, timeSystem);

export const Actors = new Map<number, Actor>();

setInterval(() => {
    pipeline(world);
}, 16);

export const gameWidth = 800;
export const gameHeight = 600;

const app = new PIXI.Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

const stage = app.stage;
export const gameContainer = new Container();

window.onload = async (): Promise<void> => {
    try {
        await loadSprites();
    } catch (e) {
        console.log(e);
    }

    document.body.appendChild(app.view);

    renderGrid({ x: 5, y: 5 }, gameContainer, false);

    const actor = new Actor({ x: 10, y: 10 }, { x: 32, y: 32 }, world);
    addComponent(world, PCTag, actor.eid);
    Actors.set(actor.eid, actor);

    gameContainer.addChild(actor.getGraphics());

    stage.addChild(gameContainer);
};
