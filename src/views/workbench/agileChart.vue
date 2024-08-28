<template>
<div class="agileChart">

<!---->
    <div class="top-tool">
    <div>项目：</div><div><ProjectSelect></ProjectSelect></div>
    </div>
    <div class="charts"> <burnDownChart></burnDownChart> </div>
</div>
</template>
<script>
import ProjectSelect from "@/components/ItemSelect";
import burnDownChart from "./burnDownChart.vue"
export default {
    name: 'agileChart',
    components:{
        burnDownChart,
        ProjectSelect
    }
}

</script>
<style scoped>
.agileChart{
    width: 100%;
    height: 100%;
    padding:30px;
    .top-tool{
        height:130px;
        display: flex;
        align-items: center;
        background:#fff;
        padding-left: 30px;
         padding-right: 30px;
        border-radius: 16px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
        margin-bottom: 30px;
    }

    .charts{
         display: flex;
         justify-content: center;
         align-items: center;
         background:#fff;
        border-radius: 16px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
        height: 700px;
    }
}
</style>