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

import useLists from "@/features/lists/hooks/use-lists"

import { SortableItem } from "../../../components/sortable-item"
import List from "./list"

export default function Lists() {
    const { lists, swap } = useLists()

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
            const activeList = lists.find(list => active.id === list.id)
            const distList = lists.find(list => over.id === list.id)

            if (activeList && distList) {
                const oldIndex = lists.indexOf(activeList)
                const newIndex = lists.indexOf(distList)
                swap({ oldIndex, newIndex })
            }
        }
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={lists} strategy={verticalListSortingStrategy}>
                <div
                    data-testid="lists"
                    className="overflow-y-auto flex flex-col  w-full"
                >
                    {lists.map(list => (
                        <SortableItem id={list.id} key={list.id}>
                            <List key={list.id} list={list} />
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    )
}
