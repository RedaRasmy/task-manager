import { ArrowUpDown } from "lucide-react"

import type { List } from "@/redux/types"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SortingDropdown({ sortMode, ascending, onChangeSortMode, onChangeAscending }: {
    sortMode: List["sortMode"]
    ascending: List["ascending"]
    onChangeSortMode: (newSortMode: List["sortMode"]) => void
    onChangeAscending: (ascending: List["ascending"]) => void
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ArrowUpDown className="cursor-pointer" color="gray" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
                <DropdownMenuLabel>
                    <h1 className="font-semibold text-[0.95rem]">Tasks Sorting</h1>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={sortMode === "manual"}
                    onClick={() => onChangeSortMode("manual")}
                    className="cursor-pointer hover:bg-accent"
                >
                    <p className="font-semibold ">Manual (drag and drop)</p>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={sortMode === "name"}
                    onClick={() => onChangeSortMode("name")}
                    className="cursor-pointer hover:bg-accent"
                >
                    <p className="font-semibold">Name</p>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={sortMode === "priority"}
                    onClick={() => {
                        if (sortMode !== "priority") {
                            // set default to descending order for priority sort mode
                            onChangeAscending(false)
                        }
                        onChangeSortMode("priority")
                    }}
                    className="cursor-pointer hover:bg-accent"
                >
                    <p className="font-semibold">Priority</p>
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />

                <DropdownMenuCheckboxItem
                    checked={ascending && sortMode !== "manual"}
                    onClick={() => onChangeAscending(true)}
                    className="cursor-pointer hover:bg-accent"
                    disabled={sortMode === "manual"}
                >
                    <p className="font-semibold">Ascending</p>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={!ascending}
                    onClick={() => onChangeAscending(false)}
                    className="cursor-pointer hover:bg-accent"
                    disabled={sortMode === "manual"}
                >
                    <p className="font-semibold">Descending</p>
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
