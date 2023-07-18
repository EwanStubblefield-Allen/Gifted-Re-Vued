import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class GiftService {
  async getGifts() {
    const res = await api.get('api/gifts')
    const giftData = res.data.map(r => new Gift(r))
    AppState.gifts = giftData
    logger.log(giftData)
  }

  async createGifts(data) {
    const res = await api.post('api/gifts', data)
    let newData = new Gift(res.data)
    logger.log(newData)
    AppState.gifts.unshift(newData)
    logger.log(AppState.gifts)
  }

  async openGift(giftId) {
    const res = await api.put(`api/gifts/${giftId}`, { opened: true })
    let foundIndex = AppState.gifts.findIndex(g => g.id == giftId)
    let newData = new Gift(res.data)
    AppState.gifts.splice(foundIndex, 1, newData)
  }

  async removeGift(giftId) {
    await api.delete(`api/gifts/${giftId}`)
    let foundIndex = AppState.gifts.findIndex(g => g.id == giftId)
    AppState.gifts.splice(foundIndex, 1)
    logger.log(AppState.gifts)
  }
}

export const giftService = new GiftService()