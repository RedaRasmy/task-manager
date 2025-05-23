import AddList from "@/features/lists/components/add-list"
import SpecialLists from "@/features/lists/components/special-lists"

import Lists from "../features/lists/components/lists"
import { Separator } from "./ui/separator"

export default function Sidebar() {
    return (
        <div className="h-full px-2 py-5 gap-4 flex flex-col items-center ">
            <SpecialLists />
            <Separator className="mt-3 opacity-80" />
            <AddList />
            <Lists />
        </div>
    )
}
