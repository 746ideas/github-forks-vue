<template>
  <v-row>
    <v-col
      cols="12"
      sm="12"
    >
      <SearchInput
        v-model="searchInput"
        @search="handleSearch"
      />
      <v-sheet v-if="isLoading">
        <v-progress-linear
          indeterminate
        >
        </v-progress-linear>
        <v-subheader class="justify-center">
          Загружаем...
        </v-subheader>
      </v-sheet>
      <v-simple-table dense v-if="isLoaded">
        <thead>
        <tr>
          <th>
            Полное название репозитория
          </th>
          <th>
            Владелец
          </th>
          <th class="text-center">
            Количестов звезд
          </th>
          <th>
            Ссылка на репозиторий форка
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="fork in forks"
          :key="fork.id"
        >
          <td>
            {{ fork.full_name }}
          </td>
          <td>
            {{ fork.owner.login }}
          </td>
          <td class="text-center">
            <v-icon class="mr-1">
              mdi-star
            </v-icon>
            {{ fork.stargazers_count }}
          </td>
          <td>
            <a :href="fork.html_url">
              {{fork.html_url}}
            </a>
          </td>
        </tr>
        </tbody>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>

import {mapActions, mapGetters, mapState} from "vuex";
import {getters, actions} from "@/store/types";
import SearchInput from "@/components/SearchInput";

export default {
  name: 'Home',
  components: {SearchInput},
  data(){
    return{
      searchInput: ''
    }
  },
  computed: {
    ...mapState(['forks']),
    ...mapGetters({
      isNotLoaded: getters.IS_NOT_LOADED,
      isLoading: getters.IS_LOADING,
      isLoaded: getters.IS_LOADED
    })
  },
  methods:{
    ...mapActions({
      getForks: actions.FETCH_FORK_LIST
    }),
    handleSearch() {
      this.getForks(this.searchInput)
    }
  }
}
</script>
