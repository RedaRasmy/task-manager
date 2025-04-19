import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import ListSection from "./components/list-section"
import Sidebar from "./components/sidebar"
import ThirdColumn from "./components/third-column"
import useCurrentList from "./hooks/use-current-list"
import { cn } from "./lib/utils"

export default function App() {
    const { currentListId } = useCurrentList()

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
                    "hidden md:block": currentListId !== undefined,
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
                    "hidden md:flex": currentListId === undefined,
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
