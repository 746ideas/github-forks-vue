<template>
  <div class="d-flex flex-column align-center justify-center" style="height: 100%">
    <div>
      <v-row class="justify-center align-center mb-4">
        <img :src="`${publicPath}vue.svg`" alt="vue"/>
        <img :src="`${publicPath}add.svg`" alt="add"/>
        <img :src="`${publicPath}github.svg`" alt="github"/>
        <img :src="`${publicPath}fork.png`" alt="fork"/>
      </v-row>
      <h1 class="text-h5 mb-8">Введите название репозитория для поиска форков</h1>
      <SearchInput
        v-model="searchInput"
        @search="goToSearch"
      />
    </div>
  </div>
</template>

<script>
import SearchInput from "../components/SearchInput";
export default {
  name: "Home",
  components: {
    SearchInput,
  },
  data(){
    return {
      searchInput: '',
      publicPath: process.env.BASE_URL
    }
  },
  methods:{
    goToSearch(){
      this.$router.push({path: '/search', query: {page: '1', repositoryName: this.searchInput}})
    }
  }
}
</script>

<style scoped>
img{
  margin-right: 16px;
}
img:first-of-type{
  width: 100px;
  height: 100px;
}
img:nth-of-type(2){
  width: 50px;
  height: 50px;
}
img:nth-of-type(3){
  height: 100px;
}
img:nth-of-type(4){
  height: 100px;
}
</style>
