<template>
  <v-list>
    <v-list-tile
      v-for="team in teams"
      :key="team.id"
    >
      <v-list-tile-action>
        <v-btn icon @click="addToTeamView(team)">
          <v-icon>add</v-icon>
        </v-btn>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ team }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  props: ['teams'],
  methods: {
    addToTeamView: function (team) {
      
    }
  }
}
</script>