<template>
  <validation-observer
    class="d-flex align-center mb-2"
    style="width: 100%"
    v-slot="{ handleSubmit }"
  >
    <v-btn
      icon
      @click="handleSubmit(handleSearch)"
    >
      <v-icon>
        mdi-search-web
      </v-icon>
    </v-btn>
    <validation-provider
      mode="eager"
      rules="repo"
      style="width: 100%"
      v-slot="{errors}"
    >
      <v-text-field
        dense
        class="elevation-2"
        outlined
        hide-details="auto"
        :error-messages="showMessage(errors)"
        full-width
        v-model="searchInput"
        @keyup.enter="handleSubmit(handleSearch)"
      />
    </validation-provider>
  </validation-observer>
</template>

<script>
import {ValidationProvider, ValidationObserver} from 'vee-validate'

export default {
  name: "SearchInput",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    value: {
      type: [String],
      required: true
    },
  },
  computed: {
    searchInput: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    showMessage(errors){
      console.log(errors && errors.length > 0 ? errors[0] : null)
      return errors && errors.length > 0 ? errors[0] : null
    },
    handleSearch() {
      this.$emit('search')
    }
  }
}
</script>

<style scoped>

</style>
