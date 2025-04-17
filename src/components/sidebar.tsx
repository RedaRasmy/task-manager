import AddList from "./add-list"
import Lists from "./lists"

export default function Sidebar() {
    return (
        <div className="h-full px-2 py-5 gap-4 flex flex-col items-center ">
            <AddList />
            <Lists />
        </div>
    )
}
