import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import useCurrentList from "./hooks/use-current-list"
import { cn } from "./lib/utils"

export default function App() {
    const { currentList } = useCurrentList()
    console.log(currentList)

    return (
        <ResizablePanelGroup
            direction="horizontal"
            className="min-h-screen rounded-lg border "
        >
            <ResizablePanel
                defaultSize={30}
                minSize={20}
                maxSize={50}
                className={cn({
                    "hidden md:flex": currentList !== undefined,
                })}
            >
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">One</span>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
                defaultSize={40}
                minSize={30}
                maxSize={50}
                className={cn({
                    "hidden md:flex": currentList === undefined,
                })}
            >
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Two</span>
                </div>
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
