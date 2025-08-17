
<template>
  <!--  fixed 固定在顶端    -->
  <van-nav-bar
      fixed
      left-arrow
      left-text="返回"
      right-text="按钮"
      title="标题"
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

<!--  <slot name="content">-->
<!--&lt;!&ndash;    定义一个插槽，允许往插槽中赛内容&ndash;&gt;-->
<!--    <div>在这里些内容</div>-->
<!--  </slot>-->


<!-- 通过active判断内容是否改变 -->
  <div id="content">
    <template v-if="active ==='index'">
      <Index/>
    </template>

    <template v-if=" active === 'team'">
      <Team/>
    </template>

  </div>




<!--  底部导航栏-->
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="user">个人</van-tabbar-item>
<!--    <van-tabbar-item icon="setting-o">标签 4</van-tabbar-item>-->
  </van-tabbar>


</template>

<script setup >
//使用setup语法糖就不需要再返回，定义的所有变量都会暴露给template
import { ref } from 'vue';
import {showToast} from 'vant';
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";

const onClickLeft = () => alert("Click on left");
const onClickRight = () => alert("Click on right");

// ref关联高亮标签
const active = ref("index");
// vant4中所有的Toast转为showToast

const onChange = (index) => {
  return showToast(`标签 ${index}`);
};

</script>
