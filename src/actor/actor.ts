import { addComponent, addEntity, IWorld } from "bitecs";
import { Graphics } from "pixi.js";
import { Position, Velocity } from "../ecs/systems/movement/types";
import { Vec2 } from "../vector/vec";

export class Actor {
    rectangle = new Graphics();
    eid: number;

    constructor(position: Vec2, size: Vec2, world: IWorld) {
        this.rectangle.beginFill(0xf0f8ff);
        this.rectangle.drawRect(position.x, position.y, size.x, size.y);
        this.rectangle.endFill();

        this.eid = addEntity(world);

        addComponent(world, Position, this.eid);
        addComponent(world, Velocity, this.eid);

        Velocity.x[this.eid] = 4;
    }

    getGraphics(): Graphics {
        return this.rectangle;
    }

    update() {
        this.rectangle.x = Position.x[this.eid];
    }
}
