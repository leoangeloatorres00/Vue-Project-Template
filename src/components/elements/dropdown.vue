<template>
  <div class="dropdown-container">
    <TextField
      readonly
      ref="dropdown"
      :label="label"
      :placeholder="placeholder"
      :disabled="disabled"
      @click="onDropdown"
    >
      <template v-slot:append>
        <Images v-show="isDropdownOpen" src="chevron_up.webp"></Images>
        <Images v-show="!isDropdownOpen" src="chevron_down.webp"></Images>
      </template>
    </TextField>

    <BottomSheet ref="bottomsheet">
      <div class="dropdown-wrapper">
        <Layout>
          <template v-slot:header>
            <h3>Select {{ label.toLowerCase() }}</h3>
            <Search
              ref="search"
              :items="lists"
              :keys="keys"
              :placeholder="`Search ${label.toLowerCase()}`"
              @search="onSearch"
            />
          </template>

          <template v-slot:content>
            <v-list class="lists">
              <v-list-item-group color="primary" v-model="selectedItem">
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-content>
                    <v-list-item-title @click="onSelect(item)">
                      {{ item[keys] }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>

            <div class="lists-empty" v-if="isListEmpty">
              <v-avatar class="avatar" size="60" color="grey lighten-1">
                <v-icon large> mdi-magnify </v-icon>
              </v-avatar>
              <h3>No items found</h3>
              <span>Try changing your search criteria.</span>
            </div>
          </template>
        </Layout>
      </div>
    </BottomSheet>
  </div>
</template>

<script>
import { lazyLoad } from "@/utils";

export default {
  components: {
    Layout: lazyLoad("index", "layout"),
    Images: lazyLoad("image", "component"),
    Search: lazyLoad("search", "component"),
    BottomSheet: lazyLoad("text_field", "component"),
    TextField: lazyLoad("bottom_sheet", "component"),
  },
  props: {
    placeholder: {
      type: String,
      default: () => {
        return "";
      },
    },
    label: {
      type: String,
      default: () => {
        return "";
      },
    },
    lists: {
      type: Array,
      default: () => {
        return [];
      },
    },
    keys: {
      type: String,
      default: () => {
        return "key";
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
      text: "",
      value: "",
      search: "",
      items: [],
      selectedItem: "",
      isDropdownOpen: false,
    };
  },
  mounted() {
    this.$watch(
      () => this.value,
      () => {
        this.onSetValue();
      }
    );

    this.$watch(
      () => this.bottomsheet.show,
      (value) => {
        this.isDropdownOpen = value;
      }
    );
  },
  computed: {
    isListEmpty: function () {
      return this.items.length === 0;
    },
    searchInput() {
      return this.$refs.search;
    },
    dropdown() {
      return this.$refs.dropdown;
    },
    bottomsheet() {
      return this.$refs.bottomsheet;
    },
  },
  methods: {
    onBottomSheet() {
      console.log("hey");
    },
    onDropdown() {
      const self = this;
      self.bottomsheet.show = true;

      setTimeout(() => {
        self.searchInput.show = true;
      }, 100);
    },
    onSelect(item) {
      this.bottomsheet.show = false;

      this.value = item.value;
      this.dropdown.value = item[this.keys];
    },
    onSearch(items) {
      const self = this;
      self.items = items;
      self.onHighlightSelectedItem();

      setTimeout(() => {
        self.onEmptyList();
      }, 100);
    },
    onEmptyList() {
      let sheet = document.querySelector(".sheet");

      sheet.classList.remove("empty");
      if (this.isListEmpty) {
        sheet.classList.add("empty");
      }
    },
    onHighlightSelectedItem() {
      const self = this;
      const index = self.items.findIndex(function (list) {
        return list.value == self.value;
      });

      self.selectedItem = index;
    },
    onSetValue() {
      const self = this;
      if (self.value != "" && self.value != null) {
        const index = self.lists.findIndex(function (list) {
          return list.value == self.value;
        });

        if (index > -1) {
          self.dropdown.value = self.lists[index].key;
        }
      }
    },
    validateInput(value) {
      this.dropdown.validateInput(value);
      return this.dropdown.message != "";
    },
  },
};
</script>

<style>
.dropdown-wrapper .wrapper {
  height: 100%;
}

.dropdown-wrapper header {
  padding: 0px 20px 5px;
}

.dropdown-wrapper main {
  padding: 0px 20px 20px;
  overflow-y: auto;
}

.dropdown-wrapper footer {
  padding: 0px;
}

.sheet.empty {
  height: 400px;
}
</style>

<style scoped>
h3 {
  margin-bottom: 8px;
}

.lists {
  overflow-y: auto;
  max-height: 500px;
}

.lists-empty {
  text-align: center;
}

.lists .primary--text {
  color: var(--input-text-primary) !important;
  caret-color: var(--input-text-primary) !important;
}

.avatar {
  margin-block: 20px 10px;
}
</style>
