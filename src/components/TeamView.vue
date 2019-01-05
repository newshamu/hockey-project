<template>
  <v-flex xs12 sm9>
    <v-card v-if="team !== null">
      <v-card-title>{{ team.name }} ({{ team.abbreviation }})</v-card-title>
      <v-card-text>
        <p><u>Division:</u> {{ team.division.name }}</p>
        <p><u>Conference:</u> {{ team.conference.name }}</p>
        <p><u>First year of play:</u> {{ team.firstYearOfPlay }}</p>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['team']
}
</script>