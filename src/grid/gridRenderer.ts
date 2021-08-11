import { Application, Container, Graphics } from "pixi.js";
import { Vec2 } from "../vector/vec";

let gridContainer: Container;

const TILE_SIZE = 20;
const CHUNK_SIZE = 10;

const CHUNK_COUNT = 5;
const CHUNK_WIDTH = CHUNK_SIZE * TILE_SIZE;

const GRID_OFFSET = 50;

interface GridConfig {
    dimensions: Vec2;
    position?: Vec2;
}

function getChunkOffset(x: number, y: number): Vec2 {
    return {
        x: (x * CHUNK_WIDTH) / 2,
        y: (y * CHUNK_WIDTH) / 2,
    };
}

export function renderGrid(dimensions: Vec2, app: Application): void {
    const startTime = performance.now();

    if (gridContainer) {
        app.stage.removeChild(gridContainer);
    }

    for (let x = 0; x < CHUNK_COUNT; x++) {
        for (let y = 0; y < CHUNK_COUNT; y++) {
            gridContainer = new Container();

            const config = { dimensions };
            drawChunk(config, gridContainer);

            const { x: chunkX, y: chunkY } = getChunkOffset(x, y);

            gridContainer.x = chunkX + GRID_OFFSET;
            gridContainer.y = chunkY + GRID_OFFSET;

            app.stage.addChild(gridContainer);
        }
    }

    const completedTime = performance.now();
    console.log("Rendering took " + (completedTime - startTime) + " milliseconds.");
}

function drawChunk(config: GridConfig, container: Container): void {
    const { dimensions } = config;

    for (let x = 0; x < dimensions.x; x++) {
        for (let y = 0; y < dimensions.y; y++) {
            const rectangle = new Graphics();

            const xPos = x * TILE_SIZE;
            const yPos = y * TILE_SIZE;

            rectangle.lineStyle(2, 0x999999);
            rectangle.beginFill(x % 2 ? 0xf0f8ff : 0xfff0f8);
            rectangle.drawRect(xPos, yPos, TILE_SIZE, TILE_SIZE);
            rectangle.endFill();

            container.addChild(rectangle);
        }
    }
}
