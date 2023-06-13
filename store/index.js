import { defineStore } from "pinia";

export const useUserStore = defineStore("users", {
  state: () => {
    return {
      users: [],
    };
  },
  actions: {
    async setUsers() {
      try {
        await fetch("http://localhost:3000/users")
          .then((res) => res.json())
          .then((data) => (this.users = data));
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  getters: {
    getUsers() {
      return this.users;
    },
  },
});

export const useFilterStore = defineStore("filters", {
  state: () => ({
    filters: {},
    value: {},
  }),
  actions: {
    async setFilters() {
      try {
        fetch("http://localhost:3000/filters")
          .then((res) => res.json())
          .then((data) => {
            this.filters = data
          });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    setFilterValue(value) {
      this.value = value;
    },
  },
  getters: {
    getFilters() {
      return this.filters;
    },
    getFilterValue() {
      return this.value;
    },
  },
});
