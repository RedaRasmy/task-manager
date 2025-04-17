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
    date: Date
    tags: string[]
    subTasks: SubTask[]
}

export type Priority = "normal" | "medium" | "high"

export type SubTask = {
    id: string
    name: string
    completed: boolean
}

// export type RenamePayload<T extends List | Task | SubTask > = {id:T['id'],name:T['name']}

type RequiredKey<T, K extends keyof T> = Prettify<Pick<T, K> & Partial<T>>
type RequiredId<T extends { id: any }> = RequiredKey<T, "id">

export type RemovePayload<T extends List | Task | SubTask> = T["id"]

export type UpdatePayload<T extends List | Task | SubTask> = RequiredId<T>

export type AddPayload<T extends List | Task | SubTask> = T extends List
    ? List
    : T extends Task
        ? { listId: List["id"], task: Task }
        : { listId: List["id"], taskId: Task["id"], subTask: SubTask }
