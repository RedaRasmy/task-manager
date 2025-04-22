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

        if (!over || active.id === over.id)
            return

        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)

        if (oldIndex !== -1 && newIndex !== -1)
            onReorder({ oldIndex, newIndex })
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
