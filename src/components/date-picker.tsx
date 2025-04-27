import { format, isBefore, startOfDay } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
// import { cn } from "@/lib/utils"

export function DatePicker({ onSelect, date }: {
    onSelect: (newDate: Date | undefined) => void
    date: Date | undefined
}) {
    return (
        <Popover>
            <PopoverTrigger>
                <div className=" flex items-center cursor-pointer hover:bg-accent px-2 py-1.5 rounded-md">

                    <CalendarIcon color="gray" />

                    {date && <div className="text-nowrap text-xs font-semibold ml-1">{format(date, "LLLL d")}</div>}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                        if (newDate === undefined || !isBefore(newDate, startOfDay(new Date()))) {
                            onSelect(newDate)
                        }
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
