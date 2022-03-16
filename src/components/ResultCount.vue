<template>
  <div class="drop-down">
    <div class="drop-down-action">
      <div class="title">{{ displayText }}</div>
      <img src="../assets/caret-down.svg" />
    </div>
    <div class="page-dropdown">
      <div class="page-option" @click="setPageCount(5)">5 per page</div>
      <div class="page-option" @click="setPageCount(25)">25 per page</div>
      <div class="page-option" @click="setPageCount('all')">
        Display all
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ResultCount extends Vue {
  pageCount: string | number = 5;
  displayText: string = "";
  setPageCount(value: string | number) {
    if (value === "all") {
      this.displayText = "Display All";
    } else {
      this.displayText = `${value} per page`;
    }

    this.pageCount = value;
    this.$emit("update-page-count", this.pageCount);
  }

  private async mounted() {
    this.displayText = `${this.pageCount} per page`;
  }
}
</script>

<style scoped></style>
