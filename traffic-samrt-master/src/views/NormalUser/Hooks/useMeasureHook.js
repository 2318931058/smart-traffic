import $ from 'jquery'
import * as turf from "@turf/turf";
export default () => {
  let draw
  let $map
  onMounted(() => {
    draw = inject('$draw')
    $map = inject("$map");
  })
  const openMeasure = () => {
    $('.map-box  .mapbox-gl-draw_ctrl-draw-btn').show()
    $map.on("draw.create", handleDraw);
    $map.on("draw.delete",deleteDraw);
  }
  const closeMeasure = () => {
    $('.map-box  .mapbox-gl-draw_ctrl-draw-btn').hide()
    
  }
  const handleDraw = (e) => {
    // 获取面积
    var position = e.features[0];
    if (position.geometry.type == "LineString") {
      var from = turf.point(position.geometry.coordinates[0]);
      var to = turf.point(position.geometry.coordinates[1]);
      var options = { units: "miles" };
      var distance = turf.distance(from, to, options);
      var center = turf.center(position).geometry.coordinates;
      let p = $map.project(center); //经纬度转化屏幕
      let name = (distance * 1.61).toFixed(2) + "公里";
      $("#popup")
        .show()
        .text(name)
        .css({
          top: p.y + "px",
          left: p.x + "px",
        });
    }
    if (position.geometry.type == "Polygon") {
      var area = turf.area(position);
      var center = turf.center(position).geometry.coordinates;
      let p = $map.project(center); //经纬度转化屏幕
      let name = (area / 1000).toFixed(2) + "平方公里";
      $("#popup")
        .show()
        .text(name)
        .css({
          top: p.y + "px",
          left: p.x + "px",
        });
    }
  }
  // 清除画笔popup
  const deleteDraw = () => {
    $("#popup").hide();
  }
  return { openMeasure, closeMeasure }
}