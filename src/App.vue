<template>
  <v-app app>
    <v-toolbar color="primary" dark dense>
      <v-toolbar-title class="headline text-uppercase">
        <span>Head to Head Hockey</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-layout column>
        <v-flex xs-12>
          <stat-table 
            :teams="teams"
            v-if="teams !== null"
            @teams-change="updateTeams"
            @stats-change="updateStats"
          ></stat-table>
        </v-flex>
        <v-flex>
          <stat-charts
            :selected-teams="selectedTeams"
            :selected-stats="selectedStats"
          ></stat-charts>
        </v-flex>
      </v-layout>
    </v-content>
    <v-footer
      height="auto"
      color="primary"
    >
      <v-card
        class="flex"
        color="primary"
        flat
        dark
        tile
        grow
      >
        <v-card-title>
          <strong class="caption justify-center">{{ copyright }}</strong>
        </v-card-title>
      </v-card>
      <v-flex shrink>
        <v-tooltip top>
          <v-btn flat icon dark slot="activator" @click="goToGithub">
            <v-icon>code</v-icon>
          </v-btn>
          <span>Check out my Github!</span>
        </v-tooltip>
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
var axios = require('axios')

import StatTable from './components/StatTable'
import StatCharts from './components/StatCharts'

export default {
  name: 'App',
  components: {
    StatTable,
    StatCharts
  },
  data: function () {
    return {
      teams: null,
      copyright: null,
      selectedTeams: null,
      selectedStats: null,
    }
  },
  beforeMount: function () {
    this.getTeams()
  },
  methods: {
    getTeams: function () {
      var that = this
      axios.get('https://statsapi.web.nhl.com/api/v1/teams?expand=team.stats')
      .then( function (res) {
        that.teams = res.data.teams.sort(that.compareTeamNames)

        that.copyright = res.data.copyright
      })
    },
    compareTeamNames: function (a, b) {
      if (a.name <  b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      }
      return 0
    },
    updateTeams: function (selectedTeams) {
      this.selectedTeams = selectedTeams
    },
    updateStats: function (selectedStats) {
      this.selectedStats = selectedStats
    },
    goToGithub: function () {
      window.open('https://github.com/newshamu/hockey-project', '_blank')
    }
  }
}
</script>
