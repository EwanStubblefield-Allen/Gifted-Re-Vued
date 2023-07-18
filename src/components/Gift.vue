<template>
  <div v-if="giftProp.opened" class="card p-2">
    <img class="card-img-top card-img" :src="giftProp.url" alt="Card image cap">
    <div class="card-body">
      <p class="card-text">
        {{ giftProp.tag }}
      </p>
      <div class="text-end">
        <button v-if="giftProp.creatorId == accountId" @click="removeGift(giftProp.id)" class="mdi mdi-delete btn"></button>
      </div>
    </div>
  </div>

  <div v-else @click="openGift(giftProp.id)" class="card p-2 selectable">
    <div class="card-body closed-img d-flex justify-content-center align-items-center">
      <p class="card-text bg-secondary p-2 rounded">{{ giftProp.tag }}</p>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Gift } from '../models/Gift.js';
import { giftService } from '../services/GiftsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    giftProp: {
      type: Gift,
      required: true
  }
  },
  setup(){
    return {
      accountId: computed(() => AppState.account.id),

      async openGift(giftId) {
        try {
          await giftService.openGift(giftId)
        } catch(error) {
          Pop.error(error, '[OPEN GIFT]')
        }
      },
      async removeGift(giftId) {
        try {
          const isSure = await Pop.confirm('Are you sure you want to delete this gift?')
          if (!isSure) {
            return
          }
          await giftService.removeGift(giftId)
        } catch(error) {
          Pop.error(error, '[REMOVE GIFT]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  .card-img {
    height: 80%;
    object-fit: cover;
    object-position: center;
  }
  .card {
    width: 14rem; 
    min-height: 35vh;
  }

  .closed-img {
    background-image: url('../../assets/img/Rectangle.png');
  }
</style>