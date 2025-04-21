import SwappingList from "@/components/swapping-list"

import useLists from "../hooks/use-lists"
import List from "./list"

export default function Lists() {
    const { lists, swap } = useLists()

    return (
        <SwappingList
            items={lists}
            renderItem={list => <List list={list} />}
            onReorder={swap}
        />
    )
}
