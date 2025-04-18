import type { Prettify } from "@/lib/utils"

export type List = {
    id: string
    name: string
    tasks: Task[]
}

export type Task = {
    id: string
    name: string
    description: string
    priority: Priority
    completed: boolean
    repeat?: number
    date?: Date
    tags: string[]
}

export type Priority = "normal" | "medium" | "high"

// export type RenamePayload<T extends List | Task | SubTask > = {id:T['id'],name:T['name']}

type RequiredKey<T, K extends keyof T> = Prettify<Pick<T, K> & Partial<T>>
type RequiredId<T extends { id: any }> = RequiredKey<T, "id">

export type RemovePayload<T extends List | Task> = T["id"]

export type UpdatePayload<T extends List | Task> = RequiredId<T>

export type AddPayload<T extends List | Task> = T extends List
    ? List
    : { listId: List["id"], task: Task }

export type SwapParams = { oldIndex: number, newIndex: number }

export type TasksSwapParams = {
    listId: List["id"]
    params: SwapParams
}
