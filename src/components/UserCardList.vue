<script setup lang="ts">
import type {UserType} from "../models/user";

interface UserCardListProps {
  userList: UserType[];
}
const props = defineProps<UserCardListProps>();

</script>

<template>
  <van-card
      v-for="user in props.userList.values()"
      :price="`id:${user.id}`"
      :desc=user.profile
      :title=user.username
      :thumb=user.avatarUrl
  >
    <template #tags>
      <van-tag v-for="tag in user.tags" plain type="primary" style="margin-right: 8px;margin-top: 8px">{{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">加好友</van-button>
      <van-button size="mini">举报用户</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>