import type { KeyboardEvent } from "react"

import { useState } from "react"

import type { List } from "@/redux/types"

import useList from "@/hooks/use-list"

import { Input } from "./ui/input"

export default function AddTask({ listId }: { listId: List["id"] }) {
    const { createTask } = useList(listId)
    const [name, setName] = useState("")

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" && name) {
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
