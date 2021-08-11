import { Application, Container, Graphics } from "pixi.js";
import { Vec2 } from "../vector/vec";

let gridContainer: Container;

const TILE_SIZE = 20;

interface GridConfig {
    dimensions: Vec2;
    position: Vec2;
}

export function renderGrid(dimensions: Vec2, app: Application): void {
    if (gridContainer) {
        app.stage.removeChild(gridContainer);
    }

    gridContainer = new Container();

    drawNewGrid({ dimensions, position: { x: 50, y: 50 } }, gridContainer);

    app.stage.addChild(gridContainer);
}

function drawNewGrid(config: GridConfig, container: Container): void {
    const { dimensions, position } = config;

    for (let x = 0; x < dimensions.x; x++) {
        for (let y = 0; y < dimensions.y; y++) {
            const rectangle = new Graphics();

            const xPos = position.x + x * TILE_SIZE;
            const yPos = position.y + y * TILE_SIZE;

            rectangle.lineStyle(2, 0x999999);
            rectangle.beginFill(x % 2 ? 0xf0f8ff : 0xfff0f8);
            rectangle.drawRect(xPos, yPos, TILE_SIZE, TILE_SIZE);
            rectangle.endFill();

            container.addChild(rectangle);
        }
    }
}
