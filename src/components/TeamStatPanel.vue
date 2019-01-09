<template>
  <v-flex xs4 sm4 class="ma-3">
    <v-card>
      <v-flex xs8 sm8 offset-sm2 class="pa-1">
        <v-select
          :items="teams"
          v-model="team"
          autofocus
          item-text="name"
          label="Team"
          return-object
          @change="getTeamStats"
        ></v-select>
      </v-flex>
      <v-layout row v-if="team !== null">
        <v-flex xs6 sm6 class="pa-1">
          <v-select
            :items="statDict"
            v-model="stat"
            autofocus
            item-text="displayName"
            label="Stat"
            return-object
          ></v-select>
        </v-flex>
        <v-flex xs6 sm6 class="pa-1 text-xs-center" v-if="stat !== null">
          <v-card-text class="headline">{{ teamStats[stat.apiName] }}</v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
var axios = require('axios')
var statDict = require('../static/TeamStatDict.js')

export default {
  props: ['teams'],
  data: function () {
    return {
      team: null,
      stat: null,
      teamStats: null,
      statDict: statDict
    }
  },
  methods: {
    getTeamStats: function () {
      var that = this
      var teamID = this.team.id
      axios.get('https://statsapi.web.nhl.com/api/v1/teams/' + teamID + '?expand=team.stats')
      .then( function (res) {
        that.teamStats = res.data.teams[0].teamStats[0].splits[0].stat
      })
    }
  }
}
</script>