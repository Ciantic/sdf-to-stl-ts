/**
 * @author Jari O. O. Pennanen
 * @license MIT
 */

import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { workerOnce } from "./worker.ts";

// In this case `worker.test.ts` file becomes the worker, with a following async
// function.
const testWorker = workerOnce(
    {
        url: import.meta.url,
    },
    (foo: number) => {
        return foo * 2;
    }
);

// Notice that `Deno` is not defined within worker
if (typeof Deno !== "undefined") {
    Deno.test({
        name: "Simple worker usage",
        async fn() {
            // Notice that this is fairly slow test, because initiating workers takes a quiet long time
            const results = await Promise.all([
                testWorker(1),
                testWorker(2),
                testWorker(3),
                testWorker(4),
            ]);
            const sum = results.reduce((p, v) => p + v);
            assertEquals(sum, 1 * 2 + 2 * 2 + 3 * 2 + 4 * 2);
        },
    });
}
