// import { useAppDispatch, useAppSelector } from "@/redux/hooks"
// import { listsActions as actions, listSelector } from "@/redux/slices/lists"
// import {  Task } from "@/redux/types"
// import { randomUUID } from "crypto"

// export default function useTask(taskId:Task['id']) {
//     const dispatch = useAppDispatch()
//     const list = useAppSelector(listSelector(listId))

//     if (!list) throw new Error('List Undefined')

//     function deleteTask() {
//         dispatch(actions.removeList(listId))
//     }

//     function createTask(name:List['name']) {
//         const id = randomUUID()
//         dispatch(actions.addList({id,name,tasks:[]}))
//     }

//     function deleteTask(id:List['id']) {
//         dispatch(actions.updateList({id:listId,tasks:list?.tasks.filter(task=>task.id!==id)}))
//     }

//     function renameList(newName:List['name']) {
//         dispatch(actions.updateList({id:listId,name:newName}))
//     }

//     return {
//         list,
//         deleteList,
//         renameList,
//         createTask,
//         deleteTask,
//     }
// }
