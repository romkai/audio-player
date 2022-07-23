import axios, { AxiosResponse } from "axios";
import { Track } from "./types/ApiTypes";
import offlineTracks from "@/api/json/offlineTracks";

const AXIOS_TIMEOUT = 10000;
const RAPID_API_URL = "https://deezerdevs-deezer.p.rapidapi.com/search";
const RAPID_API_HEADERS: Record<string, string> = {
  "X-RapidAPI-Key": "e629f89825msh132a6e7ebb3ca02p10b8e8jsn0c9d9701771c",
  "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
};

export default class Api {
  private static instance: Api | null = null;

  private constructor() {
    axios.defaults.timeout = AXIOS_TIMEOUT;
    Object.keys(RAPID_API_HEADERS).forEach((key) => {
      axios.defaults.headers.common[key] = RAPID_API_HEADERS[key];
    });
  }

  public static getInstance() {
    if (Api.instance === null) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  public searchTracksByName(q: string, tries = 5): Promise<Track[]> {
    return axios
      .get<Track[]>(RAPID_API_URL, { params: { q } })
      .then((response: AxiosResponse) => {
        const errMessage = response.data.error?.message;
        if (!errMessage) return response.data.data;
        if (tries === 0) return offlineTracks;
        return this.searchTracksByName(q, tries - 1);
      });
  }
}
