import * as PIXI from "pixi.js";
import "./style.css";
import { renderGrid } from "./grid/gridRenderer";
import { loadSprites } from "./asset-loaders/spriteLoader";
import { Actor } from "./actor/actor";
import { Container } from "pixi.js";
import { createWorld, Types, defineComponent, defineQuery, addEntity, addComponent, defineSystem, pipe } from "bitecs";

const Vector3 = { x: Types.f32, y: Types.f32, z: Types.f32 };
const Position = defineComponent(Vector3);
const Velocity = defineComponent(Vector3);

const movementQuery = defineQuery([Position, Velocity]);

const movementSystem = defineSystem((world) => {
    const ents = movementQuery(world);
    for (let i = 0; i < ents.length; i++) {
        const eid = ents[i];
        Position.x[eid] += Velocity.x[eid];
        Position.y[eid] += Velocity.y[eid];
        Position.z[eid] += Velocity.z[eid];
    }
    return world;
});

const timeSystem = defineSystem((world) => {
    const { time } = world;
    const now = performance.now();
    const delta = now - time.then;
    time.delta = delta;
    time.elapsed += delta;
    time.then = now;

    return world;
});

const pipeline = pipe(movementSystem, timeSystem);

const world = createWorld();
world.time = { delta: 0, elapsed: 0, then: performance.now() };

const eid = addEntity(world);
addComponent(world, Position, eid);
addComponent(world, Velocity, eid);

setInterval(() => {
    pipeline(world);
}, 16);

//https://www.html5gamedevs.com/topic/42741-fast-pixi-tilemap-renderer-trying-to-fix/

const gameWidth = 800;
const gameHeight = 600;

const app = new PIXI.Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

const stage = app.stage;
const gameContainer = new Container();

window.onload = async (): Promise<void> => {
    try {
        await loadSprites();
    } catch (e) {
        console.log(e);
    }

    document.body.appendChild(app.view);

    renderGrid({ x: 5, y: 5 }, gameContainer);

    const actor = new Actor({ x: 10, y: 10 }, { x: 32, y: 32 });
    gameContainer.addChild(actor.getGraphics());

    stage.scale.x = 0.7;
    stage.scale.y = 0.7;
    stage.addChild(gameContainer);
};
