// import { ArrowUpDown } from "lucide-react"

// import type { List } from "@/redux/types"

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// import useList from "../hooks/use-list"

// export default function ListDropdown({ listId }: {
//     listId: List["id"]
// }) {
//     // const { list } = useList(listId)

//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger>
//                 <ArrowUpDown className="cursor-pointer" color="gray" />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="mr-4">
//                 <DropdownMenuLabel>
//                     <h1 className="font-semibold text-[0.95rem]">Actions</h1>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem
//                     checked={sortMode === "manual"}
//                     onClick={() => onChangeSortMode("manual")}
//                     className="cursor-pointer hover:bg-accent"
//                 >
//                     <p className="font-semibold ">Manual (drag and drop)</p>
//                 </DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// }
