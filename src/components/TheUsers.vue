<script setup>
import { computed } from "vue";
import { useUserStore, useFilterStore } from "../../store";

const userStore = useUserStore();
userStore.setUsers();

const filterStore = useFilterStore();
const filters = filterStore.getFilterValue;

const userList = computed(() => {
  if (isChoosenFilters()) return userStore.getUsers;
  return userStore.getUsers.filter((user) => isUserFilter(user));
});

const isUserFilter = (user) => {
  let values = [];
  for (let filter in filters) {
    if (!filters[filter] || !user[filter]) continue;
    if (filter == "country")
      values.push(isUserCountryFilter(user.country, filters[filter]));
    if (filter == "score")
      values.push(isUserScoreFilter(user.score, filters[filter]));
  }
  return values.every((v) => !!v);
};

const isUserCountryFilter = (userCountry, filterCountry) =>
  userCountry == filterCountry;

const isUserScoreFilter = (userScore, filterScore) => {
  const operator = filterScore[0]; // assume that data will always come in valid format
  const value = parseInt(filterScore.replace(/[^\d]/g, ""));
  if (operator == ">") return userScore > value;
  else return userScore < value;
};

const isChoosenFilters = () => {
  return Object.values(filters).every((f) => f == false);
};
</script>

<template>
  <div class="mx-auto text-center">
    <div v-if="userList.length == 0 && isChoosenFilters()">
      <v-progress-circular indeterminate size="20"> </v-progress-circular>
    </div>

    <div
      class="mx-auto text-center"
      v-else-if="userList.length == 0 && false == isChoosenFilters()"
    >
      <span> No users found by selected filters </span>
    </div>

    <v-card v-else max-width="450" class="mx-auto">
      <v-list three-line>
        <transition-group name="list">
          <template v-for="item in userList">
            <v-list-item v-if="item.id" :key="item.id">
              <template v-slot:prepend>
                <v-avatar @click="item.isShowAddress = !item.isShowAddress">
                  <v-img :src="item.avatar"></v-img>
                </v-avatar>
              </template>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-if="item.isShowAddress"
                  v-html="`Address: ${item.address}`"
                >
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-divider></v-divider>
            </v-list-item>
          </template>
        </transition-group>
      </v-list>
    </v-card>
  </div>
</template>

<style lang="css">
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
