<template>
    <div class="traffic-notice">
      <div class="btn">
        <el-input
      class="w-50 m-2"
      placeholder="请输入"
      size="small"
      style="max-width: 160px;"
    />
        <el-button size="small" round>搜索</el-button>
      </div>

      <div class="event">
        <div>
          <el-button >事件列表</el-button>
          <el-button >我的事件</el-button>
        </div>
        <div class="content">
            <div class="box">事件1</div>  
            <div class="box">事件1</div>  
            <div class="box">事件1</div>  
            <div class="box">事件1</div>  
            <div class="box">事件1</div>  
        </div>
           <el-pagination
                  small
                :page-size="5"
                :pager-count="5"
                  layout="prev, pager, next"
                  :total="25"
            />
      </div>

    </div>
</template>

<script setup>



</script>

<style  scoped>
.traffic-notice {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 350px;
  height: 345px;
  margin-top: 5px;
  color: #fff;
  position: relative;
  border: 1.5px solid rgba(6, 249, 176, 0.708);
  background: url("../../../img/line.png") rgba(15, 9, 9, 0.03);
  padding: 15px;
}

.btn {
  width: 330px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  gap:20px;
  align-items: center;
}
.event{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 330px;
  height: 345px;
 
}
.box{
  margin-top:10px ;
  font-size: 14px;
  border-bottom:1.5px dotted rgba(13, 235, 168, 0.17);
}
.el-pagination{
  margin-top:10px ;
  align-self: center;
}
</style>