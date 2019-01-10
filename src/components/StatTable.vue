<template>
  <v-flex xs-8 sm-8>
    <v-data-table
      :headers="headers"
      :items="data"
      class="elevation-5 ma-3"
    >
      <template slot="items" slot-scope="props">
        <td
          v-for="stat in headers"
          :key="stat.displayName"
        >
          <span v-if="stat.value === 'Team Name'">
            {{ props.item.abbreviation }}
          </span>
          <span v-else>
            {{ props.item.teamStats[0].splits[0].stat[stat.value] }}
          </span>
        </td>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
var statDict = require('../static/TeamStatDict.js')

export default {
  components: {

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