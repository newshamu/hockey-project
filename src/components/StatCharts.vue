<template>
  <v-flex>
    <v-btn @click="updateChart">Create Chart</v-btn>
    <GChart
      v-for="data in chartData"
      :key="data.id"
      type="ColumnChart"
      :data="data"
      :options="chartOptions"
    />
  </v-flex>
</template>

<script>
export default {
  props: ['selectedTeams', 'selectedStats'],
  data () {
    return {
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
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      }
    }
  },
  methods: {
    updateChart: function () {
      var chartData = []
      var stats = this.selectedStats

      // Break stats into text and value arrays
      var statsText = []
      var statsValue = []
      for (var i = 0; i < this.selectedStats.length; i++) {
        statsText.push(this.selectedStats[i].text)
        statsValue.push(this.selectedStats[i].value)
      }

      // Create a chart data array for each stat
      // Loop starts at 1 to ignore team name "stat"
      for (i = 1; i < this.selectedStats.length; i++) {
        var data = []
        var d = []
        d.push(statsText[0])
        d.push(statsText[i])
        data.push(d)
        d = []
        // Insert each team's values for each stat
        for (var j = 0; j < this.selectedTeams.length; j++) {
          d.push(this.selectedTeams[j].name)

          // Check for %'s, denoted as strings. Convert to integers
          var tVal = this.selectedTeams[j][stats[i].value]
          if (typeof(tVal) === 'string') {
            tVal = (parseFloat(tVal))
          }
          d.push(tVal)
          data.push(d)
          d = []
        }
        chartData.push(data)
      }
      this.chartData = chartData
    }
  }
}
</script>