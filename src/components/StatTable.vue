<template>
  <v-card>
    <v-card>
      <stat-selector />
    </v-card>
    <v-data-table
      :headers="headers"
      :items="data"
    >
      <template slot="items" slot-scope="props">
        <!-- <td>{{ props.item.abbreviation }}</td> -->
        <td
          v-for="stat in headers"
          :key="stat.displayName"
        >
          {{ props.item.teamStats[0].splits[0].stat[stat.value] }}
        </td>
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
var statDict = require('../static/TeamStatDict.js')
var StatSelector = require('./StatSelector')

export default {
  components: {
    StatSelector
  },
  props: ['teams'],
  data: function () {
    return {
      headers: [],
      data: [],
      stat: null,
    }
  },
  mounted: function () {
    this.setUpTable()
  },
  methods: {
    setUpTable: function () {
      this.headers.push({
        text: 'Team Name',
        value: 'Team Name'
      })
      for (var i = 0; i < statDict.length; i++) {
        this.headers.push({
          text: statDict[i].apiName,
          value: statDict[i].apiName
        })
      }
      //this.headers = statDict
      // for (var i = 0; i < Object.keys(this.teams).length; i++) {
      //   this.data.append()
      // }
      this.data = this.teams
    },
    statChange: function (stat) {
      this.stat = stat
    }
  }
}
</script>