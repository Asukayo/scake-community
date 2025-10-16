<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();

const ToLoginPage = () => {
  router.push("/user/login");
}

</script>

<template>
主页
  <div>
    <van-image
      round
      width="10rem"
      height="10rem"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
  </div>
  <van-button @click="ToLoginPage()">请登录</van-button>
</template>

