import { defineStore } from 'pinia';

interface UserState {
    type: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    type: '',
  }),
  actions: {
    setType(type: string) {
      this.type = type;
    },
  },
});