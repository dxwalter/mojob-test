<template>
  <div class="drop-down-container">
    <div class="drop-down">
      <div class="drop-down-action">
        <div class="title">Filter by position</div>
        <img src="../assets/caret-down.svg" />
      </div>
    </div>
    <div class="list-items-container">
      <div
        class="postion-items"
        v-for="position in listPositionFunctions"
        :key="position.id"
      >
        <job-function-check
          :position-details="position"
          @update-position-list="updatePositionList"
        />
        <!-- this is the start of children page -->
        <div
          class="children display-none"
          :id="`childrenList${position.id}`"
          v-if="position.children.length > 0"
        >
          <div v-for="child in position.children" :key="child.id">
            <job-function-check
              :position-details="child"
              @update-position-list="updatePositionList"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import JobFunctionCheck from "@/components/JobFunctionCheckbox.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { PositionFunction } from "@/models/models";

@Component({
  components: {
    JobFunctionCheck,
  },
})
export default class PositionFunctionFilter extends Vue {
  @Prop({ default: () => [], type: Array as () => PositionFunction[] })
  private positionFunctions!: PositionFunction[];

  selectedPositionIds: number[] = [];

  get listPositionFunctions() {
    return this.positionFunctions;
  }

  updatePositionList(data: { id: number; status: boolean; children: boolean }) {
    if (data.status === false && this.selectedPositionIds.length > 0) {
      // remove id from list
      this.selectedPositionIds = this.selectedPositionIds.filter(
        (id) => id !== data.id
      );
    }

    if (data.status) {
      this.selectedPositionIds.push(data.id);
    }

    // display children list
    if (data.children === true) {
      const childrenList: HTMLInputElement = document.getElementById(
        `childrenList${data.id}`
      ) as HTMLInputElement;
      childrenList?.classList.toggle("display-none");
    }

    this.$emit("update-position-id", this.selectedPositionIds.toString());
  }
}
</script>

<style scoped></style>
