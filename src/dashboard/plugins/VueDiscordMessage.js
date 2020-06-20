import Vue from 'vue'
import VueDiscordMessage from 'vue-discord-message'

Vue.use(VueDiscordMessage, {
  avatars: {
    meatreed: 'https://i.imgur.com/4tGXWsu.png',
  },
  profiles: {
    haruni: {
      author: 'Haruni',
      avatar: 'https://i.imgur.com/cXFWxKx.png',
      bot: true,
      roleColor: '#ee82ee',
    },
  },
})
