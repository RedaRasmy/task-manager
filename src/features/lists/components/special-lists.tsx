import { Archive, Calendar1 } from "lucide-react"

import SpecialList from "./special-list"

export default function SpecialLists() {
    return (
        <div className="flex flex-col w-full gap-2">
            <SpecialList id="today" Icon={Calendar1} />
            <SpecialList id="scheduled" Icon={Archive} />
        </div>
    )
}
