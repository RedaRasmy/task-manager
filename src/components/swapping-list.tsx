import type {
    DragEndEvent,
} from "@dnd-kit/core"
import type { ReactNode } from "react"

import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"

import type { SwapParams } from "@/redux/types"

import { cn } from "@/lib/utils"

import { SortableItem } from "../components/sortable-item"

export default function SwappingList<Item extends { id: string | number }>({ items, renderItem, onReorder, className }: {
    items: Item[]
    renderItem: (item: Item) => ReactNode
    onReorder: (swapParams: SwapParams) => void
    className?: string
}) {
    // const { tasks, swap } = useList(listId)

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
            const activeList = items.find(list => active.id === list.id)
            const distList = items.find(list => over.id === list.id)
            if (activeList && distList) {
                const oldIndex = items.indexOf(activeList)
                const newIndex = items.indexOf(distList)
                onReorder({ oldIndex, newIndex })
            }
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[
                restrictToVerticalAxis,
                restrictToParentElement,
            ]}
        >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className={cn(" overflow-y-auto flex flex-col w-full flex-1", className)}>
                    {items.map(item => (
                        <SortableItem id={item.id.toString()} key={item.id}>
                            {renderItem(item)}
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    )
}
