<template>
  <v-card>
    <v-select
      :items="statDict"
      v-model="stat"
      item-text="displayName"
      label="Stat"
      return-object
      @change="emitStat"
    ></v-select>
  </v-card>
</template>

<script>
export default {
  data: function () {
    return {
      stat: null
    }
  },
  methods: {
    emitStat: function () {
      this.$emit('stat-change', this.stat)
    }
  }
}
</script>