<template>
  <div class="event">
    <!-- <h2>轮播图</h2> -->
    <div class="chart">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in img" :key="index">
          <img :src="item" class="img" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
let img = [
  "https://p8.itc.cn/q_70/images03/20201228/02e007c3e9504972a216f8e4278530c2.jpeg",
  "https://5b0988e595225.cdn.sohucs.com/images/20180618/92e06fcc17e1421393c27642e528cdcc.jpeg",
  "https://p8.itc.cn/q_70/images03/20200731/439f2f7899e245929dcb17ecc8e78b18.jpeg",
  "https://5b0988e595225.cdn.sohucs.com/images/20181126/b1f39e27763c4a2f91481af9912696b1.jpeg",
  "https://p5.itc.cn/images01/20211002/4810ce5060024c2f999aed0f6cffa1c0.jpeg",
  "https://5b0988e595225.cdn.sohucs.com/images/20180820/a84b94de1dd8405da74398599d811830.jpeg",
];
</script>

<style  scoped>
.event {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 52vw;
  height: 225px;
  color: #fff;
  position: relative;
  border: 1.5px solid rgba(6, 249, 176, 0.708);
  background: url("../../../img/line.png") rgba(15, 9, 9, 0.03);
  padding: 5px;
  margin-left: 23px;
}
/* ::v-deep .el-carousel__container {
  position: fixed;
  left: 300px;
  top: 500px;
  width: 52vw;
  height: 200px;
  background-color: red;
  overflow: hidden;
} */
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.chart {
  width: 51vw;
  height: 100px;
  /* position: fixed;
  top: 580px;
  left: 340px; */
}
.img {
  width: 100%;
  background-size: cover;
}
</style>