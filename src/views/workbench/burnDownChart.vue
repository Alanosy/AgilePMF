<template>

    <div id="main" style="width: 1300px; height: 600px; "></div>

</template>
<script>
import { getBurndownChart } from "@/api/task";
import echarts from "echarts";
export default {
  name: "app",
  props:{
    itemId:{
      type:Number,
      default:null
    }
  },
   watch: {
    itemId(val) {
      if(val){
        this.getBurndownChartFun(val)
      }
    },
  },
  data() {
    return {
      data:{},
    };
  },
  methods: {
    getBurndownChartFun(itemId){
      const data ={
        itemId:itemId
      }
      getBurndownChart(data).then(res => {
        if(res.code){
          this.data = res.data
          this.drawChart()
        }
      })
    },

    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
         title: {
          text: '项目燃尽图',
          x: 'center' // 标题位置
    
        },
        xAxis: {
          type: "category",
          data: this.data.dateList,
            axisLabel: {
          rotate: -45
        },
        // 设置边界间隙，确保每个类目值都显示
        boundaryGap: true
        },
        yAxis: {
          type: "value",
           // 确保y轴的范围覆盖所有数据点
        min: Math.min(...this.data.valueList) - 1,
        max: Math.max(...this.data.valueList) + 1,
        // 调整分割线数量
        splitNumber: 5
        },
        series: [
          {
            data: this.data.valueList,
            type: "line",
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  // mounted() {
  //   this.drawChart();
  // },
};
</script>
