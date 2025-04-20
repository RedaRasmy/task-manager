import type {
    DragEndEvent,
} from "@dnd-kit/core"

import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"

import type { List } from "@/redux/types"

import useList from "@/hooks/use-list"

import { SortableItem } from "./sortable-item"
import Task from "./task"

export default function Tasks({ listId }: { listId: List["id"] }) {
    const { tasks, swap } = useList(listId)

    const sensors = useSensors(
        useSensor(MouseSensor, {
            // Require the mouse to move by 10 pixels before activating
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            // Press delay of 250ms, with tolerance of 5px of movement
            activationConstraint: {
                delay: 100,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (over && active.id !== over.id) {
            const activeList = tasks.find(list => active.id === list.id)
            const distList = tasks.find(list => over.id === list.id)
            if (activeList && distList) {
                const oldIndex = tasks.indexOf(activeList)
                const newIndex = tasks.indexOf(distList)
                swap({ oldIndex, newIndex })
            }
        }
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                <div className=" overflow-y-auto h-fit flex flex-col w-full flex-1">
                    {tasks.map(task => (
                        <SortableItem id={task.id} key={task.id}>
                            <Task key={task.id} task={task} />
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    )
}
