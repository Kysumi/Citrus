import * as PIXI from "pixi.js";
import "./style.css";

import { renderGrid } from "./grid/gridRenderer";

//https://www.html5gamedevs.com/topic/42741-fast-pixi-tilemap-renderer-trying-to-fix/
// http://free-tex-packer.com https://www.codeandweb.com/texturepacker

declare const VERSION: string;

const gameWidth = 800;
const gameHeight = 600;

const app = new PIXI.Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

const stage = app.stage;

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view);

    // const birdFromSprite = getBird();
    // birdFromSprite.anchor.set(0.5, 0.5);
    // birdFromSprite.position.set(gameWidth / 2, gameHeight / 2);

    // stage.addChild(birdFromSprite);

    renderGrid({ x: 5, y: 5 }, app);
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = PIXI.Loader.shared;
        loader.add("rabbit", "./assets/simpleSpriteSheet.json");

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

function getBird(): PIXI.AnimatedSprite {
    const bird = new PIXI.AnimatedSprite([
        PIXI.Texture.from("birdUp.png"),
        PIXI.Texture.from("birdMiddle.png"),
        PIXI.Texture.from("birdDown.png"),
    ]);

    bird.loop = true;
    bird.animationSpeed = 0.1;
    bird.play();
    bird.scale.set(3);

    return bird;
}
