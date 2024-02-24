import mapboxGl from "mapbox-gl";
import { app } from "../main";
mapboxGl.accessToken = 'pk.eyJ1IjoiY2hlbmdiZW5jaGFvIiwiYSI6ImNsODU3aGRiODA0Y2UzcHBzZmFlcmdqZ2sifQ.8k59W_pB_Riwe6o-MneRlA'
export default () => {
    onMounted(() => {
        const map = new mapboxGl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v12",
            // style: gaode,
            center: [114.36, 30.49],
            zoom: 11.6,
            // pitch: 45,
            projection: 'globe',
        });

        map.on("style.load", () => {
            map.setFog({})
            /* 禁止双击地图放大 */
            map.doubleClickZoom.disable()
            // 监控图层
            let camera_data = 'src/gis_data/camera.geojson';
            map.addSource("camera-source", {
                type: "geojson",
                data: camera_data,
            })
            map.addLayer({
                id: "camera-layer",
                source: "camera-source",
                type: "circle",
                paint: {
                    'circle-radius': 5,
                    'circle-color': "blue",
                }
            })
            //加载事件图层
            let event_data = 'src/gis_data/event.geojson';
            map.addSource("event-source", {
                type: "geojson",
                data: event_data,
            })
            map.addLayer({
                id: "event-layer",
                source: "event-source",
                type: "circle",
                paint: {
                    'circle-radius': 4,
                    'circle-color': "red",
                }
            })


            //加载道路图层
            let road_data = 'src/gis_data/guanggu_road.geojson';
            map.addSource("road-source", {
                type: "geojson",
                data: road_data,
            })
            map.addLayer({
                id: "road-layer",
                source: "road-source",
                type: "line",
                paint: {
                    'line-width': 3,
                    'line-color': "#41fc9d",
                }
            })
            //加载警务室图层
            let police_data = 'src/gis_data/police_room.geojson';
            map.addSource("police-source", {
                type: "geojson",
                data: police_data,
            })
            map.addLayer({
                id: "police-layer",
                source: "police-source",
                type: "circle",
                paint: {
                    'circle-radius': 4,
                    'circle-color': "#0f1a42",
                }
            })
            //加载居民区图层
            let residential_data = 'src/gis_data/residential_area.geojson';
            map.addSource("residential-source", {
                type: "geojson",
                data: residential_data,
            })
            map.addLayer({
                id: "residential-layer",
                source: "residential-source",
                type: "fill",
                paint: {
                    'fill-color': "#0f1a42",
                    'fill-opacity': 0.3,
                }
            })
        })
        app.provide("$map", map);
    });
}