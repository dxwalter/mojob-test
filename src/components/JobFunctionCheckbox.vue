<template>
  <div class="item">
    <div>
      <input
        type="checkbox"
        :id="`group_${positionDetails.id}`"
        class="position-checkbox"
        :value="positionDetails.id"
        v-model="checkStatus"
      />
    </div>
    <label :for="`group_${positionDetails.id}`" class="position-name">{{
      positionDetails.name
    }}</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { PositionFunction } from "@/models/models";

@Component
export default class JobFunctionCheck extends Vue {
  @Prop({ default: () => [], type: Object as () => PositionFunction })
  private positionDetails!: PositionFunction;

  checkStatus: boolean = false;

  @Watch("checkStatus", { immediate: true, deep: true }) emitData(
    newValue: boolean
  ) {
    this.$emit("update-position-list", {
      id: this.positionDetails.id,
      status: this.checkStatus,
      children:
        this.positionDetails?.children != undefined &&
        this.positionDetails?.children.length > 0
          ? true
          : false,
    });
  }
}
</script>

<style scoped></style>
