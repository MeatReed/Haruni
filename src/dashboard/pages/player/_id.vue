<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>
          {{
            player && player.queue[0]
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
        <v-chip v-if="player && player.queue[0]" class="ma-1">
          Author: {{ player.queue[0].author }}
        </v-chip>
        <v-chip v-if="player" class="ma-1">
          Voice Channel: {{ player.options.voiceChannel.name }}
        </v-chip>
        <v-chip v-if="player" class="ma-1">
          Text Channel: #{{ player.options.textChannel.name }}
        </v-chip>
        <v-chip v-if="player && player.queue[0]" class="ma-1">
          Requested by: {{ player.queue[0].user.tag }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <p v-if="player && player.queue[0]">
          {{ duration(player.position).minutes() }}:{{
            duration(player.position).seconds()
          }}/{{ duration(player.queue[0].length).minutes() }}:{{
            duration(player.queue[0].length).seconds()
          }}
        </p>
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
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small fab v-bind="attrs" v-on="on">
              <v-icon dark>mdi-volume-high</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-slider v-model="volume" vertical />
          </v-card>
        </v-menu>
      </v-col>
    </v-row>
    <v-row v-if="player">
      <v-col>
        <h3>Queue</h3>
        <v-data-table
          :headers="headersQueue"
          :items="player.queue.slice(1)"
          disable-filtering
          disable-sort
          @click:row="selectMusicBtn"
        >
        </v-data-table>
      </v-col>
    </v-row>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :color="snackbarColor" right>
        {{ snackbarText }}
      </v-snackbar>
    </div>
    <v-dialog v-if="selectMusic" v-model="dialogMusic" width="500">
      <v-card>
        <v-img :src="selectMusic.thumbnail.max" />
        <v-card-title>
          {{ selectMusic.title }}
        </v-card-title>

        <v-card-text> Author: {{ selectMusic.author }} </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="dialogMusic = false">
            Play
          </v-btn>
          <v-btn color="primary" text @click="dialogMusic = false">
            Remove
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogMusic = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
const moment = require('moment')
moment.locale('fr')

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
      headersQueue: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'Author', value: 'author' },
        { text: 'URI', value: 'uri' },
      ],
      queueTable: null,
      dialogMusic: false,
      selectMusic: null,
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
            this.snackbarText = `Volume ${value}%`
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
            this.playerBar = 0
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
    selectMusicBtn(row, i) {
      this.selectMusic = row
      this.dialogMusic = true
    },
    duration(ms) {
      return moment.duration({
        ms,
      })
    },
  },
}
</script>

<style></style>
