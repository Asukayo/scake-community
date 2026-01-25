<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios";
import {setCurrentUser} from "../services/user.ts";


const user = ref()
const router = useRouter()

const doEdit = (editKey: string, editLabel: string, editValue: string) => {
  router.push({
    path: "/user/edit",
    query: {
      editKey: editKey,
      editLabel: editLabel,
      editValue: editValue
    }
  })

}

onMounted(async () => {
  const res = await myAxios.get("/user/current");
  const currentUser = res.data;
  if (currentUser != null) {
    console.log("UserPage调试信息", currentUser)
    setCurrentUser(currentUser)
    showSuccessToast("获取用户信息成功")
    user.value = currentUser
  } else {
    showFailToast("获取用户信息失败")
    router.push("/user/login")  // 在组件内处理路由跳转
  }
})


</script>

<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user.userAccount"/>
    <van-cell title="修改我的信息" is-link to="/user/update"/>
    <van-cell title="我加入的队伍" is-link to="/user/team/join"/>
    <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
  </template>
</template>

<style scoped>
.search-icon {
  height: 48px;
  line-height: inherit;
}
</style>