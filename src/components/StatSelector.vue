<template>
  <v-card flat>
    <v-select
      class="pl-1 pr-1"
      :items="stats"
      v-model="selectedStats"
      item-text="text"
      label="Stats"
      hint="Select the stats you wish to compare"
      chips
      multiple
      persistent-hint
      return-object
      @input="emitStats"
    ></v-select>
  </v-card>
</template>

<script>
export default {
  props: ['stats'],
  data: function () {
    return {
      selectedStats: null
    }
  },
  methods: {
    emitStats: function () {
      this.$emit('stats-change', this.selectedStats)
    },
  }
}
</script>