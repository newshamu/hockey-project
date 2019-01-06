<template>
  <v-flex xs8 sm8 offset-xs2>
    <v-card>
      <v-card-title class="justify-center">Select a team</v-card-title>
      <v-flex xs8 sm8 offset-xs2>
        <v-select
          :items="teams"
          v-model="team"
          outline
          item-text="name"
          label="Team"
          return-object
        ></v-select>
      </v-flex>
      <v-card-text v-if="team !== null">
        <p><u>Division:</u> {{ team.division.name }}</p>
        <p><u>Conference:</u> {{ team.conference.name }}</p>
        <p><u>First year of play:</u> {{ team.firstYearOfPlay }}</p>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['teams'],
  data: function () {
    return {
      team: null
    }
  }
}
</script>