<template>
  <v-flex>
    <v-btn @click="updateChart">Create Chart</v-btn>
    <v-tabs
      v-model="active"
      color="primary"
      dark
      centered
      slider-color="accent"
      id="tab"
      v-resize="updateChartSize"
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
export default {
  props: ['selectedTeams', 'selectedStats'],
  data () {
    return {
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
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        width: 200,
        height: 100
      }
    }
  },
  methods: {
    updateChartSize: function () {
      this.chartOptions.width = document.getElementById('tab').clientWidth
      this.chartOptions.height = this.chartOptions.width / 3
    },
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
      this.updateChartSize()
    }
  }
}
</script>