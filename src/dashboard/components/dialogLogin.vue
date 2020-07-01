<template>
  <v-dialog :value="!this.$store.state.user" persistent width="500">
    <v-card color="transparent" outlined>
      <v-card-title>
        Login
      </v-card-title>

      <v-card-text>You must be logged in to access this page.</v-card-text>
      <v-card-actions class="text-center">
        <v-btn href="/login" text>Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
