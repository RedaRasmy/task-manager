import type { KeyboardEvent } from "react"

import { Plus } from "lucide-react"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import useLists from "@/features/lists/hooks/use-lists"

export default function AddList() {
    const [name, setName] = useState("")
    const { createList } = useLists()

    function handleCreateList() {
        if (name.trim() !== "") {
            createList(name)
            setName("")
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter")
            handleCreateList()
    }

    return (
        <div
            data-testid="add-list"
            className="flex w-full justify-center items-center gap-2"
        >
            <Input data-testid="add-list-input" maxLength={25} className="" placeholder="Enter list name..." onKeyDown={handleKeyDown} value={name} onChange={e => setName(e.target.value)} />
            <Plus className="cursor-pointer" onClick={handleCreateList} />
        </div>
    )
}
