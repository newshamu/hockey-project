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
    >
      <template
        slot="selection"
        slot-scope="{ item, index }"
      >
        <v-chip v-if="index === 0">
          <span>{{ item.text }}</span>
        </v-chip>
        <span
          v-if="index === 1"
          class="grey--text caption"
        >(+{{ selectedStats.length - 1 }} others)</span>
      </template>
    </v-select>
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