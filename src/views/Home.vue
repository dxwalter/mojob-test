<template>
  <div class="home">
    <div class="page-loader" v-if="loadingPage">Loading Jobs...</div>
    <job-feed
      :job-listings="listAllJobs"
      :position-functions="positionFunctionFilters"
      @update-position-id="setJobFunctionId"
      @update-page-count="setPageCount"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import JobFeed from "@/components/JobFeed.vue";
import BaseApi from "@/api-requests/api";
import { IPage, PositionFunction, JobListing } from "@/models/models";

@Component({
  components: {
    JobFeed,
  },
})
export default class Home extends Vue {
  private mojobApi: BaseApi = new BaseApi(
    "https://test-api.mojob.io/public/",
    this.axios
  );

  private positionFunctionFilters: PositionFunction[] = [];

  private jobListing: JobListing[] | undefined = [];

  private jobFunctionId: string = "";
  private pageCount: string | number = 5;
  private loadingPage: boolean = true;

  get listAllJobs() {
    return this.jobListing;
  }

  setJobFunctionId(data: string) {
    if (data.length) {
      this.jobFunctionId = data;
    }
  }

  setPageCount(data: string | number) {
    this.pageCount = data;
  }

  @Watch("pageCount", { immediate: true, deep: true })
  makeRequest(newValue: string | number, oldValue: string | number) {
    if (newValue !== oldValue) {
      this.getJobOpenings();
    }
  }

  @Watch("jobFunctionId", { immediate: true, deep: true })
  dispatchRequest(newValue: string) {
    if (newValue.length) {
      this.getJobOpenings();
    }
  }

  private async getJobOpenings(): Promise<void> {
    this.loadingPage = true;
    try {
      const requestBody = {
        page_size: this.pageCount === "all" ? "" : this.pageCount,
        position_functions: !this.jobFunctionId.length
          ? ""
          : this.jobFunctionId,
      };
      const getOpenings: IPage<JobListing> = await this.mojobApi.getJobListings(
        requestBody
      );
      this.jobListing = getOpenings.results;
    } catch (error) {
      console.log("Failed loading job openings filters");
    }
    this.loadingPage = false;
  }

  private async getJobPositions(): Promise<void> {
    try {
      const jobLocationFiltersResponsePage: IPage<PositionFunction> = await this.mojobApi.getJobsListingFunction();
      if (jobLocationFiltersResponsePage.results) {
        this.positionFunctionFilters = jobLocationFiltersResponsePage.results;
      } else {
        console.log("Failed loading position function filters");
      }
    } catch (e) {
      console.log("Failed loading position function filters");
    }
  }

  /**
   * Here you can do necessary request to our
   * public test-API in order to retrieve a list of job listings and a list of
   * position function filters.
   *
   * You can test the endpoints and see the documentation at:
   * https://test-api.mojob.io/public/docs/
   *
   * @private
   */
  private async mounted() {
    // Here is an example on how to retrieve job position function filters
    await this.getJobPositions();
    await this.getJobOpenings();
  }
}
</script>
