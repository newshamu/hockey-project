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
        // ['Year', 'Sales', 'Expenses', 'Profit'],
        // ['2014', 1000, 400, 200],
        // ['2015', 1170, 460, 250],
        // ['2016', 660, 1120, 300],
        // ['2017', 1030, 540, 350]
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
      // Initialize stat categories
      // var chartData = []
      // var statsText = []
      // var statsValue = []
      // for (var i = 0; i < this.selectedStats.length; i++) {
      //   statsText.push(this.selectedStats[i].text)
      //   statsValue.push(this.selectedStats[i].value)
      // }
      // chartData.push(statsText)

      // // Populate data
      // for (i = 0; i < this.selectedTeams.length; i++) {
      //   var teamData = []
      //   var currentTeam = this.selectedTeams[i]
      //   for (var j = 0; j < statsText.length; j++) {
      //     teamData.push(currentTeam[statsValue[j]])
      //   }
      //   chartData.push(teamData)
      // }
      // this.chartData = chartData

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
          d.push(this.selectedTeams[j][stats[i].value])
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