import type { List } from "@/redux/types"

import SwappingList from "@/components/swapping-list"
import useList from "@/features/lists/hooks/use-list"

import Task from "./task"

export default function Tasks({ listId }: { listId: List["id"] }) {
    const { tasks, swap } = useList(listId)

    return (
        <SwappingList
            items={tasks}
            renderItem={task => <Task task={task} />}
            onReorder={swap}
        />
    )
}
