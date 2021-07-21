import { sphere } from "./sdf3.ts";
import { stl } from "./stl.ts";
import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";

Deno.test("Sphere triangle count", () => {
    let s = sphere(100);
    let ts = stl(s, 50);
    assertEquals(11704, ts.length);
});
