<template>
  <v-container>
    <h1>Appearance</h1>
    <v-row>
      <v-col v-for="(item, index) of items" :key="index" class="text-center">
        <v-card
          class="mx-auto"
          color="transparent"
          width="244"
          outlined
          @click="$colorMode.preference = `image${index + 1}`"
        >
          <v-img class="white--text align-end" :src="item" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      botinfo: null,
      items: [
        require('~/assets/images/wallpaper/1.jpg'),
        require('~/assets/images/wallpaper/2.png'),
        require('~/assets/images/wallpaper/3.jpg'),
        require('~/assets/images/wallpaper/4.png'),
        require('~/assets/images/wallpaper/5.png'),
        require('~/assets/images/wallpaper/6.png'),
        require('~/assets/images/wallpaper/7.png'),
        require('~/assets/images/wallpaper/8.jpg'),
      ],
    }
  },
}
</script>
