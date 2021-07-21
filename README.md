# SDF to STL (deno)

This is currently almost direct translation of (small part) [deadsy's sdfx](https://github.com/deadsy/sdfx/blob/master/render/march3x.go) to TypeScript. License of the original work is MIT with Jason T. Harris.

I wanted to try if it's possible to build similar toolset for TypeScript. One of the goals is to have an UI next to an editor, which is readily usable from a static webpage.

Currently this can render sphere with same algorithm as in Deadsy's sdfx. See [stl.test.ts](./stl.test.ts).

## Roadmap

No plans to go further at this point. TypeScript alone is not a good tool for this, but combination of Rust WASM and TypeScript could be a better plan. I will try to implement the marching cubes (octtree) with Rust next.

