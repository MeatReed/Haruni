<template>
  <v-container fluid>
    <div class="font-weight-bold headline text-center">
      Choose your server
    </div>
    <v-row v-if="this.$store.state.user">
      <v-col
        v-for="(item, index) of this.$store.state.user.guilds.filter(
          (u) => (u.permissions & 2146958591) === 2146958591
        )"
        :key="index"
        class="text-center"
      >
        <v-hover v-slot:default="{ hover }" open-delay="200" aria-disabled>
          <v-card
            class="mx-auto"
            :elevation="hover ? 24 : 2"
            color="transparent"
            width="244"
            outlined
            nuxt
            :to="'/player/' + item.id"
          >
            <v-img
              class="white--text align-end"
              :src="
                item.icon
                  ? `https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png`
                  : 'https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png'
              "
            />
            <v-card-title>
              {{ item.name }}
            </v-card-title>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    <dialogLogin />
  </v-container>
</template>

<script>
import dialogLogin from '@/components/dialogLogin'

export default {
  components: {
    dialogLogin,
  },
  data() {
    return {
      commands: null,
      tab: null,
    }
  },
}
</script>
