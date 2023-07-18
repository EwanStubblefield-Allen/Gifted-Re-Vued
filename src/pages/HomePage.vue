<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-3">
        <form @submit.prevent="createGift()" class="d-flex flex-column">
          <label for="tagId">Tag</label>
          <input v-model="data.tag" type="text" name="tag"  ref="tag" required>
          <label for="urlId">URL</label>
          <input v-model="data.url" type="text" name="url" id="urlId" required>
          <div>
            <button type="submit" class="btn btn-success mt-2">Submit</button>
          </div>
        </form>
        <form @submit.prevent="getGif()" class="mt-3 border-top border-dark d-flex flex-column">
          <label for="search">Search</label>
          <input v-model="gif" type="text" name="url" required>
          <div>
            <button type="submit" class="btn btn-success mt-2">Search</button>
          </div>
        </form>
        <div class="result-scroll">
          <div v-for="r in results" :key="r.title">
            <img @click="insertGif(r.url)" class="w-100 img-fluid my-2 selectable" :src="r.images.downsized.url" :alt="r.id">
          </div>
        </div>
      </div>
      <div class="col-9 gifts-adjust">
        <div class="row justify-content-around">
          <div v-for="gift in gifts" :key="gift.id" class="col-12 col-md-5 col-lg-3 mx-2 p-2">
            <Gift :giftProp="gift" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { computed, onMounted, ref } from 'vue';
  import { logger } from '../utils/Logger.js';
  import { giftService } from '../services/GiftsService.js';
  import { AppState } from '../AppState.js'
  import { gifService } from '../services/GifsService.js';
  import Gift from '../components/Gift.vue';
  import Pop from '../utils/Pop.js';

  export default {
    setup() {
      async function getGifts() {
        try{
          await giftService.getGifts()
        } catch(error) {
          Pop.error(error, '[GETTING GIFTS]')
        }
      }
      onMounted(() => {
        logger.log("[HOME PAGE MOUNTED]");
        getGifts()
      })

      let data = ref({
        tag: '',
        url: ''
      })
      let gif = ref()
      return {
        data,
        gif,
        gifts: computed(() => AppState.gifts),
        results: computed(() => AppState.results),

        insertGif(url) {
          data.value.url = url
        },
        async createGift() {
          try {
            logger.log(data)
            await giftService.createGifts(data.value)
          } catch(error) {
            Pop.error(error, '[Create GIFT]')
          }
        },
        async getGif() {
          try{
            await gifService.getGif(gif.value)
          } catch(error) {
            Pop.error(error, '[GET GIF]')
          }
        }
      };
    },
    components: { Gift }
  }
</script>

<style scoped lang="scss">
  .gifts-adjust {
    height: 86vh;
    overflow-y: auto;
  }

  .result-scroll {
    height: 40vh;
    overflow-y: auto;
  }
</style>
