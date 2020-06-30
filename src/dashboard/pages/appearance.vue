<template>
  <v-container>
    <h1>Appearance</h1>
    <h2 class="ml-3">Wallpaper</h2>
    <v-row>
      <v-col v-for="(item, index) of wallpaper" :key="index">
        <v-card
          v-if="item"
          class="mx-auto"
          color="transparent"
          width="244"
          outlined
          @click="$colorMode.preference = `wallpaper${index + 1}`"
        >
          <v-img class="white--text align-end" :src="item" />
        </v-card>
      </v-col>
    </v-row>
    <h2 class="ml-3">Blur</h2>
    <v-row>
      <v-col v-for="(item, index) of blur" :key="index">
        <v-card
          v-if="item"
          class="mx-auto"
          color="transparent"
          width="244"
          outlined
          @click="$colorMode.preference = `blur${index + 1}`"
        >
          <v-img class="white--text align-end" :src="item" />
        </v-card>
      </v-col>
    </v-row>
    <h2 class="ml-3">Color</h2>
    <v-row>
      <v-col class="text-center">
        <v-card
          class="mx-auto"
          color="transparent"
          width="244"
          outlined
          @click="$colorMode.preference = `dark`"
        >
          <h1>DARK</h1>
        </v-card>
      </v-col>
      <v-col class="text-center">
        <v-card
          class="mx-auto"
          color="transparent"
          width="244"
          outlined
          @click="$colorMode.preference = `light`"
        >
          <h1>LIGHT</h1>
        </v-card>
      </v-col>
      <v-col class="text-center">
        <v-card
          class="mx-auto"
          color="transparent"
          width="244"
          outlined
          @click="$colorMode.preference = `blue`"
        >
          <h1>BLUE</h1>
        </v-card>
      </v-col>
      <v-col class="text-center">
        <v-card
          class="mx-auto"
          color="transparent"
          width="244"
          outlined
          @click="$colorMode.preference = `pink`"
        >
          <h1>PINK</h1>
        </v-card>
      </v-col>
      <v-col class="text-center">
        <v-card
          class="mx-auto"
          color="transparent"
          width="244"
          outlined
          @click="$colorMode.preference = `green`"
        >
          <h1>GREEN</h1>
        </v-card>
      </v-col>
      <v-col class="text-center">
        <v-card
          class="mx-auto"
          color="transparent"
          width="244"
          outlined
          @click="$colorMode.preference = `purple`"
        >
          <h1>PURPLE</h1>
        </v-card>
      </v-col>
      <v-col class="text-center">
        <v-card
          class="mx-auto"
          color="transparent"
          width="244"
          outlined
          @click="$colorMode.preference = `yellow`"
        >
          <h1>YELLOW</h1>
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
      wallpaper: [
        require('~/assets/images/wallpaper/1.jpg'),
        require('~/assets/images/wallpaper/2.png'),
        require('~/assets/images/wallpaper/3.jpg'),
        require('~/assets/images/wallpaper/4.png'),
        require('~/assets/images/wallpaper/5.png'),
        require('~/assets/images/wallpaper/6.png'),
        require('~/assets/images/wallpaper/7.png'),
        require('~/assets/images/wallpaper/8.jpg'),
        require('~/assets/images/wallpaper/9.jpg'),
        require('~/assets/images/wallpaper/10.jpg'),
        require('~/assets/images/wallpaper/11.jpg'),
        require('~/assets/images/wallpaper/12.jpg'),
        require('~/assets/images/wallpaper/13.jpg'),
      ],
      blur: [
        require('~/assets/images/blur/1.jpg'),
        require('~/assets/images/blur/2.jpg'),
        require('~/assets/images/blur/3.jpg'),
        require('~/assets/images/blur/4.jpg'),
      ],
    }
  },
}
</script>
