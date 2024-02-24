<template>
    <div class="map-box">
      <div id="map" class="map" style="justify-content: center; position: relative"></div>
    </div>
  </template>
  
  <script setup>
  import mapboxGl from "mapbox-gl";
  import { onMounted } from "vue";
  import { app } from "../../../main";
  
  import { EventHttp } from "../../../Http/EventHttp";
  mapboxGl.accessToken =
    "pk.eyJ1IjoiY2hlbmdiZW5jaGFvIiwiYSI6ImNsODU3aGRiODA0Y2UzcHBzZmFlcmdqZ2sifQ.8k59W_pB_Riwe6o-MneRlA";
  
  // let event_data = {
  //   type:'FeatureCollection',
  //   features:[]
  // }
  onMounted(() => {
    const map = new mapboxGl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      // style: gaode,
      center: [114.36, 30.49],
      zoom: 11.6,
      // pitch: 45,
      projection: "globe",
    });
  
    map.on("style.load", async () => {
      map.setFog({});
      map.doubleClickZoom.disable();
      let camera_data = "src/gis_data/camera.geojson";
  
      map.addSource("camera-source", {
        type: "geojson",
        data: camera_data,
      });
      map.addLayer({
        id: "camera-layer",
        source: "camera-source",
        type: "circle",
        paint: {
          "circle-radius": 5,
          "circle-color": "blue",
        },
      });
      //加载事件图层
  
      let event_res = await EventHttp.getAllEventHttp()
      let res = event_res.data.result
      res.forEach(item => {
        let data = {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: item.event_axis
            }
          }]
        }
        map.addSource("draw-source" + item.fid, {
          type: "geojson",
          data
        });
        if (item.event_status === '0') {
          map.addLayer({
            id: "draw-layer" + item.fid,
            source: "draw-source" + item.fid,
            type: "circle",
            paint: {
              "circle-radius": 5,
              "circle-color": "red",
            },
          });
        }else if(item.event_status === '1'){
          map.addLayer({
            id: "draw-layer" + item.fid,
            source: "draw-source" + item.fid,
            type: "circle",
            paint: {
              "circle-radius": 5,
              "circle-color": "yellow",
            },
          });
        }else{
          map.addLayer({
            id: "draw-layer" + item.fid,
            source: "draw-source" + item.fid,
            type: "circle",
            paint: {
              "circle-radius": 5,
              "circle-color": "green",
            },
          });
        }
      
      })
      //加载道路图层
      let road_data = "src/gis_data/guanggu_road.geojson";
      map.addSource("road-source", {
        type: "geojson",
        data: road_data,
      });
      map.addLayer({
        id: "road-layer",
        source: "road-source",
        type: "line",
        paint: {
          "line-width": 3,
          "line-color": "#41fc9d",
        },
      });
      //加载道路图层
      let police_data = "src/gis_data/police_room.geojson";
      map.addSource("police-source", {
        type: "geojson",
        data: police_data,
      });
      map.addLayer({
        id: "police-layer",
        source: "police-source",
        type: "circle",
        paint: {
          "circle-radius": 4,
          "circle-color": "#0f1a42",
        },
      });
      //加载居民区图层
      let residential_data = "src/gis_data/residential_area.geojson";
      map.addSource("residential-source", {
        type: "geojson",
        data: residential_data,
      });
      map.addLayer({
        id: "residential-layer",
        source: "residential-source",
        type: "fill",
        paint: {
          "fill-color": "#0f1a42",
          "fill-opacity": 0.3,
        },
      });
    });
    app.provide("$map", map);
  });
  </script>
  
  <style  scoped>
 #map {
  width: 100vw;
  height: 100vh;
}

  </style>