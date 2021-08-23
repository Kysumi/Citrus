import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { getRandomIntInclusive } from "../helpers/random";
import { Vec2 } from "../vector/vec";

let gridContainer: Container;

const TILE_SIZE = 32;
const CHUNK_SIZE = 10;

const CHUNK_COUNT = 5;
const CHUNK_WIDTH = CHUNK_SIZE * TILE_SIZE;

function getChunkOffset(x: number, y: number): Vec2 {
    return {
        x: (x * CHUNK_WIDTH) / 2,
        y: (y * CHUNK_WIDTH) / 2,
    };
}

export function renderGrid(dimensions: Vec2, stage: Container, showDebug: boolean): void {
    const startTime = performance.now();

    if (gridContainer) {
        stage.removeChild(gridContainer);
    }

    for (let x = 0; x < CHUNK_COUNT; x++) {
        for (let y = 0; y < CHUNK_COUNT; y++) {
            gridContainer = new Container();

            drawChunk(dimensions, gridContainer);

            const pos = getChunkOffset(x, y);

            const posX = pos.x;
            const posY = pos.y;

            gridContainer.x = posX;
            gridContainer.y = posY;

            stage.addChild(gridContainer);

            if (showDebug) {
                const rect = outline(
                    { x: posX, y: posY },
                    { x: dimensions.x * TILE_SIZE, y: dimensions.y * TILE_SIZE }
                );
                stage.addChild(rect);
            }
        }
    }

    const completedTime = performance.now();
    console.log("Rendering took " + (completedTime - startTime) + " milliseconds.");
}

function drawChunk(dimensions: Vec2, container: Container): void {
    for (let x = 0; x < dimensions.x; x++) {
        for (let y = 0; y < dimensions.y; y++) {
            const sprite = new Sprite(Texture.from(`grass_${getRandomIntInclusive(0, 30)}.png`));

            const xPos = x * TILE_SIZE;
            const yPos = y * TILE_SIZE;

            sprite.position.set(xPos, yPos);

            container.addChild(sprite);
        }
    }
}

function outline(position: Vec2, size: Vec2): Graphics {
    const rectangle = new Graphics();

    rectangle.lineStyle(2, 0xff0000);
    rectangle.drawRect(position.x, position.y, size.x, size.y);
    rectangle.endFill();

    return rectangle;
}
