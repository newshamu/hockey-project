<template>
  <v-card flat>
    <v-select
      class="pl-1 pr-1"
      :items="stats"
      v-model="selectedStats"
      item-text="text"
      label="Stats"
      hint="Select stats to compare"
      chips
      multiple
      solo flat
      persistent-hint
      return-object
      @input="emitStats"
      dense
      color="accent"
      clearable
      background-color="secondary"
    >
      <template
        slot="selection"
        slot-scope="{ item, index }"
      >
        <v-chip text-color="cyan lighten-5" color="cyan darken-1" v-if="index < 3">
          <span>{{ item.text }}</span>
        </v-chip>
        <span
          v-if="index === 3"
          class="caption"
        >(+{{ selectedStats.length - 4 }} more)</span>
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