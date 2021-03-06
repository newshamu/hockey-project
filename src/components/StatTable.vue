<template>
  <v-flex class="pl-1 pr-1 ma-3">
    <v-layout row wrap>
      <v-flex xs-12 sm-6>
        <team-selector
          :teams="teams"
          @teams-change="teamsChange"
        ></team-selector>
      </v-flex>
      <v-flex xs-12 sm-6>
        <stat-selector
          :stats="statDict"
          @stats-change="statsChange"
        ></stat-selector>
      </v-flex>
    </v-layout>
    <v-card flat>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search Table"
        single-line
        hide-details
        backgroundColor="secondary"
        solo flat
        hint="Search through table"
        persistent-hint
      ></v-text-field>
      <v-data-table
        :headers="selectedStats"
        :items="selectedTeams"
        :search="search"
      >
        <template slot="items" slot-scope="props">
          <td
            v-for="stat in selectedStats"
            :key="stat.value"
          >
            <span>
              {{ props.item[stat.value] }}
            </span>
          </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-card>
  </v-flex>
</template>

<script>
import statDict from '../static/TeamStatDict.js'
import StatSelector from './StatSelector'
import TeamSelector from './TeamSelector'

export default {
  components: {
    StatSelector,
    TeamSelector
  },
  props: ['teams'],
  data: function () {
    return {
      search: '',
      stat: null,
      data: [],
      selectedStats: [],
      selectedTeams: [],
      statDict: statDict,
      teamNameHeader: {
        text: 'Team Name',
        value: 'name'
      },
      teamNameAdded: false
    }
  },
  mounted: function () {
    this.setUpTable()
  },
  methods: {
    setUpTable: function () {
      this.selectedStats.push(this.teamNameHeader)

      // Populate data array with team data objects
      for (var i = 0; i < Object.keys(this.teams).length; i++) {
        this.data[i] = this.teams[i]

        // Makes actual stats more accessible -- data isn't buried
        // under unnecessary nested properties
        for (var stat in this.teams[i].teamStats[0].splits[0].stat) {
          this.data[i][stat] = this.teams[i].teamStats[0].splits[0].stat[stat]
        }
        delete this.data[i].teamStats  // Cleans up object to remain lightweight
      }
    },
    statsChange: function (selectedStats) {
      this.selectedStats = selectedStats
      if (!this.teamNameAdded) {
        this.selectedStats.unshift(this.teamNameHeader)
        this.teamNameAdded = true
      }
      this.$emit('stats-change', this.selectedStats)
    },
    teamsChange: function (selectedTeams) {
      this.selectedTeams = selectedTeams
      this.$emit('teams-change', this.selectedTeams)
    }
  }
}
</script>