import MapboxDraw from "@mapbox/mapbox-gl-draw";
import mapboxGl from "mapbox-gl";
import { EventHttp } from "../../../Http/EventHttp";
import * as turf from "@turf/turf";
import {useEventStore} from '../../../stores/eventStore.js'
import { storeToRefs } from "pinia";
mapboxGl.accessToken =
    "pk.eyJ1IjoiY2hlbmdiZW5jaGFvIiwiYSI6ImNsODU3aGRiODA0Y2UzcHBzZmFlcmdqZ2sifQ.8k59W_pB_Riwe6o-MneRlA";
export default () => {
    const $eventStore = useEventStore()
    let {eventListVisible,eventList} = storeToRefs($eventStore)
    let $map = null;
    let polygon_arr = [[]];     //存多边形
    // let status_arr = ["未处理", "处理中", "已归档"];
    // let level_arr = ["轻微", "一般", "重大", "特大"];
    let marker_arr = [];
    let draw

    onMounted(() => {
        $map = inject("$map");
        draw = inject('$draw')
        $map.on('style.load',e=>{
           
        })

    });
    const openBoxSearch = () => {
        $eventStore.changeEventList([])
        $map.on("draw.create", handleDraw);
        draw.changeMode("draw_polygon")

    };
    const closeBoxSearch = () => {
      let source = $map.getSource('heatMap-source')
      let data = {
        type:'FeatureCollection',
        features:[]
      }
      source.setData(data)
        $eventStore.changeEventList([])
        draw.deleteAll();
        marker_arr.forEach(item=> item.remove())   //先清除已有的标注
        $map.off("draw.create", handleDraw);      //解绑画笔
       
    }; //选择多边形拉框 };

    const handleDraw = async (e) => {
        eventListVisible.value = true
        $map.getCanvas().style.cursor = 'pointer';   //鼠标样式
        /* 先清除已存在的状态 */
        marker_arr.forEach(item=> item.remove())   //先清除已有的标注
        draw.deleteAll();           //清除画笔
        polygon_arr = [[]]          //恢复到原状态

        /* 求出多边形坐标 */
        e.features[0].geometry.coordinates[0].forEach((item) => {
            let x = $map.project(item).x;
            let y = $map.project(item).y;
            polygon_arr[0].push([x, y]);
        });
        let polygon = turf.polygon(polygon_arr); //转为geojson

        /* 请求数据获得事件坐标及书写 */
        let res = await EventHttp.getAllEventHttp();
        res.data.result.forEach((item) => {
            if (item.event_level === '0') {
                item.event_level = '轻微事故'
              } else if (item.event_level === '1') {
                item.event_level = '一般事故'
              } else if (item.event_level === '2') {
                item.event_level = '重大事故'
              } else {
                item.event_level = '特大事故'
              }

              if (item.event_status === '0') {
                item.event_status = '待处理'
              } else if (item.event_status === '1') {
                item.event_status = '处理中'
              } else {
                item.event_status = '已归档'
              }
            /* 经纬度=>屏幕坐标=>geojson */
            let point_x = $map.project(item.event_axis).x;
            let point_y = $map.project(item.event_axis).y;
            var point = turf.point([point_x, point_y]); 
            let res = turf.booleanContains(polygon, point);
            if (res) {
                eventList.value.push(item)        //推送到查询列表
                let popup = new mapboxGl.Popup().setHTML(`
                <div class="pop-detail">
                <h3>详细信息</h3>
                <div><span style="font-weight: 600;margin-right: 10px;">FID:</span>${item.fid}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">事件编号:</span>${item.event_id}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">事件类型:</span>${item.event_type}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">事件等级:</span>${item.event_level}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">发生时间:</span>${item.event_time}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">发生地点:</span>${item.event_place}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">车牌号:</span>${item.driver_car}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">驾驶员:</span>${item.driver_name}</div>
                <div><span style="font-weight: 600;margin-right: 10px;">处理状态:</span>${item.event_status}</div>
            </div>
                `);
                let marker = new mapboxGl.Marker({
                    color: "red",
                }).setLngLat(item.event_axis).setPopup(popup);
                marker_arr.push(marker)
                marker.addTo($map);
            }
        });
    };
    watchEffect(()=>{
      if(eventList.value.length<=8){
        $eventStore.changeRenderList(eventList.value)
      } 
      if(eventList.value.length>8){
        $eventStore.changeRenderList(eventList.value.slice(0,8))
      }
    })
    return { openBoxSearch, closeBoxSearch };
};
