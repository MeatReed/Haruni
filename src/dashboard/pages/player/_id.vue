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
          v-model="playerBar"
          color="amber"
          height="25"
          :disabled="player"
          @change="seekPlayer"
        ></v-progress-linear>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <v-btn v-if="player" color="success" @click="replay">Replay</v-btn>
        <v-btn v-if="player" color="success" @click="pause">{{
          player.playPaused ? 'Resume' : 'Pause'
        }}</v-btn>
        <v-btn
          v-if="player"
          :color="player.repeatTrack ? 'success' : 'error'"
          @click="loop"
          >Loop</v-btn
        >
        <v-btn v-if="player" color="success" @click="skip">Skip</v-btn>
        <v-btn v-if="player" color="success" @click="stop">Stop</v-btn>
        <v-btn small fab @click.stop="showVolumeSlide = !showVolumeSlide">
          <v-icon dark>mdi-volume-high</v-icon>
        </v-btn>
        <v-slider v-if="showVolumeSlide" v-model="volume" vertical></v-slider>
      </v-col>
    </v-row>
    <v-row v-if="player">
      <v-col>
        <h3>Queue</h3>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Title</th>
                <th class="text-left">URI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in player.queue.slice(1)" :key="item.title">
                <td>{{ item.title }}</td>
                <td>{{ item.uri }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :color="snackbarColor" right>
        {{ snackbarText }}
      </v-snackbar>
    </div>
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
        this.playerBar = (res.position / res.queue[0].length) * 100
        this.volume = res.volume
      })
      .catch((error) => {
        this.snackbarText = error.response.data.error
        this.snackbarColor = 'error'
        this.snackbar = true
        this.player = null
      })
  },
  data() {
    return {
      player: null,
      error: false,
      errorMessage: null,
      snackbar: false,
      snackbarColor: 'success',
      snackbarText: null,
      playerBar: null,
      volume: null,
      showVolumeSlide: false,
    }
  },
  watch: {
    volume(value) {
      if (!this.player) return
      this.$store
        .dispatch('setVolume', {
          guildID: this.$route.params.id,
          volume: value,
        })
        .then((res) => {
          if (res) {
            this.snackbarText = 'Seek'
            this.snackbarColor = 'success'
            this.snackbar = true
          }
        })
    },
  },
  mounted() {
    const context = this
    setInterval(function () {
      context.$fetch()
    }, 1500)
  },
  methods: {
    pause() {
      this.$store
        .dispatch('pause', {
          guildID: this.$route.params.id,
        })
        .then((res) => {
          if (res) {
            this.snackbarText = 'The music has been paused.'
            this.snackbarColor = 'success'
            this.snackbar = true
          } else {
            this.snackbarText = 'The music has been resumed.'
            this.snackbarColor = 'success'
            this.snackbar = true
          }
        })
    },
    loop() {
      this.$store
        .dispatch('loop', {
          guildID: this.$route.params.id,
        })
        .then((res) => {
          if (res) {
            this.snackbarText = `Loop activated, \`${this.player.queue[0].title}\` music will repeat.`
            this.snackbarColor = 'success'
            this.snackbar = true
          } else {
            this.snackbarText = 'Loop off.'
            this.snackbarColor = 'success'
            this.snackbar = true
          }
        })
    },
    skip() {
      this.$store
        .dispatch('skip', {
          guildID: this.$route.params.id,
        })
        .then((res) => {
          if (res) {
            this.snackbarText = 'The music has been skipped!'
            this.snackbarColor = 'success'
            this.snackbar = true
          }
        })
    },
    stop() {
      this.$store
        .dispatch('stop', {
          guildID: this.$route.params.id,
        })
        .then((res) => {
          if (res) {
            this.snackbarText = "The bot isn't playing music anymore."
            this.snackbarColor = 'success'
            this.snackbar = true
          }
        })
    },
    seekPlayer(number) {
      this.$store
        .dispatch('seek', {
          guildID: this.$route.params.id,
          seek: (number / 100) * this.player.queue[0].length,
        })
        .then((res) => {
          if (res) {
            this.snackbarText = 'Seek'
            this.snackbarColor = 'success'
            this.snackbar = true
          }
        })
    },
    replay(number) {
      this.$store
        .dispatch('seek', {
          guildID: this.$route.params.id,
          seek: 0,
        })
        .then((res) => {
          if (res) {
            this.snackbarText = 'Play the music again success.'
            this.snackbarColor = 'success'
            this.snackbar = true
          }
        })
    },
  },
}
</script>

<style></style>
