<template>
  <v-app app>
    <v-toolbar color="primary" dark dense>
      <v-toolbar-title class="headline text-uppercase">
        <span>Head to Head Hockey</span>
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
    goToGithub: function () {
      window.open('https://github.com/newshamu/hockey-project', '_blank')
    }
  }
}
</script>
