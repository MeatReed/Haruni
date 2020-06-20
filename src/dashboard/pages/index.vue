<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <v-avatar size="250">
          <img
            src="https://cdn.discordapp.com/avatars/722181826545713313/593530d4de2fda3e41ac6937fd9c7733.png?size=1280"
            alt=""
          />
        </v-avatar>
        <p class="font-weight-medium">
          Haruni is a Discord bot specializing in music! It has an online player
          to control the music from a website.
        </p>
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
        <discord-messages class="text-left">
          <discord-message
            :author="
              this.$store.state.user
                ? this.$store.state.user.username
                : 'TIーム'
            "
            :avatar="
              this.$store.state.user
                ? `https://cdn.discordapp.com/avatars/${this.$store.state.user.id}/${this.$store.state.user.avatar}.png`
                : 'meatreed'
            "
          >
            m!play
            <a href="https://www.youtube.com/watch?v=F3cXxqgbx9Y"
              >https://www.youtube.com/watch?v=F3cXxqgbx9Y</a
            >
          </discord-message>
          <discord-message profile="haruni" author="Haruni">
            <discord-embed
              slot="embeds"
              :author-name="
                this.$store.state.user
                  ? this.$store.state.user.username
                  : 'TIーム'
              "
              :author-image="
                this.$store.state.user
                  ? `https://cdn.discordapp.com/avatars/${this.$store.state.user.id}/${this.$store.state.user.avatar}.png`
                  : 'https://i.imgur.com/4tGXWsu.png'
              "
              thumbnail="https://img.youtube.com/vi/F3cXxqgbx9Y/maxresdefault.jpg"
              color="rgb(255, 0, 37)"
              timestamp="06/20/2020"
            >
              Playing:
              <a href="https://www.youtube.com/watch?v=F3cXxqgbx9Y"
                >ヨルシカ - 春ひさぎ（OFFICIAL VIDEO）</a
              >!
              <embed-field title="Author">
                ヨルシカ / n-buna Official
              </embed-field>
              <embed-field title="Requested by">
                {{
                  this.$store.state.user
                    ? `${this.$store.state.user.username}#${this.$store.state.user.discriminator}`
                    : 'TIーム#3693'
                }}
              </embed-field>
              <embed-field title="Duration">
                3:38
              </embed-field>
            </discord-embed>
          </discord-message>
        </discord-messages>
      </v-col>
      <v-col>
        <discord-messages>
          <discord-message
            :author="
              this.$store.state.user
                ? this.$store.state.user.username
                : 'TIーム'
            "
            :avatar="
              this.$store.state.user
                ? `https://cdn.discordapp.com/avatars/${this.$store.state.user.id}/${this.$store.state.user.avatar}.png`
                : 'meatreed'
            "
          >
            m!help
          </discord-message>
          <discord-message profile="haruni" author="Haruni">
            <discord-embed
              slot="embeds"
              :author-name="
                this.$store.state.user
                  ? this.$store.state.user.username
                  : 'TIーム'
              "
              :author-image="
                this.$store.state.user
                  ? `https://cdn.discordapp.com/avatars/${this.$store.state.user.id}/${this.$store.state.user.avatar}.png`
                  : 'https://i.imgur.com/4tGXWsu.png'
              "
              title="List of commands"
              thumbnail="https://i.imgur.com/cXFWxKx.png"
              image="https://i.imgur.com/oeHN1ph.png"
              color="rgb(177, 7, 46)"
              timestamp="06/20/2020"
            >
              <strong
                >For a more enjoyable experience with more functionality use the
                site!</strong
              ><br />Use <code>m!help {command name's}</code> for more
              details.<br />[] = Required<br />{} = Not Required<br />
              <embed-fields slot="fields">
                <embed-field title="misc">
                  <code>m!botinfo</code>, <code>m!help</code>,
                  <code>m!invite</code>, <code>m!playerweb</code>,
                </embed-field>
                <embed-field title="music">
                  <code>m!equalizer</code>, <code>m!loop</code>,
                  <code>m!loopqueue</code>, <code>m!nowplaying</code>,
                  <code>m!pause</code>, <code>m!play</code>,
                  <code>m!queue</code>, <code>m!replay</code>,
                  <code>m!resume</code>, <code>m!skip</code>,
                  <code>m!stop</code>, <code>m!volume</code>,
                </embed-field>
              </embed-fields>
            </discord-embed>
          </discord-message>
        </discord-messages>
      </v-col>
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
