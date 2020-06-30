<template>
  <v-container>
    <v-row>
      <v-col xl="4" lg="4" md="12" sm="12" xs="12">
        <v-card height="150" color="transparent">
          <div class="d-flex justify-space-between">
            <div>
              <v-card-title class="headline">Support Server</v-card-title>

              <v-card-subtitle
                >Do you have a problem?<br />Join the support
                server!</v-card-subtitle
              >
              <v-card-actions>
                <v-btn text>Join now</v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" size="125" tile>
              <v-img :src="require('~/assets/discord-logo.svg')" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      <v-col xl="4" lg="4" md="12" sm="12" xs="12">
        <v-card height="150" color="transparent">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline">Servers</v-card-title>

              <h1 v-if="!$fetchState.pending" class="ml-4">
                {{ botinfo.guildCount }}
              </h1>
            </div>
            <v-avatar class="ma-3" size="125" tile>
              <v-icon size="125">mdi-server</v-icon>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
      <v-col xl="4" lg="4" md="12" sm="12" xs="12">
        <v-card height="150" color="transparent">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline">Invite the bot</v-card-title>

              <v-card-subtitle
                >You haven't invited the bot?<br />test test</v-card-subtitle
              >
              <v-card-actions>
                <v-btn text>Invite now</v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="125">
              <v-img v-if="!$fetchState.pending" :src="botinfo.avatar" />
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-avatar size="250">
          <v-img v-if="!$fetchState.pending" :src="botinfo.avatar" alt="" />
        </v-avatar>
        <p class="font-weight-medium">
          Haruni is a Discord bot specializing in music! It has an online player
          to control the music from a website.
        </p>
        <v-row>
          <v-col class="text-center">
            <v-btn
              color="transparent"
              href="https://discord.com/api/oauth2/authorize?client_id=722181826545713313&permissions=1609887095&scope=bot"
              >Add Haruni</v-btn
            >
            <v-btn
              v-if="!this.$store.state.user"
              href="/login"
              color="transparent"
              >Login</v-btn
            >
            <v-btn v-else href="/player" color="transparent">Servers</v-btn>
            <v-btn href="/support" color="transparent">Support</v-btn>
          </v-col>
        </v-row>
        <v-img :src="require('~/assets/images/discord1.png')" />
      </v-col>
      <v-col>
        <v-img :src="require('~/assets/images/discord2.png')" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  fetch() {
    this.$axios
      .$get(this.$axios.defaults.baseURL + `/api/botinfo`)
      .then((response) => {
        this.botinfo = response
      })
  },
  fetchOnServer: false,
  data() {
    return {
      botinfo: null,
    }
  },
}
</script>
