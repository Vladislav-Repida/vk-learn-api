<template>
  <base-table v-if="friends" class="friends-table">
    <base-table-column :rows-data="friends" width="20%">
      <template #header> Имя пользователя </template>
      <template #row="{ data }">
        <base-user-info
          :photo="data.photoRegular"
          :name="`${data.firstName} ${data.lastName}`"
        />
      </template>
    </base-table-column>

    <base-table-column :rows-data="friends" width="15%">
      <template #header> Страна </template>
      <template #row="{ data }">
        <span v-if="data.countryName">{{ data.countryName }}</span>
        <span v-else>-</span>
      </template>
    </base-table-column>

    <base-table-column :rows-data="friends" width="50%">
      <template #header> Дата рождения </template>
      <template #row="{ data }">
        <span v-if="data.bdate">{{ ParseDateStr(data.bdate) ?? "-" }}</span>
        <span v-else>-</span>
      </template>
    </base-table-column>

    <base-table-column :rows-data="friends" width="40%">
      <template #header> Статус </template>
      <template #row="{ data }">
        <span v-if="data.status">{{ data.status }}</span>
        <span v-else>-</span>
      </template>
    </base-table-column>
  </base-table>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/app/stores/appStore";
import { storeToRefs } from "pinia";

import { BaseTable, BaseTableColumn } from "@/shared/ui/base-table";
import { computed } from "vue";

import { BaseUserInfo } from "@/shared/ui/base-user-info";

const appStore = useAppStore();
const { friends } = storeToRefs(appStore);
const names = computed(() =>
  friends.value.map(({ firstName, lastName }) => `${firstName} ${lastName}`)
);

const isValidDate = (d: Date) => {
  // @ts-ignore
  return d instanceof Date && !isNaN(d);
};

const NumberToLength = (num: number, length: number) => {
  let numStr = num.toString();
  if (numStr.length !== length) {
    for (let index = numStr.length; index < length; index++) {
      numStr = `0${numStr}`;
    }
  }
  return numStr;
};

const FormattingDate = (date: Date) => {
  return `${NumberToLength(date.getDate(), 2)}.${NumberToLength(
    date.getMonth() + 1,
    2
  )}.${date.getFullYear()}`;
};

const ParseDateStr = (str: string) => {
  const date = new Date(str);
  if (isValidDate(date)) return FormattingDate(date);
};
</script>

<style lang="less" scoped>
.friends-table {
  width: 100%;
}
</style>
