import type { KeyboardEvent } from "react"

import { useEffect, useRef, useState } from "react"
import { useOnClickOutside } from "usehooks-ts"

import { cn } from "@/lib/utils"

export default function RenamableHeading({ name, rename, className }: {
    name: string
    rename: (newName: string) => void
    className?: string
}) {
    const [renaming, setRenaming] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const [current, setCurrent] = useState(name)

    useEffect(() => {
        // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
        setCurrent(name)
    }, [name])

    useOnClickOutside(inputRef as React.RefObject<HTMLElement>, handleRename)

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            handleRename()
        }
    }

    function handleRename() {
        if (current.trim() !== "") {
            rename(current)
        }
        else {
            setCurrent(name)
        }
        setRenaming(false)
    }

    if (renaming) {
        return (
            <input
                autoFocus
                ref={inputRef}
                value={current}
                onChange={e => setCurrent(e.target.value)}
                className={cn("font-bold text-xl rounded-sm px-3 py-0.5", className)}
                onKeyDown={handleKeyDown}
            />
        )
    }
    else {
        return (
            <h1
                onClick={() => { setRenaming(true) }}
                className={cn("font-bold text-xl cursor-pointer select-none capitalize hover:bg-accent rounded-sm px-3 py-0.5", className)}
            >
                {name}
            </h1>
        )
    }
}
