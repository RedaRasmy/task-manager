import { ArrowLeft, Ellipsis } from "lucide-react"

import useCurrentList from "@/hooks/use-current-list"

import AddTask from "./add-task"
import Tasks from "./tasks"

export default function TasksSection() {
    const { currentList } = useCurrentList()

    // const list = currentList ? useList(currentList).list : undefined

    function handleBack() {

    }

    if (currentList) {
        return (
            <div className="px-4 py-6 h-screen">
                <div className="flex justify-between items-center ">
                    <div className="flex gap-3 items-center">
                        <ArrowLeft color="grey" onClick={handleBack} />
                        <h1 className="font-bold text-xl capitalize">{currentList.name}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Ellipsis color="grey" />
                    </div>
                </div>
                <div className="flex flex-col gap-3 mt-5 h-full ">
                    <AddTask listId={currentList.id} />
                    <Tasks listId={currentList.id} />
                </div>
            </div>
        )
    }
}
