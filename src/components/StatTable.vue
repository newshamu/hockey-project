<template>
  <v-flex>
    <v-card flat class="ma-3">
      <v-text-field
        class="pl-1 pr-1"
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="data"
        :search="search"
      >
        <template slot="items" slot-scope="props">
          <td
            v-for="stat in headers"
            :key="stat.apiName"
          >
            <span v-if="stat.value === 'Team Name'">
              {{ props.item.name }}
            </span>
            <span v-else>
              {{ props.item.teamStats[0].splits[0].stat[stat.value] }}
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
var statDict = require('../static/TeamStatDict.js')

export default {
  components: {

  },
  props: ['teams'],
  data: function () {
    return {
      search: '',
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