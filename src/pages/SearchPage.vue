<template >
  <van-row>
    <form action="/" style="width: 100%;">
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
  <van-divider>已选标签</van-divider>
  <div v-if="activeId.length === 0">请选择标签</div>
  <van-tag v-for="tag in activeId" closeable size="medium" type="primary" @close="doClose(tag)">
    {{tag}}
  </van-tag>

  <van-divider>可选标签</van-divider>

  <van-tree-select
      v-model:active-id="activeId"
      v-model:main-active-index="activeIndex"
      :items="tempItems"
  />
  <div style="padding: 20px">
  <van-button block primary @click="searchUsers()">
    搜索用户
  </van-button>
  </div>
</template>


<script setup>

import {ref} from 'vue';
import {Toast} from 'vant';
import {useRouter} from "vue-router";

const show = ref(true);
const doClose = (tag) => {

  activeId.value = activeId.value.filter(item => {
    return item !== tag;
  })
};

const activeId = ref([]);
const activeIndex = ref(0);

const originItems = [
  {
    text: '性别',
    children: [
      { text: '男', id: "男" },
      { text: '女', id: "女" },
      { text: '沃尔玛购物袋', id: "沃尔玛购物袋", disabled: true },
    ],
  },
  {
    text: '学习方向',
    children: [
      { text: 'java', id: 'java' },
      { text: 'python', id: 'python' },
      { text: 'c++', id: 'c++' },
    ],
  },
  // { text: '福建', disabled: true },
];

let tempItems = ref(originItems);

// 定义路由
const router = useRouter();
// 搜索条件
const searchText = ref('');

const onSearch = (val) => {
  tempItems.value = originItems.map(parentTag =>{
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item =>
      item.text.includes(searchText.value)
    );
    return tempParentTag;
  })
};
const onCancel = () => {
  // Toast("取消搜索，返回主页面")
  searchText.value = '';
  // router.push("/");
  tempItems.value = originItems;
};

const searchUsers = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeId.value
    }
  })
}

</script>