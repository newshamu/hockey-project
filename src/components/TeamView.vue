<template>
  <v-flex xs12 sm9>
    <v-card v-if="team !== null">
      <v-card-title>{{ team.name }}</v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['team']
}
</script>