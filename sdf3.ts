import { Vector3, v3, vDot, Box3, vLength } from "./math.ts";

export interface SDF3 {
    evaluate(p: Vector3): number;
    boundingBox(): Box3;
}

export function sphere(radius: number): SDF3 {
    return {
        boundingBox: () => [
            [-radius, -radius, -radius],
            [radius, radius, radius],
        ],
        evaluate: (p: Vector3) => vLength(p) - radius,
    };
}
