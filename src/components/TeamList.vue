<template>
  <v-flex xs6 sm3>
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Team List</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-tile
          v-for="team in teams"
          :key="team.id"
          v-on:click="updateTeam(team)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ team.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['teams'],
  methods: {
    updateTeam: function(team) {
      this.$emit('update-team-view', team)
    }
  }
}
</script>