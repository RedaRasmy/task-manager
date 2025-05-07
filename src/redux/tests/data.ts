
import type { List, Task } from "../types"

// General 

export const emptyState = { ids: [], entities: {} }

// Tasks

export const task1: Task = {
    id: "taskId1",
    completed: false,
    description: "hello world",
    listId: "listId",
    name: "task",
    priority: "normal",
    tags: [],
}
export const task2: Task = {
    id: "taskId2",
    completed: false,
    description: "hello world 2",
    listId: "listId",
    name: "task2",
    priority: "high",
    tags: [],
}

export const stateWithTasks = { ids: ["taskId1","taskId2"], entities: { 
    taskId1: task1,
    taskId2: task2
} }


// Lists

export const list1: List = { id: "listId1", name: "My List1", tasksIds: ["taskId1", "taskId2"], ascending: true, sortMode: "manual" }
export const list2: List = { id: "listId2", name: "My List2", tasksIds: ["taskId3", "taskId4"], ascending: true, sortMode: "manual" }
export const emptyList: List = { id: "listId", name: "My List", tasksIds: [], ascending: true, sortMode: "manual" }

// const stateWithLists = { ids: ["listId"], entities: { listId: listExample } }
export const stateWithLists = { ids: ["listId1", "listId2"], 
    entities: { 
        listId1 : list1,
        listId2 : list2
    } }


