<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios";
import type {TeamType} from "../models/team";

const router = useRouter();
const route = useRoute();

const id = route.query.id;




// 需要用户填写的表单
const updateTeamData = ref<TeamType>({});

// 获取之前的队伍信息
onMounted(async() => {
  const res = await myAxios.get("/team/getById",{
    params: {id}
  });
  if (res.code ===0) {
    updateTeamData.value = res.data;
  }else {
    showFailToast('队伍加载失败，请刷新重试')
  }
})

const onSubmit = async () => {
  const [year,month,day] = updateTeamData.value.expireTime;
  updateTeamData.value.expireTime = new Date(`${year}-${month}-${day}`);
  const postData = {
    ...updateTeamData.value,
    teamStatus : Number(updateTeamData.value.teamStatus),
  }
  // todo 前端参数校验
  const res = await myAxios.put("/team/update", postData);

  if (res?.code === 0 ){
    showSuccessToast('修改成功')
    router.push({
      path: '/team',
      replace: true
    })
  }else{
    showFailToast('修改失败')
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
  修改队伍页
  {{updateTeamData}}
  <div class="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="updateTeamData.teamName"
            name="teamName"
            label="队伍名称"
            placeholder="队伍名称"
            :rules="[{ required: true, message: '请填写队伍名称' }]"
        />

        <van-cell-group>
          <van-field
              v-model="updateTeamData.description"
              rows="4"
              autosize
              label="队伍简介"
              type="textarea"
              placeholder="请输入队伍简介"
          />
        </van-cell-group>

        <van-field name="radio" label="队伍类型">
          <template #input>
            <van-radio-group v-model="updateTeamData.teamStatus" direction="horizontal">
              <van-radio name= "0">公开</van-radio>
              <van-radio name= "1">私有</van-radio>
              <van-radio name= "2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>


        <van-field
            v-if="updateTeamData.teamStatus==='2'"
            v-model="updateTeamData.joinPassword"
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
            :placeholder="updateTeamData.expireTime ?? '请选择队伍过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
          <van-date-picker
              v-model="updateTeamData.expireTime"
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