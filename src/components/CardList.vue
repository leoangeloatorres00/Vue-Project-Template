<template>
  <div>
    <template v-for="(item, index) in items">
      <v-card class="card" :elevation="isWithBorder" :key="index">
        <v-list subheader two-line>
          <v-list-item>
            <v-list-item-content class="main-content">
              <v-list-item-title>
                {{ item[title] }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item[subtitle] }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="action-content">
              <span>
                {{ item[actiontitle] }}
              </span>
              <span>
                {{ item[actionsubtitle] }}
              </span>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider v-show="isDivider"></v-divider>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    border: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    subtitle: {
      type: String,
      default: () => {
        return "";
      },
    },
    actiontitle: {
      type: String,
      default: () => {
        return "";
      },
    },
    actionsubtitle: {
      type: String,
      default: () => {
        return "";
      },
    },
    divider: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  computed: {
    isWithBorder: function () {
      return this.border ? 2 : 0;
    },
    isDivider: function () {
      return this.divider;
    },
  },
  data: () => {
    return {};
  },
};
</script>

<style scoped>
.card {
  margin-block: 8px !important;
}

.main-content {
  margin-top: 8px !important;
  align-self: center;
}

.action-content {
  margin-top: 20px !important;
  align-self: center;
}

span {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
}
</style>
