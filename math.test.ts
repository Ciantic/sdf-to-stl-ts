import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import * as math from "./math.ts";

Deno.test("Vector length", () => {
    assertEquals(math.vLength([1, 2]), 2.23606797749979);
    assertEquals(math.vLength([1, 2, 3]), 3.7416573867739413);
});

Deno.test("Vector dot product", () => {
    assertEquals(math.vDot([1, 2], [3, 4]), 11);
    assertEquals(math.vDot([1, 2, 3], [4, 5, 6]), 32);
});

Deno.test("Vector sub", () => {
    assertEquals(math.vSub([3, 3, 3], [1, 2, 3]), [2, 1, 0]);
    assertEquals(math.vSub([3, 3], [1, 2]), [2, 1]);
});

Deno.test("Vector multiply scalar", () => {
    assertEquals(math.vMulScalar([3, 3, 3], 2), [6, 6, 6]);
    assertEquals(math.vMulScalar([3, 3], 2), [6, 6]);
});

Deno.test("Box multiply", () => {
    assertEquals(
        math.boxMul(
            [
                [-1, -1, -1],
                [1, 1, 1],
            ],
            1.01
        ),
        [
            [-1.01, -1.01, -1.01],
            [1.01, 1.01, 1.01],
        ]
    );
    assertEquals(
        math.boxMul(
            [
                [-1, -1],
                [1, 1],
            ],
            1.01
        ),
        [
            [-1.01, -1.01],
            [1.01, 1.01],
        ]
    );
});

Deno.test("Box size", () => {
    assertEquals(
        math.boxSize([
            [-1, -1, -1],
            [1, 1, 1],
        ]),
        [2, 2, 2]
    );
});
