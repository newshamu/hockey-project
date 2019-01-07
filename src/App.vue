<template>
  <v-app app>
    <v-toolbar color="secondary" dark>
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
        <team-view
          :teams="teams"
        ></team-view>
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
import TeamView from './components/TeamView'

export default {
  name: 'App',
  components: {
    StatNav,
    TeamView
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
      axios.get('https://statsapi.web.nhl.com/api/v1/teams/')
      .then( function (res) {
        that.teams = res.data.teams
        that.copyright = res.data.copyright
      })
    }
  }
}
</script>
