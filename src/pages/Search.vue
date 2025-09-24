<template >
  <van-row>
    <form action="/">
      <van-search
          v-model="searchText"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          autofocus
      />
    </form>
  </van-row>
</template>


<script setup>

import {ref} from 'vue';
import {Toast} from 'vant';
import {useRouter} from "vue-router";

const router = useRouter();
const searchText = ref('');
const onSearch = (val) => Toast(val);
const onCancel = () => {
  // Toast("取消搜索，返回主页面")
  router.push("/");
};


</script>