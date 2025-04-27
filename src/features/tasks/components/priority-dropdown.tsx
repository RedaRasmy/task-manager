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
import { cn } from "@/lib/utils"

export default function PriorityDropdown({ priority, change, className }: {
    priority: Priority
    change: (newPriority: Priority) => void
    className?: string
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Zap
                    className={cn("cursor-pointer", {
                        "stroke-priority-medium": priority === "medium",
                        "stroke-priority-high": priority === "high",
                    }, className)}
                    color="gray"
                />
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
                    <p className="text-priority-high font-semibold ">High</p>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={priority === "medium"}
                    onClick={() => change("medium")}
                    className="cursor-pointer hover:bg-accent"
                >
                    <p className="text-priority-medium font-semibold">Medium</p>
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
