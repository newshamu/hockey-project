<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card
        class="mb-3"
        raised
        ripple
        tile
        v-for="team in team.teams"
        :key=team.id
      >
        <v-card-text>
          {{ team.name }}
          <v-card>
            <v-card-text>
              {{ team.locationName }}
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
var axios = require('axios')

export default {
  data: function () {
    return {
      team: null
    }
  },

  mounted: function () {
    this.getTeams()
  },
  methods: {
    getTeams: function () {
      let that = this
      axios.get('https://statsapi.web.nhl.com/api/v1/teams/')
      .then( function (res) {
        that.team = res.data
      })
    }
  }
}
</script>
