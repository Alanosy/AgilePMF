<template>
  <div class="remark-part">
    <div></div>
    <div>
      <div style="margin-bottom:4px">{{data.userName}}</div>
       <div v-html="data.content"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RemarkPart",
  props: {
    data: {
      type: Object,
      default: () => {
  }
}
  },
  components: {}
};
</script>
<style>
.remark-part{
    padding: 15px 0 15px 15px;
    border-bottom: 1px solid #ccc;
}
</style>
