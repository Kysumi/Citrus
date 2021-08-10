import * as PIXI from "pixi.js";
import "./style.css";

//https://www.html5gamedevs.com/topic/42741-fast-pixi-tilemap-renderer-trying-to-fix/

declare const VERSION: string;

const gameWidth = 800;
const gameHeight = 600;

let gridContainer = new PIXI.Container();
const cellSize = 10;
const iterations = 100;

const canvasWidth = (iterations * 2 + 4) * cellSize;

const app = new PIXI.Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

const stage = app.stage;

window.onload = async (): Promise<void> => {
    await loadGameAssets();

    document.body.appendChild(app.view);

    resizeCanvas();

    const birdFromSprite = getBird();
    birdFromSprite.anchor.set(0.5, 0.5);
    birdFromSprite.position.set(gameWidth / 2, gameHeight / 2);

    stage.addChild(birdFromSprite);
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

function resizeCanvas(): void {
    const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        app.stage.scale.x = window.innerWidth / gameWidth;
        app.stage.scale.y = window.innerHeight / gameHeight;
    };

    resize();

    window.addEventListener("resize", resize);
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

updateGridAlgorithm(true, iterations);

function updateGridAlgorithm(showGrid, iterations) {
    if (gridContainer) {
        app.stage.removeChild(gridContainer);
    }

    gridContainer = new PIXI.Container();

    if (showGrid) {
        drawNewGrid(iterations, gridContainer);
    }

    app.stage.addChild(gridContainer);
}

function drawNewGrid(iterations, gridContainer) {
    const gridWidth = iterations * 2 + 1;
    const startX = canvasWidth / 2 - (gridWidth / 2) * cellSize;
    const startY = 20;

    for (let x = 0; x < iterations; x++) {
        for (let y = 0; y < gridWidth; y++) {
            const rectangle = new PIXI.Graphics();

            rectangle.lineStyle(0.5, 0x999999);
            rectangle.beginFill(x % 2 ? 0xf0f8ff : 0xfff0f8);
            rectangle.drawRect(startX + x * cellSize, startY + y * cellSize, cellSize, cellSize);
            rectangle.endFill();

            gridContainer.addChild(rectangle);
        }
    }
}
