<template>
  <v-app app>
    <v-toolbar color="primary" dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>Hockey Thingy</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <v-layout row>
        <v-flex xs3 sm3>
          <stat-nav
            :teams="teams"
          ></stat-nav>
        </v-flex>
        <!-- <team-stat-panel
            :teams="teams"
          ></team-stat-panel> -->
        <stat-table 
          :teams="teams"
          v-if="teams !== null"
        ></stat-table>
      </v-layout>
    </v-content>
    <v-footer
      height="auto"
      dark
    >
      <v-card
        class="flex"
        flat
        tile
        color="secondary"
      >
        <v-card-title>
          <strong class="subheading justify-center">{{ copyright }}</strong>
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
var axios = require('axios')

import StatNav from './components/StatNav'
import StatTable from './components/StatTable'

export default {
  name: 'App',
  components: {
    StatNav,
    StatTable
  },
  data: function () {
    return {
      teams: null,
      copyright: null,
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
        that.teams = res.data.teams
        that.copyright = res.data.copyright
      })
    }
  }
}
</script>
