<template>
  <v-card flat>
    <v-select
      class="pl-1 pr-1"
      :items="teams"
      v-model="selectedTeams"
      item-text="name"
      label="Teams"
      hint="Select teams to compare"
      chips
      multiple
      solo flat
      persistent-hint
      return-object
      @input="emitTeams"
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
          <span>{{ item.name }}</span>
        </v-chip>
        <span
          v-if="index === 3"
          class="caption"
        >(+{{ selectedTeams.length - 3 }} more)</span>
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