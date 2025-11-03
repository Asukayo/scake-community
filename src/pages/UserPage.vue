<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";

// const user = {
//   id: 1,
//   username: "scake",
//   userAccount: "sharkycake",
//   avatarUrl: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
//   gender: 1,
//   phone: "123213131",
//   email: "sjgiub@QQ.com",
//   createTime: new Date(),
// }

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
  const currentUser = await getCurrentUser();
  if (currentUser != null) {
    console.log("UserPage调试信息", currentUser)
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
    <van-cell title="编号" :value = "user.id"/>
    <van-cell title="昵称" is-link to="/user/edit" arrow-direction="down" :value="user.username"
              @click="doEdit('username','昵称',user.username)"/>

    <van-cell title="账号" :value="user.userAccount"/>
<!--    TODO 头像的修改还需另外修改-->
    <van-cell title="头像" is-link to="/user/edit" arrow-direction="down">
      <van-image :src="user.avatarUrl" class="search-icon"/>
    </van-cell>

    <van-cell title="性别" is-link arrow-direction="down" :value="user.gender"
              @click="doEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" arrow-direction="down" :value="user.phone"
              @click="doEdit('phone','电话',user.phone)"/>

    <van-cell title="邮箱" is-link to="/user/edit" arrow-direction="down" :value="user.email"
              @click="doEdit('email','邮箱',user.email)"/>

    <van-cell title="入站时间" arrow-direction="down" :value="user.createTime"/>
  </template>
</template>

<style scoped>
.search-icon {
  height: 48px;
  line-height: inherit;
}
</style>