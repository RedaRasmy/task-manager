import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import Sidebar from "./components/sidebar"
import TasksSection from "./components/tasks-section"
import useCurrentList from "./hooks/use-current-list"
import { cn } from "./lib/utils"

export default function App() {
    const { currentList } = useCurrentList()
    // console.log(currentList)

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className=" rounded-lg border "
        >
            <ResizablePanel
                defaultSize={20}
                minSize={20}
                maxSize={50}
                className={cn("", {
                    "hidden md:block": currentList !== undefined,
                })}
            >
                <Sidebar />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
                defaultSize={50}
                minSize={30}
                maxSize={50}
                className={cn("", {
                    "hidden md:flex": currentList === undefined,
                })}
            >
                <TasksSection />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
                defaultSize={30}
                minSize={30}
                maxSize={50}
                className="hidden lg:flex"
            >
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Three</span>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
