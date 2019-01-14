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
    >
      <template
        slot="selection"
        slot-scope="{ item, index }"
      >
        <v-chip v-if="index === 0">
          <span>{{ item.name }}</span>
        </v-chip>
        <span
          v-if="index === 1"
          class="grey--text caption"
        >(+{{ selectedTeams.length - 1 }} others)</span>
      </template>
    </v-select>
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