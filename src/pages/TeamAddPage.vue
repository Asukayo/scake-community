<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import axios from "axios";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios";

const router = useRouter();

const initFormData = {
  "description": null,
  "expireTime": null,
  "joinPassword": "",
  "maxNum": 3,
  "teamName": "",
  "teamStatus": 0
}
// 需要用户填写的表单
const addTeamData = ref({...initFormData});

const onSubmit = async () => {
  const [year,month,day] = addTeamData.value.expireTime;
  addTeamData.value.expireTime = new Date(`${year}-${month}-${day}`);
  const postData = {
    ...addTeamData.value,
    teamStatus : Number(addTeamData.value.teamStatus),
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/add", postData);

  if (res?.code === 0 ){
    showSuccessToast('添加成功')
    router.push({
      path: '/team',
      replace: true
    })
  }else{
    showFailToast('添加失败')
  }

}


// 日期选择器所需的script
const minDate = new Date();
const result = ref('');
const showPicker = ref(false);
const pickerValue = ref([]);
const onConfirm = ({selectedValues}) => {
  result.value = selectedValues.join('/');
  pickerValue.value = selectedValues;
  showPicker.value = false;
};

</script>

<template>
  创建队伍页
  {{addTeamData}}}
  <div class="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.teamName"
            name="teamName"
            label="队伍名称"
            placeholder="队伍名称"
            :rules="[{ required: true, message: '请填写队伍名称' }]"
        />

        <van-cell-group>
          <van-field
              v-model="addTeamData.description"
              rows="4"
              autosize
              label="队伍简介"
              type="textarea"
              placeholder="请输入队伍简介"
          />
        </van-cell-group>

        <van-field name="stepper" label="队伍最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>

        <van-field name="radio" label="队伍类型">
          <template #input>
            <van-radio-group v-model="addTeamData.teamStatus" direction="horizontal">
              <van-radio name= "0">公开</van-radio>
              <van-radio name= "1">私有</van-radio>
              <van-radio name= "2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>


        <van-field
            v-if="addTeamData.teamStatus==='2'"
            v-model="addTeamData.joinPassword"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请输入队伍密码' }]"
        />

        <van-field
            is-link
            readonly
            name="datePicker"
            label="过期时间"
            :placeholder="addTeamData.expireTime ?? '请选择队伍过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
          <van-date-picker
              v-model="addTeamData.expireTime"
              :model-value="pickerValue"
              @confirm="onConfirm"
              @cancel="showPicker = false"
              :minDate="minDate"
          />
        </van-popup>

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>

</style>