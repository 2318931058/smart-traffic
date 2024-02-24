function toG(data) {
    // 创建一个空的geojson对象
    let geojson = {
        type: "FeatureCollection",
        features: []
    }

    /* 将SFEleArray数组中的每个元素都转化为GeoJSON对象 */
    data.SFEleArray.forEach(item => {
        let feature = {
            type: "Feature",
            geometry: {},
            properties: {}
        }

        /* 给geojson设置属性 */
        data.AttStruct.FldName.forEach((name, index) => {
            feature.properties[name] = item.AttValue[index]
        })

        /* 设置要素的几何属性 类型和坐标 */
        let fGeom = item.fGeom
        let line_arr = []
        let polygon_arr = [[]]
        if (fGeom.PntGeom.length) {
            feature.geometry.type = "Point";
            feature.geometry.coordinates = [item.fGeom.PntGeom[0].Dot.x, item.fGeom.PntGeom[0].Dot.y]
        } else if (fGeom.LinGeom.length) {
            feature.geometry.type = "Point";
            fGeom.LinGeom[0].Line.Arcs[0].Dots.forEach(axis => {
                line_arr.push([axis.x, axis.y])
                feature.geometry.coordinates = line_arr
            })
        } else if (fGeom.RegGeom.length) {
            feature.geometry.type = "Polygon";
            fGeom.RegGeom[0].Rings[0].Arcs[0].Dots.forEach(axis => {
                polygon_arr[0].push([axis.x, axis.y])
                feature.geometry.coordinates = polygon_arr
            })
        }
        // 将要素添加到GeoJSON对象的features数组中
        geojson.features.push(feature)
    })
    return geojson
}