<template>
  <v-text-field
    dense
    outlined
    full-width
    v-model="searchInput"
    @keyup.enter="handleSearch"
  >
    <template v-slot:prepend>
      <v-btn
        icon
        @click="handleSearch"
      >
        <v-icon>
          mdi-search-web
        </v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    value: {
      type: [String],
      required: true
    },
  },
  computed:{
    searchInput:{
      get(){
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    }
  },
  methods: {
    handleSearch(){
      this.$emit('search')
    }
  }
}
</script>

<style scoped>

</style>
