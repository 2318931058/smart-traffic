import { EventHttp } from "../Http/EventHttp"
import mapboxGl from "mapbox-gl";
export default () => {
    /* 先调用服务获取所有 */
    let eventIpt = ref('')
    let $map = null
    onMounted(() => {
        $map = inject('$map')
    })
    let marker_arr = []
    const searchEvent = async () => {
        if (!eventIpt.value) {
            return ElMessage({
                message: '内容不能为空',
                grouping: true,
                type: 'warning',
                duration: 2000
            })
            
        }
        let status_arr = ['未处理','处理中','已归档']
        let level_arr = ['轻微','一般','重大','特大']
        let res = await EventHttp.getAllEventHttp()
        marker_arr.forEach(item=> item.remove())   //先清除已有的标注
        $map.getCanvas().style.cursor = 'pointer'; 
        res.data.result.forEach(item => {
            if(item.event_type.includes(eventIpt.value)){
                let status = status_arr[item.event_status]
                let level = level_arr[item.event_level]
                let popup = new mapboxGl.Popup().setHTML(`
                <div class="pop-detail">
                <h3>详细信息</h3>
                <div><span style="font-weight: 600;margin-right: 10px;">FID:</span>${item.fid}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">事件编号:</span>${item.event_id}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">事件类型:</span>${item.event_type}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">事件等级:</span>${level}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">发生时间:</span>${item.event_time}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">发生地点:</span>${item.event_place}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">车牌号:</span>${item.driver_car}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">驾驶员:</span>${item.driver_name}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">处理状态:</span>${status}</div>
            </div>
                `)
                let marker = new mapboxGl.Marker({
                    color:'red'
                }).setLngLat(item.event_axis).setPopup(popup)
                marker_arr.push(marker)
                marker.addTo($map)
            }
        });
        if(!marker_arr.length){
            ElMessage({
                message: '没有对应事故!',
                grouping: true,
                type: 'warning',
                duration: 2000
            })
        }
    }
    watch(eventIpt,val=>{
        if(!val){
            marker_arr.forEach(item=> item.remove())   //先清除已有的标注
        }
    })

    return { eventIpt, searchEvent }
}