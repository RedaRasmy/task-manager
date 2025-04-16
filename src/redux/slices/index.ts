/// import slices reducers automaticly and export them to use in store.ts
/// Dont Touch !

import type { Reducer } from "@reduxjs/toolkit"

const modules = import.meta.glob("../slices/*.ts", { eager: true }) as Record<string, { default: any }>
const exports = Object.entries(modules).reduce((acc, [path, module]) => {
    const name = path.split("/").pop()?.replace(".ts", "")
    if (!name) {
        throw new Error(`Invalid detected in slices folder : ${path}`)
    }
    if (!module.default) {
        throw new Error(`Missing default export in file : ${name}.ts`)
    }
    const reducer = module.default
    if (typeof reducer !== "function") {
        throw new TypeError(`The default export in ${name}.ts must be a function`)
    }

    acc[toCamelCase(name)] = reducer

    return acc
}, {} as Record<string, Reducer>)

export default exports

function toCamelCase(str: string): string {
    return str
        .replace(/[^a-z0-9]+(.)/gi, (_, chr) => chr.toUpperCase())
}
