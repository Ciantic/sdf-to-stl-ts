/**
 * @author Jari O. O. Pennanen
 * @license MIT
 */

import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { workerOnce } from "./worker.ts";
import SharedMap from "https://cdn.skypack.dev/sharedmap";

const testSharedMapBetweenWorkers = workerOnce(
    {
        url: import.meta.url,
    },
    ([map, i]: [SharedMap, number]) => {
        Object.setPrototypeOf(map, SharedMap.prototype);
        map.set("item" + i, i * 100, undefined);
        return "";
    }
);

if (typeof Deno !== "undefined") {
    Deno.test({
        name: "Shared map between workers",
        async fn() {
            const map = new SharedMap(1024 * 1024, 48, 16);
            await Promise.all([
                testSharedMapBetweenWorkers([map, 1]),
                testSharedMapBetweenWorkers([map, 2]),
                testSharedMapBetweenWorkers([map, 3]),
            ]);
            assertEquals(new Set([...map.keys(undefined)]), new Set(["item1", "item2", "item3"]));
        },
    });
}
