<template>
  <div content-class="elevation-0" class="ma-12 pa-12 elevation-0">
    <v-card class="elevation-0" height="100vh">
      <v-navigation-drawer color="#b8fffe" overlay-opacity="100%"
        permanent
        expand-on-hover
        
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/plant.png"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ currentUser }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-flower-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add pot</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-contacts-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
export default {
computed: {
    currentUser() {
        return localStorage.getItem("user");
    }
}
}
</script>

<style lang="scss">

</style>