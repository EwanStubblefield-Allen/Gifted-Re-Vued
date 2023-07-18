import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { gifApi } from "./AxiosService.js"

class GifService {
  async getGif(data) {
    logger.log(data)
    const res = await gifApi(`/search?q=${data}`)
    AppState.results = res.data.data
    logger.log(AppState.results)
  }
}

export const gifService = new GifService()