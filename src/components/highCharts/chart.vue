
<template>
  <div class="x-bar">
    <div :id="id"  :option="option"></div>
  </div>
</template>
<script>
import HighCharts from 'highcharts'
import loadExporting from "highcharts/modules/exporting"
import variable from "highcharts/modules/variable-pie"
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(HighCharts);
variable(HighCharts);
loadExporting(HighCharts)

export default {
  // 验证类型
  props: {
    id: {
      type: String
    },
    option: {
      type: Object
    },
    highchart:{
      type: Object
    }
  },
  watch: {
    option () {
      let highchart = HighCharts.chart(this.id,this.option);
      this.$emit("getHighChart", highchart)
    }
  },  
  mounted() {
    let highchart = HighCharts.chart(this.id,this.option)
    this.$emit("getHighChart", highchart)
  },
}
</script>
<style lang="scss" scoped>
  .x-bar{
    width: 100%;
    box-sizing: border-box;
    padding: 0 60px;
    div{
      width: 100%;
    }
  }
</style>