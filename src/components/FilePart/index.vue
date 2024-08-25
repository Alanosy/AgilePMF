<template>
<div class="FilePart">
<div class="file-img">1</div>
<div class="file-title">2</div>
<div>3</div>
<div class="ivu-icon">4</div>
</div>
</template>
<script>
export default {
    name: "FilePart",
    props:{
        fileTitle:{
            type:String,
            default:""
        },
        fileImage:{
            type:String,
            default:""
        }
    }
}
</script>
<style scoped>
.FilePart{
    height:80px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    width: 32.24333%;
    padding: 16px;
    margin-right: 16px;
    margin-bottom: 16px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #fff;
    .file-img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 56px;
        height: 56px;
        object-fit: cover;
    }
    .file-title {

        flex: 1;
        width: 0;
        margin: 0 18px;
        line-height: 24px;
        word-break: break-all;
        font-size: 14px;
        color: #409eff;
    }
    .ivu-icon {
        display: inline-block;
        font-family: Ionicons;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        text-rendering: optimizeLegibility;
        line-height: 1;
        vertical-align: -.125em;
        text-align: center;
    }

}
</style>