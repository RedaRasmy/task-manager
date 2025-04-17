import type { KeyboardEvent } from "react"

import { Plus } from "lucide-react"
import { useState } from "react"

import useLists from "@/hooks/use-lists"

import { Input } from "./ui/input"

export default function AddList() {
    const [name, setName] = useState("")
    const { createList } = useLists()

    function handleCreateList() {
        name && createList(name)
        setName("")
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter")
            handleCreateList()
    }

    return (
        <div className="flex w-full justify-center items-center gap-2">
            <Input maxLength={25} className="placeholder:text-gray-200" placeholder="Enter list name..." onKeyDown={handleKeyDown} value={name} onChange={e => setName(e.target.value)} />
            <Plus className="cursor-pointer" onClick={handleCreateList} />
        </div>
    )
}
