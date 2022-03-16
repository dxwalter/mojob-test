<template>
  <div class="job-feed-container">
    <div class="filter-container">
      <div>
        <position-function-filter
          :position-functions="positionFunctions"
          @update-position-id="setFunctionIds"
        />
      </div>
      <div><result-count @update-page-count="emitPageCount" /></div>
    </div>
    <div class="job-listing-container">
      <div class="job-card" v-for="opening in jobListings" :key="opening.id">
        <div class="position-title">{{ opening.job.title }}</div>
        <div class="job-info">
          <div class="job-details">{{ opening.job.poster.full_name }}</div>
          <div class="dot"></div>
          <div class="job-details">
            {{ opening.job.position_function.name_en }}
          </div>
          <div class="dot"></div>
          <div class="job-details">
            {{ convertDuedate(opening.job.due_date) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PositionFunctionFilter from "@/components/PositionFunction.vue";
import ResultCount from "@/components/ResultCount.vue";
import { JobListing, PositionFunction } from "@/models/models";
import moment from "moment";

@Component({
  components: {
    PositionFunctionFilter,
    ResultCount,
  },
})
export default class JobFeed extends Vue {
  @Prop({ default: () => [], type: Array as () => JobListing[] })
  private jobListings!: JobListing[];
  @Prop({ default: () => [], type: Array as () => PositionFunction[] })
  private positionFunctions!: PositionFunction[];

  private convertDuedate = (date: string): String => {
    return moment(date)
      .utc()
      .format("DD MMMM, YYYY, h:mm A ");
  };

  setFunctionIds(data: string) {
    this.$emit("update-position-id", data);
  }

  emitPageCount(data: string | number) {
    this.$emit("update-page-count", data);
  }
}
</script>

<style scoped></style>
