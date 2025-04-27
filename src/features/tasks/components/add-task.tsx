import type { KeyboardEvent } from "react"

import { useState } from "react"

import type { Priority } from "@/redux/types"

import { DatePicker } from "@/components/date-picker"
import { Input } from "@/components/ui/input"
import useList from "@/features/lists/hooks/use-list"
import useView from "@/hooks/use-view"

import PriorityDropdown from "./priority-dropdown"

export default function AddTask() {
    const { listId } = useView()
    const { createTask, list } = useList(listId)

    const isToday = list.id === "today"
    const isScheduled = list.id === "scheduled"

    const initialDate = isToday || isScheduled ? new Date() : undefined

    const [name, setName] = useState("")
    const [priority, setPriority] = useState<Priority>("normal")
    const [date, setDate] = useState<Date | undefined>(initialDate)

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" && name.trim() !== "") {
            createTask({
                name,
                priority,
                date: date?.toISOString(),
            })
            setName("")
            setPriority("normal")
            setDate(initialDate)
        }
    }

    return (
        <div
            className="flex gap-2"
        >
            <Input
                maxLength={25}
                className=""
                placeholder="Enter task name..."
                onKeyDown={handleKeyDown}
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <DatePicker
                date={isToday ? new Date() : date}
                onSelect={(newDate) => { setDate(newDate) }}
            />
            <PriorityDropdown
                change={newPriority => setPriority(newPriority)}
                priority={priority}
            />
        </div>
    )
}
