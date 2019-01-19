<template>
  <v-flex>
    <v-btn @click="updateChart">Create Chart</v-btn>
    <GChart
      type="ColumnChart"
      :data="chartData"
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
      var chartData = []
      var statsText = []
      var statsValue = []
      for (var i = 0; i < this.selectedStats.length; i++) {
        statsText.push(this.selectedStats[i].text)
        statsValue.push(this.selectedStats[i].value)
      }
      chartData.push(statsText)

      // Populate data
      for (i = 0; i < this.selectedTeams.length; i++) {
        var teamData = []
        var currentTeam = this.selectedTeams[i]
        for (var j = 0; j < statsText.length; j++) {
          teamData.push(currentTeam[statsValue[j]])
        }
        chartData.push(teamData)
      }
      this.chartData = chartData
    }
  }
}
</script>