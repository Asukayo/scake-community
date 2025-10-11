<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";


const router = useRoute()
console.log(router.query.tags)

// const { tags } = router.query;

const mockUser1 = {
  id :  1,
  username : "FakeSharkycake",
  userAccount : "FakeSharkycake",
  avatarUrl : "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  profile : "我是一个农村人，收银本领强，啦啦啦啦啦啦啦，得得得得得",
  gender : "男",
  phone : "12312312311",
  email : "30842137@qq.com",
  userRole : 1,
  inviteCode : "231312",
  createTime : new Date(),
  Tags : ["java","c++","python"]
}
const mockUser2 = {
  id :  1,
  username : "FakeSharkycake",
  userAccount : "FakeSharkycake",
  avatarUrl : "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  profile : "我是一个农村人，收银本领强，啦啦啦啦啦啦啦，得得得得得",
  gender : "男",
  phone : "12312312311",
  email : "30842137@qq.com",
  userRole : 1,
  inviteCode : "231312",
  createTime : new Date(),
  Tags : ["java","c++","kkkk"]
}

const userList = ref([mockUser1,mockUser2]);



</script>

<template>

  <van-card
      v-for = "user in userList"
      :price= "`id:${user.id}`"
      :desc=user.profile
      :title=user.username
      :thumb=user.avatarUrl
  >
    <template #tags>
      <van-tag v-for="tag in user.Tags" plain type="primary" style="margin-right: 8px;margin-top: 8px">{{tag}}</van-tag>
    </template>
    <template #footer>
      <van-button size="mini">加好友</van-button>
      <van-button size="mini">举报用户</van-button>
    </template>
  </van-card>


</template>

