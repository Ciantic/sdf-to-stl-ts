import { marchingCubesOctree } from "./march3x.ts";
import { boxSize, vDivScalar, vMaxComponent } from "./math.ts";
import { SDF3 } from "./sdf3.ts";

export function stl(s: SDF3, cellCount: number) {
    const bb = s.boundingBox();
    const bbSize = boxSize(bb);
    const resolution = vMaxComponent(bbSize) / cellCount;
    const cells = vDivScalar(bbSize, resolution);
    console.log(`rendering (${cells[0]}x${cells[1]}x${cells[2]}, resolution ${resolution})`);
    const triangles = marchingCubesOctree(s, resolution);
    // console.log(triangles.length);
    return triangles;
}
