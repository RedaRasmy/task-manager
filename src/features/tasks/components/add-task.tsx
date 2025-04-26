import type { KeyboardEvent } from "react"

import { useState } from "react"

import type { List, Priority } from "@/redux/types"

import { DatePicker } from "@/components/date-picker"
import { Input } from "@/components/ui/input"
import useList from "@/features/lists/hooks/use-list"

import PriorityDropdown from "./priority-dropdown"

export default function AddTask({ listId }: { listId: List["id"] }) {
    const { createTask } = useList(listId)
    const [name, setName] = useState("")
    const [priority, setPriority] = useState<Priority>("normal")
    const [date, setDate] = useState<Date>()

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" && name.trim() !== "") {
            createTask({
                name,
                priority,
                date: date?.toISOString(),
            })
            setName("")
            setPriority("normal")
            setDate(undefined)
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
                date={date}
                onSelect={(newDate) => { setDate(newDate) }}
            />
            <PriorityDropdown
                change={newPriority => setPriority(newPriority)}
                priority={priority}
            />
        </div>
    )
}
