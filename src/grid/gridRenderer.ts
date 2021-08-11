import { Application, Container, Graphics } from "pixi.js";
import { Vec2 } from "../vector/vec";

let gridContainer: Container;

const TILE_SIZE = 20;
const CHUNK_SIZE = 10;

const CHUNK_COUNT = 5;
const CHUNK_WIDTH = CHUNK_SIZE * TILE_SIZE;

interface GridConfig {
    dimensions: Vec2;
    position?: Vec2;
}

function getChunkOffset(chunkPosition: Vec2): Vec2 {
    const { x, y } = chunkPosition;

    return {
        x: (x * CHUNK_WIDTH) / 2,
        y: (y * CHUNK_WIDTH) / 2,
    };
}

export function renderGrid(dimensions: Vec2, app: Application): void {
    if (gridContainer) {
        app.stage.removeChild(gridContainer);
    }

    for (let x = 0; x < CHUNK_COUNT; x++) {
        for (let y = 0; y < CHUNK_COUNT; y++) {
            gridContainer = new Container();

            const config = { dimensions };
            drawChunk(config, gridContainer);

            const { x: chunkX, y: chunkY } = getChunkOffset({ x, y });
            gridContainer.x = chunkX + 50;
            gridContainer.y = chunkY + 50;

            app.stage.addChild(gridContainer);
        }
    }
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
