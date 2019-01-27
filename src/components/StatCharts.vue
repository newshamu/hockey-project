<template>
  <v-flex>
    <v-btn @click="updateChart">Create Chart</v-btn>
    <v-tabs
      v-show="areGraphsDrawn"
      v-model="active"
      color="primary"
      dark
      centered
      slider-color="accent"
      id="tab"
      v-resize="updateChartSize"
      @change="updateChartSize"
    >
      <v-tab
        v-for="data in chartData"
        :key="data.id"
        ripple
      >
        {{ data[0][1] }}
      </v-tab>
      <v-tab-item
        v-for="data in chartData"
        :key="data.id"
      >
        <GChart
          type="ColumnChart"
          :data="data"
          :options="chartOptions"
        />
      </v-tab-item>
    </v-tabs>
  </v-flex>
</template>

<script>
import teamColors from '../static/TeamColorDict.js'

export default {
  props: ['selectedTeams', 'selectedStats'],
  data () {
    return {
      areGraphsDrawn: false,
      active: null,
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        // [
        //   ['Team Name', 'Stat 1'],
        //   ['Team 0', Team 0 Stat],
        //   ['Team 1', Team 1 Stat]
        // ],
        // [
        //   ['Team name', 'Stat 2'],
        //   ['Team 0', Team 0 Stat],
        //   ['Team 1', Team 1 Stat]
        // ]
      ],
      chartOptions: {
        width: 200,
        height: 100,
        chart: {
          title: 'Chart',
          subtitle: 'Chart goes here'
        }
      }
    }
  },
  methods: {
    updateChartSize: function () {
      this.chartOptions.width = document.getElementById('tab').clientWidth
      this.chartOptions.height = this.chartOptions.width / 3
    },
    updateChart: function () {
      this.areGraphsDrawn = true
      var chartData = []
      var that = this

      // Break stats into text and value arrays
      var statsText  = this.selectedStats.map( function (stat) {
        return stat.text
      })

      // Create a chart data array for each stat
      // Loop starts at 1 to ignore team name "stat"
      this.selectedStats
        .filter( function (stat) {
          if (stat.text !== 'Team Name') {
            return stat
          }
        }).map( function (stat) {
          var data = []
          var d = []
          d.push(statsText[0])
          d.push(statsText[that.selectedStats.indexOf(stat)])
          d.push({ role: 'style' })
          data.push(d)
          d = []

          // Insert each team's values for each stat
          that.selectedTeams.map( function (team) {
            d.push(team.name)

            // Check for %'s, denoted as strings. Convert to integers
            var tVal = team[stat.value]
            if (typeof(tVal) === 'string') {
              tVal = (parseFloat(tVal))
            }
            d.push(tVal)
            var colors = teamColors.find(function(element) {
              return element.abbreviation === team.abbreviation
            })
            d.push(colors.colors[0])
            data.push(d)
            d = []
          })
          chartData.push(data)
        })
      this.chartData = chartData
      this.updateChartSize()
    }
  }
}
</script>