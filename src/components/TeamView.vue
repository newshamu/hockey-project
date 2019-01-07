<template>
  <v-flex>
    <v-card>
      <v-card-title class="justify-center">Select a team</v-card-title>
      <v-flex xs8 sm8 offset-xs2>
        <v-select
          :items="teams"
          v-model="team"
          @change="getTeamStats()"
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
      <v-card v-if="teamStats !== null">
        <v-card-text>
          <p><u>Games played to date:</u> {{ teamStats[0].splits[0].stat.gamesPlayed }}</p>
          <p><u>Record to date:</u> 
            {{ teamStats[0].splits[0].stat.wins }}-
            {{ teamStats[0].splits[0].stat.losses }}-
            {{ teamStats[0].splits[0].stat.ot }}
          </p>
        </v-card-text>
      </v-card>
    </v-card>
  </v-flex>
</template>

<script>
var axios = require('axios')

export default {
  props: ['teams'],
  data: function () {
    return {
      team: null,
      teamStats: null
    }
  },
  methods: {
    getTeamStats: function () {
      var that = this
      var teamID = this.team.id
      axios.get('https://statsapi.web.nhl.com/api/v1/teams/' + teamID + '?expand=team.stats')
      .then( function (res) {
        that.teamStats = res.data.teams[0].teamStats
      })
    }
  }
}
</script>