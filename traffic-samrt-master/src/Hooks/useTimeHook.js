const useTimeHook=()=>{
    let time = ref(null)
    let t=null
    onMounted(()=>{
            // 获取当前时间
            t = setTimeout(timer, 1000); //開始运行
            function timer() {
                clearTimeout(t); //清除定时器
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth()+1
                let day = date.getDate()
                let hour = date.getHours()
                let minute = date.getMinutes()
                let second = date.getSeconds()
                let str = `${year}年${month}月${day}日${hour}时${minute}分${second}秒`
                time.value.innerHTML = str
                t = setTimeout(timer, 1000); //设定定时器，循环运行
            }
         
    })
    return {time}
}
export {useTimeHook}