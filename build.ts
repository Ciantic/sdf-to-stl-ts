import { Application, send } from "https://deno.land/x/oak/mod.ts";

console.log("Compiling the ui.ts...");
const c = await Deno.emit("./ui.ts", {});
const uiFileKey = Object.keys(c.files).find((f) => f.endsWith("ui.ts.js"));
const uiFileContent = uiFileKey && uiFileKey in c.files ? c.files[uiFileKey] : null;
if (!uiFileContent) {
    throw new Error(`ui.ts.js not found`);
}
Deno.writeTextFileSync("./build/ui.js", uiFileContent ?? "");
console.log("Wrote to ./build/ui.js");

const app = new Application();

app.use(async (context) => {
    await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/build/`,
        index: "index.html",
    });
});

console.log("Start listening on http://localhost:8000");
if (Deno.build.os === "windows") {
    Deno.run({
        cmd: ["explorer", "http://localhost:8000"],
    });
}
await app.listen({ port: 8000 });
