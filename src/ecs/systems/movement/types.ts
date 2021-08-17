import { defineComponent, Types } from "bitecs";

const Vector3 = { x: Types.f32, y: Types.f32, z: Types.f32 };

export const Position = defineComponent(Vector3);
export const Velocity = defineComponent(Vector3);
