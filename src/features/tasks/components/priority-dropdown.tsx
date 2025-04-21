import { Zap } from "lucide-react"

import type { Priority } from "@/redux/types"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PriorityDropdown({ priority, change }: {
    priority: Priority
    change: (newPriority: Priority) => void
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Zap className="cursor-pointer" color="gray" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
                <DropdownMenuLabel>
                    <h1 className="font-semibold text-[0.95rem]">Task Priority</h1>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={priority === "high"}
                    onClick={() => change("high")}
                    className="cursor-pointer hover:bg-accent"
                >
                    <p className="text-yellow-500 font-semibold ">High</p>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={priority === "medium"}
                    onClick={() => change("medium")}
                    className="cursor-pointer hover:bg-accent"
                >
                    <p className="text-blue-500 font-semibold">Medium</p>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={priority === "normal"}
                    onClick={() => change("normal")}
                    className="cursor-pointer hover:bg-accent"
                >
                    <p className="font-semibold">Normal</p>
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
