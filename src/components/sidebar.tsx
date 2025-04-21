import AddList from "@/features/lists/components/add-list"

import Lists from "../features/lists/components/lists"

export default function Sidebar() {
    return (
        <div className="h-full px-2 py-5 gap-4 flex flex-col items-center ">
            <AddList />
            <Lists />
        </div>
    )
}
