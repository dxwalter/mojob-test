import { AxiosStatic } from "axios";
import { IPage, PositionFunction, JobListing } from "@/models/models";

export default class BaseApi {
  public axios!: AxiosStatic;
  protected baseUrl: string;

  constructor(url: string, axios: AxiosStatic) {
    this.baseUrl = url;
    this.axios = axios;
  }

  public getJobListings = (requestBody: {
    page_size: number | string;
    position_functions: string;
  }): Promise<IPage<PositionFunction>> =>
    this.axios
      .get(
        `${this.baseUrl}job/listings/?include_open=False&page=1&page_size=${requestBody.page_size}&use_mojob_feed_filter=True&use_pagination=True&position_functions=${requestBody.position_functions}`
      )
      .then((response) => response.data);

  public getJobsListingFunction = (): Promise<IPage<PositionFunction>> =>
    this.axios
      .get(`${this.baseUrl}job/position-functions/?page_size=100`)
      .then((response) => response.data);

  /**
   * TIP: Create a function called getJobListings
   * Use our public api documentation to find out what endpoint to use
   * https://test-api.mojob.io/public/docs/
   */
}
