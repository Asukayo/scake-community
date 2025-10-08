<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from "vue";


const router = useRoute()
console.log(router.query.editKey)

const editInfo = ref({
  editKey: router.query.editKey,
  editLabel: router.query.editLabel,
  editValue: router.query.editValue,
})

// TODO:将待修改项目的值传给后端
const onSubmit = (values) => {
  console.log('submit', values);
};

</script>

<template>
  <van-cell :value="`正在修改${editInfo.editLabel}`" />

  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editInfo.editValue"
          :name="editInfo.editKey"
          :label="editInfo.editLabel"
          :placeholder="`请输入你的新${editInfo.editLabel}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>


</template>

