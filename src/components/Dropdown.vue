<template>
  <div class="container">
    <v-text-field
      outlined
      v-model="value"
      hide-details="true"
      :placeholder="placeholder"
      append-icon="mdi-chevron-down"
      readonly
      @click="onClick"
    />
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="sheet">
        <div class="dropdown-container">
          <v-text-field
            outlined
            hide-details="true"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            v-model="search"
            clearable
          />
          <div class="lists">
            <v-list>
              <v-list-item-group mandatory color="primary">
                <v-list-item v-for="(list, i) in lists" :key="i">
                  <v-list-item-content>
                    <v-list-item-title @click="onSelect(list)">
                      {{ list[keys] }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>

            <div class="text-center" v-if="lists.length == 0">
              <v-avatar size="60" color="grey lighten-1 mt-5 mb-2">
                <v-icon large> mdi-magnify </v-icon>
              </v-avatar>
              <h3>No items found</h3>
              <span>Try changing your search criteria.</span>
            </div>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: () => {
        return "";
      },
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    keys: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      value: "",
      search: "",
      sheet: false,
      lists: [],
    };
  },
  mounted() {
    this.lists = this.items;
  },
  watch: {
    search: function (value) {
      if (value == "" || value == null) {
        this.lists = this.items;
        return;
      }

      this.onSearch(value);
    },
  },
  methods: {
    onClick() {
      this.sheet = true;
    },
    onSelect(item) {
      this.sheet = false;
      this.value = item.state;
    },
    onSearch(value) {
      const items = this.items.filter((items) => {
        const search = value.toLowerCase();
        const item = items[this.keys].toLowerCase();

        if (item.includes(search)) {
          return items;
        }
      });

      this.lists = items;
    },
  },
};
</script>

<style scoped>
.container {
  margin: 10px;
  padding: 10px;
}

.sheet {
  min-height: 300px;
}

.dropdown-container {
  margin: 10px 10px 0px;
  padding: 30px 10px 10px;
}

.lists {
  overflow-y: auto;
  max-height: 600px;
}
</style>
