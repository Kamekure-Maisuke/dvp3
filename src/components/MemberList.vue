<script setup lang="ts">
import { onMounted } from "vue";
import { useMemberStore } from "../stores/member"
defineProps<{ title: string }>()

const store = useMemberStore()

onMounted(() => {
  store.getMembers()
})

const showMemberInfo = (id: number) => {
  store.getMemberById(id)
  store.setShowMemberDetail()
}
</script>

<template>
  <h1>{{ title }}</h1>
  <div class="container">
    <div class="item">
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th>生年月日</th>
            <th>出身地</th>
            <th>詳細</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in store.$state.members" :key="member.id">
            <td>{{ member.name }}</td>
            <td>{{ member.birthDate }}</td>
            <td>{{ member.birthPlace }}</td>
            <td>
              <ion-icon
                class="ionIcon"
                name="ellipsis-horizontal-outline"
                @click="showMemberInfo(member.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="store.showMemberDetail" class="item">
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{{ store.$state.member.id }}</td>
          </tr>
          <tr>
            <th>名前</th>
            <td>{{ store.$state.member.name }}</td>
          </tr>
          <tr>
            <th>かな</th>
            <td>{{ store.$state.member.kana }}</td>
          </tr>
          <tr>
            <th>生年月日</th>
            <td>{{ store.$state.member.birthDate }}</td>
          </tr>
          <tr>
            <th>出身地</th>
            <td>{{ store.$state.member.birthPlace }}</td>
          </tr>
          <tr>
            <th>血液型</th>
            <td>{{ store.$state.member.bloodType }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}
.ionIcon:hover {
  cursor: pointer;
}
</style>