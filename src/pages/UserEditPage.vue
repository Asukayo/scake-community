<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";


const route = useRoute()
const router = useRouter()
console.log(route.query.editKey)


const editInfo = ref({
  editKey: (route.query.editKey as string) || '',
  editLabel: (route.query.editLabel as string) || '',
  editValue: (route.query.editValue as string) || '',
})

// 为 values 参数添加类型注解
const onSubmit = async () => {

  const currentUser = await getCurrentUser();

  const res = await myAxios.post('/user/update',{
    // 这里只封装了id和需要修改的值
    // 这两个值传给后端会自动封装进一个user对象，其余值都为空，在更新的时候只要id和需要修改的值即可
    'id':currentUser.id,
    [editInfo.value.editKey as string]: editInfo.value.editValue,
  })
  if (res.code === 0 && res.data > 0 ) {
    showSuccessToast("修改成功")
    router.back()
  }else {
    showFailToast("修改错误")
  }
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
      <van-button round block type="primary" native-type="submit" >
        提交
      </van-button>
    </div>
  </van-form>


</template>

