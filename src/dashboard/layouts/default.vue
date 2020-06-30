<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      color="transparent"
    >
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
          <v-btn block color="transparent" nuxt to="/appearance"
            >Appearance</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      dense
      flat
      collapse-on-scroll
      color="transparent"
    >
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
        {
          icon: 'mdi-play',
          title: 'Player',
          to: '/player',
        },
      ],
      title: 'Haruni Player',
    }
  },
}
</script>

<style>
.v-application .transparent {
  background-color: rgba(0, 0, 0, 0.41) !important;
}
.v-card.transparent {
  background-color: rgba(0, 0, 0, 0.41) !important;
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
