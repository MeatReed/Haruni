<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app color="transparent">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="avatar" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">
            Haruni
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list shaped dense>
        <v-subheader>Menu</v-subheader>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          nuxt
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-group prepend-icon="mdi-link">
          <template v-slot:activator>
            <v-list-item-title>Useful links</v-list-item-title>
          </template>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Vote</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              href="https://botlist.space/bot/722181826545713313"
              target="_blank"
            >
              <v-list-item-title>botlist.space</v-list-item-title>
            </v-list-item>
            <v-list-item
              href="https://discord.bots.gg/bots/722181826545713313"
              target="_blank"
            >
              <v-list-item-title>discord.bots.gg</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item
            exact
            href="https://github.com/MeatReed/Haruni"
            target="_blank"
          >
            <v-list-item-action>
              <v-icon>mdi-github</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Github</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="transparent" @click="dialogAppearance = true"
            >Appearance</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar fixed app dense flat collapse-on-scroll color="transparent">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <nuxt keep-alive />
    </v-main>
    <v-footer fixed app color="transparent">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <v-dialog
      v-model="dialogAppearance"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card color="transparent">
        <v-toolbar color="transparent">
          <v-btn icon @click="dialogAppearance = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
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
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      avatar:
        'https://cdn.discordapp.com/avatars/722181826545713313/593530d4de2fda3e41ac6937fd9c7733.png?size=2048',
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-play',
          title: 'Player',
          to: '/player',
        },
      ],
      title: 'Haruni Player',
      dialogAppearance: false,
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

<style>
.v-application .transparent {
  background-color: rgba(0, 0, 0, 0.5) !important;
}
.v-card.transparent {
  background-color: rgba(0, 0, 0, 0.6) !important;
}

.theme--dark.v-tabs-items {
  background-color: rgba(0, 0, 0, 0) !important;
}

.theme--dark.v-data-table {
  background-color: rgba(0, 0, 0, 0.41) !important;
}

.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.v-item-group.theme--dark.v-slide-group.v-tabs-bar.v-tabs-bar--is-mobile.primary--text.transparent {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
