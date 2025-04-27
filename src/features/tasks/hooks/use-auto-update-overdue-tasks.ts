import { useAppDispatch } from '@/redux/hooks'
import { tasksActions } from '@/redux/slices/tasks-slice'
import  { useEffect } from 'react'

export default function useAutoUpdateOverdueTasks() {
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(tasksActions.updateOverdueTasks())

        const interval = setInterval(()=>{
            dispatch(tasksActions.updateOverdueTasks())
        },60000)

        return () => clearInterval(interval)
    },[])
}
