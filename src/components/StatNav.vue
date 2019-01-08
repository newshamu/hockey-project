<template>
  <v-navigation-drawer permanent>
    <v-toolbar flat dark color="secondary">
      <h3>Stat Nav</h3>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list>
      <v-list-tile
        v-for="item in statCategories"
        :key="item.id"
      >
        <v-list-tile-action>
          <v-btn icon @click="addToStatView(item)">
            <v-icon>add</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ['teams'],
  data: function () {
    return {
      statCategories: [
        'Teams',
        'Divisons',
        'Conferences',
        'People',
        'Game-IDs',
        'Schedule',
        'Standings',
        'Team Stats',
        'Draft',
        'Prospects',
        'Awards'
      ]
    }
  },
  methods: {
    addToStatView: function (item) {
      if (item === 'Teams') {
        null
      }
    }
  }
}
</script>