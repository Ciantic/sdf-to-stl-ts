/**
 * @author Jari O. O. Pennanen
 * @license MIT
 */

export type Vector3 = [number, number, number];
export type Vector3i = [number, number, number] & { readonly _typed: "integers" };
export type Vector2 = [number, number];
export type Vector = Vector2 | Vector3;
export type Box3 = [Vector3, Vector3];
export type Box2 = [Vector2, Vector2];
export type Box = Box2 | Box3;
export type Triangle3 = [Vector3, Vector3, Vector3];

export function v2(x: number, y: number): Vector2 {
    return [x, y];
}

export function v3(x: number, y: number, z: number): Vector3 {
    return [x, y, z];
}

export function v3i(v3: Vector3): Vector3i {
    return v3.map((v) => Math.trunc(v)) as Vector3i;
}

export function box2(min: Vector2, max: Vector2): Box2 {
    return [min, max];
}

export function box3(min: Vector3, max: Vector3): Box3 {
    return [min, max];
}

export function vLength(v: Vector) {
    const [x, y, z] = v;
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z ?? 0, 2));
}

export function vDot<A extends Vector, B extends A>(v1: A, v2: B) {
    const [x1, y1, z1] = v1;
    const [x2, y2, z2] = v2;
    return x1 * x2 + y1 * y2 + (z1 ?? 0) * (z2 ?? 0);
}

export function vAddScalar<A extends Vector, B extends A>(v1: A, scalar: number): B {
    return v1.map((v) => v + scalar) as B;
}

export function vMulScalar<A extends Vector, B extends A>(v1: A, scalar: number): B {
    return v1.map((v) => v * scalar) as B;
}

export function vDivScalar<A extends Vector, B extends A>(v1: A, scalar: number): B {
    return v1.map((v) => v / scalar) as B;
}

export function vSub<A extends Vector, B extends A>(v1: A, v2: B): B {
    return v1.map((v, i) => v - v2[i]) as B;
}

export function vAdd<A extends Vector, B extends A>(v1: A, v2: B): B {
    return v1.map((v, i) => v + v2[i]) as B;
}

export function vMaxComponent(v: Vector) {
    return Math.max.apply(null, v);
}

export function vMinComponent(v: Vector) {
    return Math.min.apply(null, v);
}

export function vEquals(a: Vector, b: Vector, tolerance: number) {
    const [aX, aY, aZ] = a;
    const [bX, bY, bZ] = b;

    let third = true;
    if (typeof aZ !== "undefined" && typeof bZ !== "undefined")
        third = Math.abs(aZ - bZ) <= tolerance;

    return Math.abs(aX - bX) <= tolerance && Math.abs(aY - bY) <= tolerance && third;
}

export function boxMul<A extends Box, B extends A>(box: A, scalar: number): B {
    const [min, max] = box;
    return [vMulScalar(min, scalar), vMulScalar(max, scalar)] as B;
}

export function boxSize<A extends Box>(box: A) {
    const [min, max] = box;
    return vSub(max, min) as typeof box[0];
}

export function tIsDegenerate(t: Triangle3, tolerance: number): boolean {
    const [v0, v1, v2] = t;
    if (vEquals(v0, v1, tolerance)) {
        return true;
    }
    if (vEquals(v1, v2, tolerance)) {
        return true;
    }
    if (vEquals(v2, v0, tolerance)) {
        return true;
    }
    return false;
}
