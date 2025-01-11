<template>
  <div>
    <div class="title-container" v-if="onTitle">
      <span class="input-title">{{ title }}</span>
    </div>
    <v-text-field
      outlined
      v-model="value"
      hide-details="true"
      :placeholder="placeholder"
      append-icon="mdi-chevron-down"
      readonly
      :disabled="disabled"
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
    title: {
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
    disabled: {
      type: Boolean,
      default: () => {
        return false;
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
  computed: {
    onTitle: function () {
      return this.title != "";
    },
  },
  watch: {
    search: function (value) {
      this.onSearchEmpty();

      this.onSearch(value);
    },
  },
  methods: {
    onClick() {
      if (this.disabled) return;

      if (this.onSearchEmpty()) return (this.sheet = true);

      this.onSearch(this.search);

      this.sheet = true;
    },
    onSelect(item) {
      this.sheet = false;
      this.value = item[this.keys];
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
    onSearchEmpty() {
      if (this.search == "" || this.search == null) {
        this.lists = this.items;
        return;
      }

      return true;
    },
  },
};
</script>

<style scoped>
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

.title-container {
  margin-top: 16px;
  margin-bottom: 4px;
}

.input-title {
  margin-left: 4px;
  font-size: 12px;
}
</style>
