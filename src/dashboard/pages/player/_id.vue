<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>
          {{
            player
              ? player.queue[0].title
                ? player.queue[0].title
                : 'Wait for..'
              : "The bot doesn't currently play music."
          }}
        </h2>
        <v-progress-linear
          color="amber"
          :value="
            player
              ? (player.position / player.queue[0].length) * 100
                ? (player.position / player.queue[0].length) * 100
                : 0
              : 0
          "
          height="25"
        ></v-progress-linear>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn v-if="player" color="sucess" @click="pause">{{
          player.playPaused ? 'Resume' : 'Pause'
        }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  fetch() {
    this.$store
      .dispatch('getPlayer', {
        guildID: this.$route.params.id,
      })
      .then((res) => {
        this.error = false
        this.errorMessage = null
        this.player = res
      })
      .catch((error) => {
        this.error = true
        this.errorMessage = error.response.data.error
        this.player = null
      })
  },
  data() {
    return {
      player: null,
      error: false,
      errorMessage: null,
    }
  },
  mounted() {
    const context = this
    setInterval(function () {
      context.$fetch()
    }, 1500)
  },
  methods: {
    pause() {
      this.$store.dispatch('pause', {
        guildID: this.$route.params.id,
      })
    },
  },
}
</script>

<style></style>
