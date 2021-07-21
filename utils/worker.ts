/**
 * @author Jari O. O. Pennanen
 * @license MIT
 */

/**
 * Creates a worker from an function
 *
 * It's notable that when worker is defined with workerOnce, it creates a worker
 * from the URL where it's called. For this reason you don't want to have
 * unrelated top level statements.
 *
 * @param opts URL needs to be the url of the current file, in Deno you can get
 * this from `import.meta.url`, where `import` is magic global.
 * @param fn function or async function to be run inside the worker
 * @returns async function
 */
export function workerOnce<I, O>(
    opts: { url: string; timeout?: number },
    fn: (input: I) => Promise<O> | O
) {
    // return () => {
    if ("onmessage" in self) {
        // deno-lint-ignore no-explicit-any
        const worker = self as any as Worker & typeof self;
        worker.onmessage = async (e: MessageEvent) => {
            const input: I = e.data;
            try {
                worker.postMessage({
                    success: await fn(input),
                });
            } catch (e) {
                worker.postMessage({
                    error: (e as Error).stack,
                });
            } finally {
                worker.close();
            }
        };

        setTimeout(() => {
            worker.postMessage({
                error: "timeout",
            });
            worker.close();
        }, opts.timeout ?? 10000);
    }

    return (input: I) => {
        const w = new Worker(opts.url, {
            type: "module",
        });
        return runWorkerOnce<O>(w, input);
    };
    // };
}

/**
 * Run worker like a function, once it reports anything back it's done.
 *
 * @param worker
 * @param initMessage
 */
// deno-lint-ignore no-explicit-any
function runWorkerOnce<R>(worker: Worker, initMessage: any) {
    return new Promise<R>((resolve, reject) => {
        worker.onmessage = (m) => {
            setTimeout(() => {
                worker.terminate();
            }, 0);
            // deno-lint-ignore no-explicit-any
            const data = m.data as { success: R } | { error: any };
            // If success = undefined, then it's considered an error
            if ("success" in data) {
                resolve(data.success);
            } else {
                reject(data.error);
            }
        };
        worker.onerror = (m) => {
            setTimeout(() => {
                worker.terminate();
            }, 0);
            reject(m.type + " " + m.message);
        };
        worker.onmessageerror = (_m) => {
            setTimeout(() => {
                worker.terminate();
            }, 0);
            reject("onmessageerror");
        };
        worker.postMessage(initMessage);
    });
}
