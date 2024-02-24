import {useEventStore} from '../../../stores/eventStore.js'
import { storeToRefs } from "pinia";
export default ()=>{
    const $eventStore =useEventStore()
    let {shortPathVisible} = storeToRefs($eventStore)  
    const handleShortPath = ()=>{
        $eventStore.changeShortPathVisible(true)
    }
    return {handleShortPath}
}