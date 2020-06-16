<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            :color="$vuetify.theme.dark ? 'black' : 'white'"
            @click="$vuetify.theme.dark = $vuetify.theme.dark ? false : true"
            ><v-icon :color="$vuetify.theme.dark ? 'white' : 'black'"
              >mdi-white-balance-sunny</v-icon
            ></v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
      ],
      title: 'Haruni Player',
    }
  },
}
</script>
