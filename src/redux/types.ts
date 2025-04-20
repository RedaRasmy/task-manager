// import type { Prettify } from "@/lib/utils"
// import { Update } from "@reduxjs/toolkit"

export type List = {
    id: string
    name: string
    tasksIds: Task["id"][]
}

export type FullList = {
    id: string
    name: string
    tasks: Task[]
}

export type Task = {
    id: string
    listId: List["id"]
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

// type RequiredKey<T, K extends keyof T> = Prettify<Pick<T, K> & Partial<T>>
// type RequiredId<T extends { id: any }> = RequiredKey<T, "id">

// export type RemovePayload<T extends List | Task> = T["id"]

// export type UpdatePayload<T extends List | Task> = RequiredId<T>

export type AddPayload<T extends List | Task> = T extends List
    ? List
    : { listId: List["id"], task: Task }

export type SwapParams = { oldIndex: number, newIndex: number }

export type TasksSwapParams = {
    listId: List["id"]
    params: SwapParams
}

// export type UpdateTask = {
//     id : Task['id'],
//     changes : Partial<Omit<Task,'completed'>>
// } | {
//     id : Task['id']
//     listId : List['id']
//     changes : Partial<Task> & {completed:Task['completed']}
// }
