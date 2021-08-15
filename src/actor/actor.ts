import { Graphics } from "pixi.js";
import { Vec2 } from "../vector/vec";

export class Actor {
    rectangle = new Graphics();

    constructor(position: Vec2, size: Vec2) {
        this.rectangle.beginFill(0xf0f8ff);
        this.rectangle.drawRect(position.x, position.y, size.x, size.y);
        this.rectangle.endFill();
    }

    getGraphics(): Graphics {
        return this.rectangle;
    }
}
