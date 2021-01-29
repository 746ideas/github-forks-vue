<template>
  <div>
    <template v-if="loading">
      <v-progress-linear
        indeterminate
      >
      </v-progress-linear>
      <v-subheader class="justify-center">
        Загружаем...
      </v-subheader>
    </template>
    <template v-else>
      <v-simple-table dense>
        <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.name"
            :class="column.class"
          >
            {{column.displayName}}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="item in data"
          :key="item.id"
        >
          <td
            v-for="column in columns"
            :key="`${column.name}_${item.id}`"
            :class="column.class"
          >
            <template v-if="column.getter">
              {{column.getter(item)}}
            </template>
            <slot
              v-else-if="$scopedSlots[column.name]"
              :name="column.name"
              :item="item"
            />
            <template v-else>
              {{item[column.name]}}
            </template>
          </td>
        </tr>
        </tbody>
      </v-simple-table>
      <slot name="pagination"/>
    </template>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  props: {
    loading: {
      type: Boolean,
      default(){
        return false
      }
    },
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped>

</style>
