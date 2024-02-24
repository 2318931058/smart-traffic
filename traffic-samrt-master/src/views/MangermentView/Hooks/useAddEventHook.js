import mapboxGl from "mapbox-gl"
import { EventHttp } from "../../../Http/EventHttp"
import { useEventStore } from "../../../stores/eventStore"
import { storeToRefs } from "pinia"
import $ from "jquery";
import { ElMessage } from "element-plus";
export default ()=>{
    const eventStore = useEventStore()
    let {totalEventList} = storeToRefs(eventStore)
    let number = 1
    let event_id = ''
    let $map
    onMounted(() => {
      $map = inject('$map')  
    })
    let pop = new mapboxGl.Popup({
         closeButton: false 
      });
    const addEvent = ()=>{ 
        pop.remove()
        $map.getCanvas().style.cursor = 'pointer';   //鼠标样式
        $map.on('click',handleClick)
    }

    const handleClick = async(e)=>{
        let {lng,lat} = e.lngLat
        let data = {
            type:'FeatureCollection',
            features:[{
                type:'Feature',
                geometry:{
                    type:'Point',
                    coordinates:[lng,lat]
                }
            }]
        }
        let num_arr = await EventHttp.getAllEventHttp()
        
        number = num_arr.data.result[num_arr.data.result.length-1].fid+1
        $map.addLayer({
            id:'draw-layer'+number,
            source:{
                type:'geojson',
                data
            },
            type:'circle',
            paint:{
                'circle-color':'red',
                'circle-radius':4
            }
        })

        /* 获取事件 */
        let event_res = await EventHttp.getAllEventHttp()
        let num = event_res.data.result[event_res.data.result.length-1].event_id.slice(2)
        event_id = 'sj'+ +(+num+1)
        pop.setHTML(`
        <div class="detail" >
        <h4 style="background-color: #337ab7;list-style: 25px;color:#fff;padding-left:5px;">添加事件</h4>
        <table cellspacing="0" border style="width:220px;font-style:13px">
            <tr>
                <td style="font-weight: 600; padding-inline:5px; width: 120px;">事件编号</td>
                <td style="padding-left:6px">${event_id}</td>
            </tr>
            <tr>
                <td style="font-weight: 600; padding-inline:5px">事件类型</td>
                <td><select name="事件类型" style="width:153px" class="type">
                    <option value="碰撞">碰撞</option>
                    <option value="失火">失火</option>
                    <option value="追尾">追尾</option>
                    <option value="刮擦">刮擦</option>
                    <option value="翻车">翻车</option>
                    <option value="其他">其他</option>
                </select></td>
            </tr>
            <tr>
                <td style="font-weight: 600;padding-inline:5px">事件等级</td>
                <td><select name="事件等级" style="width:153px" class="level">
                    <option value="1">轻微事故</option>
                    <option value="2">一般事故</option>
                    <option value="3">重大事故</option>
                    <option value="4">特大事故</option>
                </select></td>
            </tr>
            <tr>
                <td style="font-weight: 600;padding-inline:5px" >发生时间</td>
                <td><input type="datetime-local" style="width:152px" class="time"></td>
            </tr>
            <tr>
                <td style="font-weight: 600; padding-inline:5px">发生地点</td>
                <td><input type="text" style="width:154px"  class="place"></td>
            </tr>
            <tr>
                <td style="font-weight: 600;padding-inline:5px">车牌号</td>
                <td><input type="text" style="width:154px"  class="car"></td>
            </tr>
            <tr>
                <td style="font-weight: 600;padding-inline:5px">驾驶员</td>
                <td><input type="text" style="width:154px" class="person"></td>
            </tr>
            <tr>
                <td style="font-weight: 600;padding-inline:5px">处理状态</td>
                <td><select name="处理状态" style="width:153px"  class="status">
                    <option value="0">待处理</option>
                    <option value="1">处理中</option>
                    <option value="2">已处理</option>
                </select></td>
            </tr>
        </table>
        <button id="sureButton">确定</button>
        <button id="cancelButton">取消</button>
    </div>
        `).setLngLat([lng,lat])
        pop.addTo($map)

        $('.mapboxgl-popup #sureButton').on('click',async function(){      
            let event_type = $('.mapboxgl-popup .type').val()
            let event_level = $('.mapboxgl-popup .level').val()
            let event_time = $('.mapboxgl-popup .time').val()
            let event_place = $('.mapboxgl-popup .place').val()
            let event_car = $('.mapboxgl-popup .car').val()
            let event_name = $('.mapboxgl-popup .name').val()
            let event_status = $('.mapboxgl-popup .status').val()
            let event_axis = [lng,lat]
            event_time = event_time.replace(/-/g, "/");
            event_time = event_time.replace(/T/g, " ");
            let layer_id = 'draw-layer'+number
            let color = $map.getPaintProperty(layer_id,'circle-color')
            if(event_status=='0') {
                color = 'red'
            }else if(event_status=='1'){
                color = 'yellow'
            }else{
                color = 'green'
            }
            $map.setPaintProperty(layer_id,'circle-color',color)
            // event_time = 
            let add_res = await EventHttp.addHttp(
                event_id,
                event_type,
                event_level,
                event_time,
                event_place,
                event_car,
                event_name,
                event_status,
                event_axis
            )
            let add_list = await EventHttp.getAllEventHttp()
            totalEventList.value = add_list.data.result
            // console.log(add_res);
            $('.mapboxgl-popup').hide()
            ElMessage.success({
                message:"事件添加成功",
                duration:2000
            })
        })
            $('.mapboxgl-popup #cancelButton').on('click',function(){
                $map.removeLayer('draw-layer'+number)
                $('.mapboxgl-popup').hide()
            })
    }
    const closeAddEvent = ()=>{
        $map.getCanvas().style.cursor = 'default';   //鼠标样式
        $map.off('click',handleClick)     //偶数次点击按钮，地图解绑
        /* 将原来的geojson保留，并且不然geojson继续加下去了 */
        // let source = $map.getSource('draw-source')
        // source.setData(data)
    }
    return {addEvent,closeAddEvent}
}