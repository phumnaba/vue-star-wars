import axios from "axios";
import { entities } from "@/utilities";

export default class StarWarsService {
  /**
   * StarWarsService
   * @returns {Promise}
   */
  static discoverStarWarEntities(query: string) {
    const discoverEntitiesPromiseArr: Promise<any>[] = [];
    const baseUrl = process.env.VUE_APP_BASE_URL;
    entities.forEach((entity: string) => {
      discoverEntitiesPromiseArr.push(
        axios.get(`${baseUrl}${entity}/?search=${query}`)
      );
    });

    return Promise.allSettled(discoverEntitiesPromiseArr);
  }
}
