<template>
        <div id="legend" >
        <!-- Legend items go here -->
        <div class="legend-item">
            <div class="legend-color" style="background-color:green;">畅通</div>
        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: #ffa300;">拥堵</div>

        </div>
        <div class="legend-item">
            <div class="legend-color" style="background-color: red;">严重拥堵</div>
        </div>
    </div>
</template>

<script setup>

</script>

<style  scoped>
#legend {
    width: 100px;
    position: fixed;
    left: 420px;
    top: 200px;
    text-align: center;
    font-size: 15px;
    border-radius:5px ;
}
</style>