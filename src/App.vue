<template>
  <v-app app>
    <v-toolbar color="primary" dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>Hockey Thingy</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-layout row>
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
        color="primary"
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

import StatTable from './components/StatTable'

export default {
  name: 'App',
  components: {
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
