<template>
  <TextField
    ref="search"
    clearable
    :placeholder="placeholder"
    :required="false"
  >
    <template v-slot:append>
      <v-img src="@/assets/images/search.webp"></v-img>
    </template>
  </TextField>
</template>

<script>
import { lazyLoad } from "@/utils";

export default {
  components: {
    TextField: lazyLoad("text_field", "component"),
  },
  props: {
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
    placeholder: {
      type: String,
      default: () => {
        return "";
      },
    },
  },

  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.$watch(
      () => this.$refs.search.value,
      (value) => {
        const searchEmpty = this.onSearchEmpty();

        if (searchEmpty) {
          this.onSearch(value);
        }
      }
    );
  },
  watch: {
    show: function (value) {
      if (value) {
        this.onSearchEmpty();

        let search = null;
        if (this.search != undefined) {
          search = this.search.value;
        }

        this.onSearch(search);

        this.show = false;
      }
    },
  },
  computed: {
    search() {
      return this.$refs.search;
    },
  },
  methods: {
    onSearch(value) {
      let items = this.items;

      if (value != null && value != "") {
        items = this.items.filter((items) => {
          const search = value?.toLowerCase();
          const item = items[this.keys].toLowerCase();

          if (item.includes(search)) {
            return items;
          }
        });
      }

      return this.onEmitSearch(items);
    },
    onSearchEmpty() {
      if (this.search == undefined) return false;

      if (this.search.value == "" || this.search.value == null) {
        this.onEmitSearch(this.items);
        return false;
      }

      return true;
    },
    onEmitSearch(items) {
      this.$emit("search", items);
    },
  },
};
</script>

<style scoped>
.textfield-container {
  margin-bottom: 0px !important;
}
</style>
