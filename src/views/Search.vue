<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="12"
      >
        <SearchInput
          v-model="searchInput"
          @search="changePage(1)"
        />
        <base-table
          v-if="isLoading || isLoaded"
          :columns="$options.columns"
          :data="forks"
          :loading="isLoading"
        >
          <template v-slot:stargazers_count="{item}">
            <v-icon color="yellow" class="mr-1">mdi-star</v-icon>
            {{item.stargazers_count}}
          </template>
          <template v-slot:html_url="{item}">
            <a :href="item.html_url">{{item.html_url}}</a>
          </template>
          <template slot="pagination">
            <v-pagination
              v-if="paginationLength > 0"
              :value="page"
              @input="changePage"
              :length="paginationLength"
              total-visible="7"
            />
          </template>
        </base-table>
        <v-alert
          v-if="isNotFound"
          type="error"
        >
          Такой репозиторий не найден
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {mapActions, mapGetters, mapState} from "vuex";
import {getters, actions} from "@/store/types";
import SearchInput from "@/components/SearchInput";
import BaseTable from "../components/BaseTable";

export default {
  name: 'Search',
  components: {BaseTable, SearchInput},
  columns: [
    {
      displayName: 'Полное название репозитория',
      name: 'full_name'
    },
    {
      displayName: 'Владелец',
      name: 'owner_login',
      getter: (item) => item.owner.login
    },
    {
      displayName: 'Количестов звезд',
      name: 'stargazers_count',
      class: 'text-center'
    },
    {
      displayName: 'Ссылка на репозиторий форка',
      name: 'html_url'
    }
  ],
  data(){
    return{
      searchInput: '',
      page: null,
      paginationLength: 0
    }
  },
  computed: {
    ...mapState(['forks']),
    ...mapGetters({
      isNotLoaded: getters.IS_NOT_LOADED,
      isLoading: getters.IS_LOADING,
      isLoaded: getters.IS_LOADED,
      isNotFound: getters.IS_NOT_FOUND
    })
  },
  watch:{
    '$route.query':{
      handler(val){
        if(val.page && val.repositoryName){
          this.searchInput = val.repositoryName
          this.page = Number(val.page)
          this.handleSearch(val.page)
        }
      },
      immediate: true
    }
  },
  methods:{
    ...mapActions({
      getForks: actions.FETCH_FORK_LIST
    }),
    changePage(page){
      if(this.$route.query.page !== page.toString() || this.$route.query.repositoryName !== this.searchInput) {
        this.$router.push({path: '/search', query: {page: page.toString(), repositoryName: this.searchInput}})
      }
    },
    handleSearch(page) {
      this.getForks({name: this.searchInput, page}).then(lastPage => {
        this.paginationLength = lastPage;
        this.page = Number(page)
      })
    }
  }
}
</script>
