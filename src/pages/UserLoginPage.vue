<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter()


const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res  = await myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  if (res.data != null) {
    showSuccessToast("登陆成功！ Ciallo～(∠・ω<)⌒★")
    // 登录成功，重定向到首页
    router.replace("/")
  }else {
    showFailToast("登陆失败！爬爬爬")
  }
};



</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号捏"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="此处应该填密码哦"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>