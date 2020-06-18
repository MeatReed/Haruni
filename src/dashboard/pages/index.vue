<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-avatar size="250">
        <img
          src="https://cdn.discordapp.com/avatars/722181826545713313/593530d4de2fda3e41ac6937fd9c7733.png?size=1280"
          alt=""
        />
      </v-avatar>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <p class="font-weight-medium">
          Haruni is a Discord bot specializing in music! It has an online player
          to control the music from a website.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn
          href="https://discord.com/api/oauth2/authorize?client_id=722181826545713313&permissions=1609887095&scope=bot"
          >Add Haruni</v-btn
        >
        <v-btn v-if="!this.$store.state.user" href="/login">Login</v-btn>
        <v-btn v-else href="/player">Servers</v-btn>
        <v-btn href="/support">Support</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-carousel
        cycle
        height="900"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          href="/login"
        ></v-carousel-item>
      </v-carousel>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: 'https://i.imgur.com/Jq234oB.png',
        },
        {
          src: 'https://i.imgur.com/zEoWg0a.png',
        },
        {
          src: 'https://i.imgur.com/TMYPFfp.png',
        },
        {
          src: 'https://i.imgur.com/NAYETN2.png',
        },
      ],
    }
  },
}
</script>
