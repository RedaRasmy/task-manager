import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import Sidebar from "./components/sidebar"
import ThirdColumn from "./components/third-column"
import ListSection from "./features/lists/components/list-section"
import useView from "./hooks/use-view"
import { cn } from "./lib/utils"
import useAutoUpdateOverdueTasks from "./features/tasks/hooks/use-auto-update-overdue-tasks"

export default function App() {
    const { isHome } = useView()
    
    useAutoUpdateOverdueTasks()

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className=""
        >
            <ResizablePanel
                defaultSize={20}
                minSize={20}
                maxSize={50}
                className={cn("", {
                    "hidden md:block": !isHome,
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
                    "hidden md:flex": isHome,
                })}
            >
                <ListSection />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
                defaultSize={30}
                minSize={30}
                maxSize={50}
                className="hidden lg:flex"
            >
                <ThirdColumn />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
