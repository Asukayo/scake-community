<script setup lang="ts">
import type {TeamType} from "../models/team";
import {teamStatusTnum} from "../constants/team.ts";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = defineProps<TeamCardListProps>();

const router = useRouter();
/**
 * 加入队伍
 */
const doJoinTeam = async (id: number, teamStatus: number) => {
  // todo 加入有密码的房间要指定密码
  const res = await myAxios.post('/team/join',
      {
        id: id,
        teamStatus: teamStatus,
      });
  if (res.code === 0) {
    showSuccessToast("加入成功")
  } else {
    showFailToast(res.description)
  }
}

const currentUser = getCurrentUser();

/**
 * 更新队伍，跳转至用户更新页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: 'team/update',
    query: {
      id,
    }
  });
}

const doQuitTeam = async (id: number) => {
  // todo 加入有密码的房间要指定密码
  const res = await myAxios.get('/team/quit', {
        params: {
          quitTeamId: id
        }
      }
  );
  if (res.code === 0) {
    showSuccessToast("退出成功")
  } else {
    showFailToast(res.description)
  }
}
const doDisBandTeam = async (id: number) => {
  // todo 加入有密码的房间要指定密码
  const res = await myAxios.get('/team/disband',
      {
        params: {
          teamId: id
        }
      });
  if (res.code === 0) {
    showSuccessToast("解散成功")
  } else {
    showFailToast(res.description)
  }
}

</script>

<template>
  <van-card
      v-for="team in props.teamList.values()"

      :desc="team.description"
      :title="team.teamName"
      :thumb=" team.joinUsers[0].avatarUrl &&'https://scake-web-tilas.oss-cn-hangzhou.aliyuncs.com/617dd15e-e1f0-48b8-a808-007ce44ca121.jpg'"

  >
    <template #tags>
      <van-tag plain type="primary" style="margin-right: 8px;margin-top: 8px">
        {{ teamStatusTnum[team.teamStatus] }}
      </van-tag>
    </template>
    <template #bottom>
      <div>最大人数:{{ team.maxNum }}</div>
      <div>过期时间:{{ team.expireTime }}</div>
    </template>
    <template #footer>
      <van-button size="mini" type="primary" plain @click="doJoinTeam(team.id,team.teamStatus)">加入队伍</van-button>
      <van-button v-if="team.createUserId == currentUser?.id" size="mini" @click="doUpdateTeam(team.id)">修改队伍信息
      </van-button>

      <van-button size="mini" v-if="team.joinUsers.some(user => user?.id === currentUser?.id)"
                  @click="doQuitTeam(team.id)">退出队伍
      </van-button>
      <van-button v-if="team.createUserId == currentUser?.id" size="mini" @click="doDisBandTeam(team.id)">解散队伍
      </van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>