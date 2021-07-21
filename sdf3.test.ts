import { sphere } from "./sdf3.ts";
import { stl } from "./stl.ts";
import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { boxSize } from "./math.ts";

Deno.test("Sphere bounding box", () => {
    let s = sphere(15);
    let b = s.boundingBox();
    assertEquals(b, [
        [-15, -15, -15],
        [15, 15, 15],
    ]);
    assertEquals(boxSize(b), [30, 30, 30]);
});
