<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js"
import {showFailToast, showSuccessToast} from "vant";
import type {UserType} from "../models/user";
import UserCardList from "../components/UserCardList.vue";

const router = useRoute()


//添加类型声明
const userList = ref<UserType[]>([]);

// 钩子函数，当页面dom元素加载好之后执行
onMounted(async () => {
  const userListData: UserType[] = await myAxios.get('/user/recommend',{
    params:{
      pageNum: 1,
      pageSize: 8,
    }
  })
      .then(function (response) {
        console.log("/user/searchByTags", response);
        showSuccessToast("请求成功")
        return response.data;
      }).catch(function (error) {
        console.log(error);
        showFailToast("请求失败")
      });
  // console.log(userListData)
  if (userListData) {
    userListData.map(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
})


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
  <div class="page-container">
    <UserCardList :user-list="userList"/>

    <van-empty v-if="userList == null || userList.length < 1 " image="search" description="数据为空"/>
  </div>
</template>


<style scoped>
.page-container {
  height: 100vh;
  overflow-y: auto;
  padding-bottom: 90px; /* 增加底部内边距，为底部导航栏留出空间 */
  box-sizing: border-box;
}
</style>
