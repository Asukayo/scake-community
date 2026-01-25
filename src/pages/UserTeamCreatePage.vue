<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showToast} from "vant";

const router = useRouter();

const doCreateTeam = () => {
  router.push({
    path: "/team/add"
  });
}
const teamList = ref([]);

// 只会在页面加载时触发一次
onMounted(async () => {
  const res = await myAxios.get("/team/list/my/create")
  if (res.code === 0) {
    teamList.value = res.data;
    console.log(teamList.value)
  } else {
    showFailToast("加载失败请刷新重试");
  }
})

</script>

<template>
  <div class="teamPage">

    <van-button type="primary" @click="doCreateTeam">创建队伍</van-button>

    <team-card-list :team-list="teamList"/>

    <van-empty v-if="teamList == null || teamList.length < 1 " image="search" description="数据为空"/>

  </div>

</template>


<style scoped>
.teamPage {
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 90px; /* 增加底部内边距，为底部导航栏留出空间 */
  box-sizing: border-box;
}

</style>