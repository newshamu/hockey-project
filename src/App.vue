<template>
  <v-app app>
    <v-toolbar>
      <v-toolbar-title class="headline text-uppercase">
        <span>Hockey Thingy</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <v-layout row>
        <team-list 
          :teams="teams"
          v-on:update-team-view="updateActiveTeam"
        ></team-list>
        <team-view
          :team="activeTeam"
        ></team-view>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
var axios = require('axios')

import TeamList from './components/TeamList'
import TeamView from './components/TeamView'

export default {
  name: 'App',
  components: {
    TeamList,
    TeamView
  },
  data: function () {
    return {
      teams: null,
      activeTeam: null,
      copyright: null,
    }
  },
  beforeMount: function () {
    this.getTeams()
  },
  methods: {
    getTeams: function () {
      var that = this
      axios.get('https://statsapi.web.nhl.com/api/v1/teams/')
      .then( function (res) {
        that.teams = res.data.teams
        that.copyright = res.data.copyright
        that.getRandomTeam()
      })
    },
    getRandomTeam: function () {
      var numTeams = this.teams.length
      var randNum = Math.floor(Math.random() * numTeams)
      this.activeTeam = this.teams[randNum]
    },
    updateActiveTeam: function (team) {
      this.activeTeam = team
    }
  }
}
</script>
