import * as PIXI from "pixi.js";
import "./style.css";
import { renderGrid } from "./grid/gridRenderer";
import { loadSprites } from "./asset-loaders/spriteLoader";

//https://www.html5gamedevs.com/topic/42741-fast-pixi-tilemap-renderer-trying-to-fix/

const gameWidth = 800;
const gameHeight = 600;

const app = new PIXI.Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

const stage = app.stage;

window.onload = async (): Promise<void> => {
    try {
        await loadSprites();
    } catch (e) {
        console.log(e);
    }

    document.body.appendChild(app.view);

    renderGrid({ x: 5, y: 5 }, stage);
};
