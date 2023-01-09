<template>
    <div> 
        <!-- navbar design changes based on device width and the route name is set as title if in small device -->
        <v-app-bar class="">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" 
            class="tw-block sm:tw-hidden tw-font-medium" align-with-title></v-app-bar-nav-icon>
            <v-tabs align-with-title class="tw-hidden sm:tw-block sm:tw-mx-[40px]">
                <v-tab :to="{ name: 'home' }">Home</v-tab>
                <v-tab :to="{ name: 'search' }">Filter</v-tab>
                <v-tab :to="{ name: 'create' }">Create</v-tab>
                <v-tab v-if="route.name === 'pet'" :to="{ name: 'pet', params: { id: route.params.id } }">Pet</v-tab>
            </v-tabs>
            <v-toolbar-title class="tw-block sm:tw-hidden tw-font-medium" v-if="route.name">
                {{ route.name.toUpperCase() }}
            </v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer class="sm:tw-hidden"
        v-model="drawer" absolute temporary
        >
            <v-list
                nav
                dense
            >
                <v-list-item>
                    <router-link :to="{ name: 'home'}"
                    class="tw-cursor-pointer tw-text-2xl">
                        Home
                    </router-link>
                </v-list-item>

                <v-list-item>
                    <router-link :to="{ name: 'search'}"
                    class="tw-cursor-pointer tw-text-2xl">
                        Filter
                    </router-link>   
                </v-list-item>
                <v-list-item>
                    <router-link :to="{ name: 'create'}"
                    class="tw-cursor-pointer tw-text-2xl">
                        Add a new Pet
                    </router-link>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const drawer = ref(false);
const group = ref(null);

</script>