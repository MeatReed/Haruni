<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-avatar color="orange" size="150">
        <img
          src="https://cdn.discordapp.com/avatars/558777636902404127/510a1da139d8549806f81d0944ed082d.webp"
          alt=""
        />
      </v-avatar>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <p>
          Haruni is a Discord bot specializing in music! It has an online player
          to control the music from a website.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn
          href="https://discord.com/api/oauth2/authorize?client_id=722181826545713313&permissions=1609887095&scope=bot"
          >Add Haruni</v-btn
        >
        <v-btn href="/login">Login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {}
</script>
