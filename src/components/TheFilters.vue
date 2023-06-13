<script setup>
import { reactive, watchEffect } from "vue";
import { useFilterStore } from "../../store";

const filterStore = useFilterStore();
filterStore.setFilters();

const filterData = reactive({
  country: "",
  score: "",
});

watchEffect(() => {
  filterStore.setFilterValue(filterData);
});
</script>

<template>
  <div>
    <template v-for="filter in filterStore.getFilters">
      <v-select
        v-if="filter.id"
        :key="filter.id"
        :items="filter.items"
        :clearable="filter.clearable"
        :label="filter.label"
        v-model="filterData[filter.name]"
      ></v-select>
    </template>
  </div>
</template>

<style></style>
