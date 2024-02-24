import { useEventStore } from "../../../stores/eventStore"
import { storeToRefs } from "pinia"
import { EventHttp } from "../../../Http/EventHttp"
export const useUpdateEventHook = ()=>{
    const eventStore = useEventStore()
    let {dialogTableVisible,totalEventList} = storeToRefs(eventStore)
    const updateEvent = async()=>{
        dialogTableVisible.value = true
        let res = await EventHttp.getAllEventHttp()
        eventStore.changeTotalEventList(res.data.result)
 
    }
    return {updateEvent}
}