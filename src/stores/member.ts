import { defineStore } from "pinia";
import { Member } from "../../types/Members.d.ts";

export const useMemberStore = defineStore("member", {
  state: () => {
    return {
      member: {} as Member,
      members: [] as Member[],
      search: {
        kana: "",
      },
      showMemberDetail: false,
    };
  },
  actions: {
    async getMembers() {
      const res = await fetch(
        "http://localhost:8000/nogi/members",
      );
      const json = await res.json();
      this.$state.members = json.members;
    },

    async getMemberById(id: number) {
      const res = await fetch(
        `http://localhost:8000/nogi/members/${id}`,
      );
      this.$state.member = await res.json();
    },

    setShowMemberDetail() {
      this.$state.showMemberDetail = true;
    },
  },
});
