import * as PIXI from "pixi.js";
import "./style.css";
import { renderGrid } from "./grid/gridRenderer";
import { loadSprites } from "./asset-loaders/spriteLoader";
import { Actor } from "./actor/actor";
import { Container } from "pixi.js";

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
