<script setup lang="ts">
import {useRouter} from "vue-router";

const user = {
  id: 1,
  username: "scake",
  userAccount: "sharkycake",
  avatarUrl: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  gender: 1,
  phone: "123213131",
  email: "sjgiub@QQ.com",
  createTime: new Date(),
}
const router = useRouter()
const doEdit = (editKey: string,editLabel: string,editValue: string) => {
  router.push({
    path: "/user/edit",
    query: {
      editKey: editKey,
      editLabel: editLabel,
      editValue: editValue
    }
  })

}

</script>

<template>

  <van-cell title="编号" :value=user.id />
  <van-cell title="昵称" is-link to="/user/edit" arrow-direction="down" :value=user.username />
  <van-cell title="账号" value="内容" />
  <van-cell title="头像" is-link to="/user/edit" arrow-direction="down">
      <van-image :src="user.avatarUrl" class="search-icon"/>
  </van-cell>
  <van-cell title="性别" is-link arrow-direction="down" :value=user.gender @click="doEdit('gender','性别',user.gender)"/>
  <van-cell title="电话" is-link to="/user/edit" arrow-direction="down" :value=user.phone />
  <van-cell title="邮箱" is-link to="/user/edit" arrow-direction="down" :value=user.email />
  <van-cell title="入站时间" arrow-direction="down" :value=user.createTime.toISOString() />

</template>

<style scoped>
.search-icon {
  height: 48px;
  line-height: inherit;
}
</style>