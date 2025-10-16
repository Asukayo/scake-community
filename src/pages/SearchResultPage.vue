<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js"
import {showFailToast, showSuccessToast} from "vant";
import type {UserType} from "../models/user";

const router = useRoute()
const {tags} = router.query;

//添加类型声明
const userList = ref<UserType[]>([]);

// 钩子函数，当页面dom元素加载好之后执行
onMounted(async () => {
  const userListData: UserType[] = await myAxios.post('/user/searchByTags', tags)
      .then(function (response) {
        console.log("/user/searchByTags",response);
        showSuccessToast("请求成功")
        return response.data;
      }).catch(function (error) {
        console.log(error);
        showFailToast("请求失败")
      });
  // console.log(userListData)
  if (userListData){
    userListData.map(user => {
      if (user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})


console.log(router.query.tags)


// const mockUser1 = {
//   id: 1,
//   username: "FakeSharkycake",
//   userAccount: "FakeSharkycake",
//   avatarUrl: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
//   profile: "我是一个农村人，收银本领强，啦啦啦啦啦啦啦，得得得得得",
//   gender: "男",
//   phone: "12312312311",
//   email: "30842137@qq.com",
//   userRole: 1,
//   inviteCode: "231312",
//   createTime: new Date(),
//   Tags: ["java", "c++", "python"]
// }
// const mockUser2 = {
//   id: 1,
//   username: "FakeSharkycake",
//   userAccount: "FakeSharkycake",
//   avatarUrl: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
//   profile: "我是一个农村人，收银本领强，啦啦啦啦啦啦啦，得得得得得",
//   gender: "男",
//   phone: "12312312311",
//   email: "30842137@qq.com",
//   userRole: 1,
//   inviteCode: "231312",
//   createTime: new Date(),
//   Tags: ["java", "c++", "kkkk"]
// }




</script>

<template>

  <van-card
      v-for="user in userList.values()"
      :price="`id:${user.id}`"
      :desc=user.profile
      :title=user.username
      :thumb=user.avatarUrl
  >
    <template #tags>
      <van-tag v-for="tag in user.tags" plain type="primary" style="margin-right: 8px;margin-top: 8px">{{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">加好友</van-button>
      <van-button size="mini">举报用户</van-button>
    </template>
  </van-card>

  <van-empty v-if="userList == null || userList.length < 1 " image="search" description="未搜索到满足条件的用户" />
</template>

