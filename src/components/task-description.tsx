import type { ChangeEventHandler } from "react"

import type { Task } from "@/redux/types"

export default function TaskDescription({ description, onChange }: {
    description: Task["description"]
    onChange: ChangeEventHandler<HTMLTextAreaElement>
}) {
    return (
        <textarea
            spellCheck={false}
            value={description}
            onChange={onChange}
            className="h-full w-full resize-none px-2 outline-none"
        >
        </textarea>
    )
}
