import type { KeyboardEvent } from "react"

import { useState } from "react"

import type { List } from "@/redux/types"

import { Input } from "@/components/ui/input"
import useList from "@/features/lists/hooks/use-list"

export default function AddTask({ listId }: { listId: List["id"] }) {
    const { createTask } = useList(listId)
    const [name, setName] = useState("")

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" && name.trim() !== "") {
            createTask(name)
            setName("")
        }
    }

    return (
        <Input
            maxLength={25}
            className=""
            placeholder="Enter task name..."
            onKeyDown={handleKeyDown}
            value={name}
            onChange={e => setName(e.target.value)}
        />
    )
}
