<template>
  <v-container>
    <v-row v-if="player && player.queue[0]" justify="center">
      <v-img :src="player.queue[0].thumbnail.max" max-width="250"></v-img>
    </v-row>
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
          v-if="!player || !player.queue[0]"
          color="amber"
          height="25"
        ></v-progress-linear>
        <v-progress-linear
          v-else
          v-model="playerBar"
          color="amber"
          height="25"
          :disabled="player ? false : true"
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
        <v-btn v-if="!player" color="success" @click="connect"
          >Connect the bot</v-btn
        >
        <v-btn
          v-if="player"
          color="success"
          :disabled="!player.queue[0]"
          fab
          small
          @click="dialogEQ = true"
        >
          EQ
        </v-btn>
        <v-btn
          v-if="player"
          color="success"
          :disabled="!player.queue[0]"
          @click="replay"
          >Replay</v-btn
        >
        <v-btn
          v-if="player"
          color="success"
          :disabled="!player.queue[0]"
          @click="pause"
          >{{ player.playPaused ? 'Resume' : 'Pause' }}</v-btn
        >
        <v-btn
          v-if="player"
          :color="player.repeatTrack ? 'success' : 'error'"
          :disabled="!player.queue[0]"
          @click="loop"
          >Loop</v-btn
        >
        <v-btn
          v-if="player"
          color="success"
          :disabled="!player.queue[0]"
          @click="skip"
          >Skip</v-btn
        >
        <v-btn
          v-if="player"
          color="success"
          :disabled="!player.queue[0]"
          @click="stop"
          >Stop</v-btn
        >
        <v-menu v-if="player" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              fab
              :disabled="!player.queue[0]"
              v-bind="attrs"
              v-on="on"
            >
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
          item-key="trackString"
          @click:row="selectMusicBtn"
        >
        </v-data-table>
      </v-col>
    </v-row>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar" :color="snackbarColor" right top>
        {{ snackbarText }}
      </v-snackbar>
    </div>
    <v-dialog v-if="selectMusic" v-model="dialogMusic" width="500">
      <v-card>
        <v-img :src="selectMusic.info.thumbnail.max" />
        <v-card-title>
          {{ selectMusic.info.title }}
        </v-card-title>

        <v-card-text>
          Author: {{ selectMusic.info.author }} <br />
          URI: {{ selectMusic.info.uri }}</v-card-text
        >

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="queueToPlayer">
            Play
          </v-btn>
          <v-btn color="primary" text @click="removeMusicQueue">
            Remove
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogMusic = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEQ" width="500">
      <v-card>
        <v-card-title>
          Equalizer
        </v-card-title>

        <v-card-text>
          <v-slider
            v-model="valueBand"
            max="14"
            label="Band"
            thumb-label="always"
          />
          <v-slider
            v-model="valueGain"
            :step="0.05"
            max="1"
            min="-0.25"
            label="Gain"
            thumb-label="always"
          />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="setEQDefault">
            Default
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogEQ = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogAddMusic" width="500">
      <v-card>
        <v-card-title>
          Add a music
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field v-model="lavaSearchInput"></v-text-field>
            </v-col>
          </v-row>
          <v-list v-if="listTracks">
            <v-list-item-group v-model="selectItemVideo" color="primary">
              <v-list-item v-for="(item, i) in listTracks.tracks" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="searchSongs">
            Search
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogAddMusic = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      color="primary"
      bottom
      fab
      fixed
      right
      :disabled="!player"
      @click="dialogAddMusic = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <dialogLogin />
  </v-container>
</template>

<script>
import moment from 'moment'
import dialogLogin from '@/components/dialogLogin'
moment.locale('fr')

export default {
  components: {
    dialogLogin,
  },
  fetch() {
    this.$axios
      .$get(
        this.$axios.defaults.baseURL + `/api/guild/${this.$route.params.id}`
      )
      .catch(() => {
        this._routerRoot.context.redirect(
          `https://discordapp.com/oauth2/authorize?client_id=722181826545713313&scope=bot&permissions=1609887095&guild_id=${this.$route.params.id}`
        )
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
      dialogAddMusic: false,
      lavaSearchInput: null,
      listTracks: {
        tracks: null,
      },
      selectItemVideo: null,
      valueGain: 0,
      valueBand: 0,
      dialogEQ: false,
    }
  },
  watch: {
    selectItemVideo(index) {
      if (index === null) return
      if (this.listTracks.tracks === null) return
      this.socket.emit('addToQueue', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
        uri: this.listTracks.tracks[index].uri,
      })
      this.lavaSearchInput = null
      this.dialogAddMusic = false
      this.listTracks = {
        tracks: null,
      }
      this.selectItemVideo = null
    },
    volume(value) {
      this.socket.emit('setVolume', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
        volumeNumber: value,
      })
    },
    valueBand(value) {
      this.socket.emit('setEqualizer', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
        gain: this.valueGain,
        band: value,
      })
    },
    valueGain(value) {
      this.socket.emit('setEqualizer', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
        gain: value,
        band: this.valueBand,
      })
    },
  },
  mounted() {
    const context = this
    setInterval(function () {
      context.socket.emit('getPlayer', {
        guildID: context.$route.params.id,
      })
    }, 1550)
    this.socket = this.$nuxtSocket({
      name: 'player',
      channel: '/',
      reconnection: true,
    })
    this.socket.on('sendPlayer', (data) => {
      this.player = data
      if (data.queue[0]) {
        this.playerBar = (data.position / data.queue[0].length) * 100
      }
      this.volume = data.volume
    })
    this.socket.on('errorMessage', (data) => {
      this.snackbarText = data
      this.snackbarColor = 'error'
      this.snackbar = true
    })
    this.socket.on('successMessage', (data) => {
      this.snackbarText = data
      this.snackbarColor = 'success'
      this.snackbar = true
    })
    this.socket.on('searchSongs', (data) => {
      if (data[0]) {
        this.listTracks = {
          tracks: data,
        }
      } else if (data.tracks) {
        this.listTracks = {
          tracks: null,
        }
        this.snackbarText =
          'Player online does not take playlists into account! Please use the bot in a textuelChannel.'
        this.snackbarColor = 'error'
        this.snackbar = true
      }
    })
  },
  methods: {
    searchSongs() {
      this.socket.emit('lavaSearch', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
        query: this.lavaSearchInput,
      })
    },
    pause() {
      this.socket.emit('pause', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
      })
    },
    loop() {
      this.socket.emit('loop', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
      })
    },
    skip() {
      this.socket.emit('skip', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
      })
    },
    stop() {
      this.socket.emit('stop', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
      })
      this.player = null
      this.playerBar = 0
    },
    seekPlayer(number) {
      this.socket.emit('seek', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
        seekNumber: (number / 100) * this.player.queue[0].length,
      })
    },
    replay() {
      this.socket.emit('seek', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
        seekNumber: 0,
      })
    },
    connect() {
      this.socket.emit('connectPlayer', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
      })
    },
    selectMusicBtn(item) {
      this.selectMusic = {
        info: item,
        index: this.player.queue.indexOf(item),
      }
      this.dialogMusic = true
    },
    queueToPlayer() {
      if (!this.selectMusic.index) return
      this.socket.emit('queueToPlayer', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
        musicNumber: this.selectMusic.index,
      })
      this.dialogMusic = false
    },
    removeMusicQueue() {
      if (!this.selectMusic.index) return
      this.socket.emit('removeMusicQueue', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
        musicNumber: this.selectMusic.index,
      })
      this.dialogMusic = false
    },
    setEQDefault() {
      this.socket.emit('setEqualizerDefault', {
        guildID: this.$route.params.id,
        user: this.$store.state.user,
      })
      this.valueGain = 0
      this.valueBand = 0
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
