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
      { text: '男', id: 1 },
      { text: '女', id: 2 },
      { text: '沃尔玛购物袋', id: 3, disabled: true },
    ],
  },
  {
    text: '地区',
    children: [
      { text: '南京', id: 4 },
      { text: '无锡', id: 5 },
      { text: '徐州', id: 6 },
    ],
  },
  // { text: '福建', disabled: true },
];

let tempItems = ref(originItems);

// 定义路由
const router = useRouter();
// 搜索条件
const searchText = ref('');
// TODO 搜索事件逻辑还需更改
// TODO:根据搜索框内容进行标签的过滤后进行展示
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


</script>