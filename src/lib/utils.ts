import type { ClassValue } from "clsx"

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

// export type RequiredKeys<T> = {
//     [K in keyof T]-?: {} extends Pick<Tp, K> ? never : K
// }[keyof T]
