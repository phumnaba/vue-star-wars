import { entities } from "@/utilities";
import axios from "axios";

export default class StarWarsService {
  /**
   * StarWarsService
   * @returns {Promise}
   */
  static discoverStarWarEntities(query: string) {
    const discoverEntitiesEndpoints: any[] = [];
    const baseUrl = process.env.VUE_APP_BASE_URL;
    entities.forEach((entity: string) => {
      discoverEntitiesEndpoints.push(
        axios.get(`${baseUrl}${entity}/?search=${query}`)
      );
    });

    return Promise.allSettled(discoverEntitiesEndpoints);
  }
}
