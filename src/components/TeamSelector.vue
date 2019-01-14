<template>
  <v-card flat>
    <v-select
      class="pl-1 pr-1"
      :items="teams"
      v-model="selectedTeams"
      item-text="name"
      label="Teams"
      hint="Select the teams you wish to compare"
      chips
      multiple
      persistent-hint
      return-object
      @input="emitTeams"
    ></v-select>
  </v-card>
</template>

<script>
export default {
  props: ['teams'],
  data: function () {
    return {
      selectedTeams: null
    }
  },
  methods: {
    emitTeams: function () {
      this.$emit('teams-change', this.selectedTeams)
    }
  }
}
</script>