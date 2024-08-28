<template>

    <div id="main" style="width: 1300px; height: 600px; "></div>

</template>
<script>
import echarts from "echarts";
export default {
  name: "app",
  methods: {
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
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.drawChart();
  },
};
</script>
