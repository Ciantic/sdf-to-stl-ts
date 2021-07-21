/**
 * @author Jari O. O. Pennanen
 * @license MIT
 */

import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { workerOnce } from "./worker.ts";

const testWorkerSharedMemory = workerOnce(
    {
        url: import.meta.url,
    },
    ([sharedBuf, i]: [SharedArrayBuffer, number]) => {
        const buf = new Int8Array(sharedBuf);
        buf[i] = i * 10;
        return "";
    }
);

if (typeof Deno !== "undefined") {
    Deno.test({
        name: "Shared memory between workers",
        async fn() {
            const sharedBuff = new SharedArrayBuffer(10);
            const arr = new Int8Array(sharedBuff);
            arr[0] = 123;
            await Promise.all([
                testWorkerSharedMemory([sharedBuff, 1]),
                testWorkerSharedMemory([sharedBuff, 2]),
                testWorkerSharedMemory([sharedBuff, 3]),
                testWorkerSharedMemory([sharedBuff, 4]),
                testWorkerSharedMemory([sharedBuff, 5]),
                testWorkerSharedMemory([sharedBuff, 6]),
                testWorkerSharedMemory([sharedBuff, 7]),
                testWorkerSharedMemory([sharedBuff, 8]),
                testWorkerSharedMemory([sharedBuff, 9]),
            ]);
            assertEquals(arr, [123, 10, 20, 30, 40, 50, 60, 70, 80, 90]);
        },
    });
}
