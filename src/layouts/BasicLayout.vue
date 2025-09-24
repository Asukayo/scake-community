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
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <!--  <slot name="content">-->
  <!--&lt;!&ndash;    定义一个插槽，允许往插槽中赛内容&ndash;&gt;-->
  <!--    <div>在这里些内容</div>-->
  <!--  </slot>-->


  <!--搭配vue-router使用-->
  <div class="parent-container">
    <router-view/>
  </div>


  <!--  底部导航栏-->
  <van-tabbar route @change="onChange" v-model="active">
    <van-tabbar-item replace to="/" icon="home-o" name="index">
      主页
    </van-tabbar-item>

    <van-tabbar-item replace to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>


</template>

<style>
.parent-container {
  position: fixed; /* 固定在视口 */
  top: 46px; /* 固定在顶部 */
  left: 0; /* 固定在左侧 */
  width: 100%; /* 根据需要设置宽度 */
  z-index: 0; /* 确保在最上层 */
  background-color: #f4f4f4; /* 可选，添加背景色 */
  padding: 10px; /* 可选，添加内边距 */
}
</style>


<script setup>
//使用setup语法糖就不需要再返回，定义的所有变量都会暴露给template
import {ref} from 'vue';
import {showToast} from 'vant';
import {useRouter} from "vue-router";

const router = useRouter();

const onClickLeft = () => {
  router.push('/');
};
const onClickRight = () => {
  router.push('/search');
}

// ref关联高亮标签
const active = ref("index");


// vant4中所有的Toast转为showToast

const onChange = (index) => {
  return showToast(`标签 ${index}`);
};

</script>
