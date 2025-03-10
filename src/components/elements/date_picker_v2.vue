<template>
  <div class="datepicker-container">
    <div class="textfield-wrapper">
      <TextField
        ref="fromDate"
        label="From"
        class="fromDate"
        readonly
        :required="false"
        :disabled="disabled"
        @click="onClick('from')"
      />

      <TextField
        ref="toDate"
        label="To"
        class="toDate"
        readonly
        :required="false"
        :disabled="disabled"
        @click="onClick('to')"
      />
    </div>
    <BottomSheet ref="bottomsheet">
      <div class="datepicker-wrapper">
        <Layout>
          <template v-slot:header>
            <h2>Set specific period</h2>
            <div class="date-label-wrapper">
              <p>{{ fromDateLabel }}</p>
              <p>&nbsp;-&nbsp;</p>
              <p>{{ toDateLabel }}</p>
            </div>
            <v-divider />
          </template>
          <template v-slot:content>
            <v-date-picker
              ref="datepicker"
              range
              full-width
              v-model="value"
              :allowed-dates="allowedDates"
            />
          </template>
          <template v-slot:footer>
            <div class="button-container">
              <div class="button-wrapper">
                <Button
                  rounded
                  :disabled="!isClearEnable"
                  @click="onResetFilter"
                >
                  Clear
                </Button>
              </div>
              <div class="button-wrapper">
                <Button
                  type="secondary"
                  rounded
                  :disabled="!isSaveEnable"
                  @click="onApplyFilter"
                >
                  Save
                </Button>
              </div>
            </div>
          </template>
        </Layout>
      </div>
    </BottomSheet>
  </div>
</template>

<script>
import {
  lazyLoad,
  observeInput,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "@/utils";

export default {
  components: {
    Layout: lazyLoad("index", "layout"),
    Button: lazyLoad("button", "component"),
    TextField: lazyLoad("text_field", "component"),
    BottomSheet: lazyLoad("bottom_sheet", "component"),
  },
  props: {
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data: () => {
    return {
      value: [],

      toDate: "",
      fromDate: "",
      isDatePicker: "",
    };
  },
  mounted() {
    const fromDate = getLocalStorage("fromDate");
    const toDate = getLocalStorage("toDate");

    if (fromDate != null) {
      this.$refs.fromDate.value = fromDate;
    }

    if (toDate != null) {
      this.$refs.toDate.value = toDate;
    }
  },
  computed: {
    bottomsheet() {
      return this.$refs.bottomsheet;
    },
    datepicker() {
      return this.$refs.datepicker;
    },
    fromDateLabel() {
      return this.fromDate == "" || this.fromDate == undefined
        ? "From Date"
        : this.fromDate;
    },
    toDateLabel() {
      return this.toDate == "" || this.toDate == undefined
        ? "To Date"
        : this.toDate;
    },
    isClearEnable() {
      return this.toDate != "" || this.fromDate != "";
    },
    isSaveEnable() {
      return this.toDate != "" || this.fromDate != "";
    },
  },
  methods: {
    onClick(isDatePicker) {
      this.bottomsheet.show = true;
      this.isDatePicker = isDatePicker;

      const self = this;
      setTimeout(() => {
        observeInput(self.datepicker, self.onDatePicker);
      }, 500);
    },
    onResetFilter() {
      this.value = [];

      this.toDate = "";
      this.fromDate = "";

      removeLocalStorage("toDate");
      removeLocalStorage("fromDate");

      this.$refs.toDate.value = "";
      this.$refs.fromDate.value = "";
    },
    onApplyFilter() {
      if (this.isDatePicker == "from") {
        setLocalStorage("fromDate", this.fromDate);
        this.$refs.fromDate.value = this.fromDate;
      }

      if (this.isDatePicker == "to") {
        setLocalStorage("toDate", this.toDate);
        this.$refs.toDate.value = this.toDate;
      }

      this.bottomsheet.show = false;
    },
    onDatePicker() {
      const dates = this.value;

      if (this.isDatePicker == "from") {
        if (dates.length == 1 && this.toDate == "") {
          this.fromDate = dates[0];
          return;
        }

        if (dates.length == 2 && this.toDate == "") {
          this.fromDate = dates[1];
          dates.splice(0, 1);
          return;
        }

        if (dates.length == 1 && this.fromDate != dates[0]) {
          this.fromDate = dates[0];
          this.value = [this.fromDate, this.toDate];
          return;
        }

        if (dates.length == 2 && this.toDate == dates[0]) {
          this.fromDate = dates[1];
          this.value = [this.fromDate, this.toDate];
          return;
        }
      }

      if (this.isDatePicker == "to") {
        if (dates.length == 1 && this.fromDate == "") {
          this.toDate = dates[0];
          return;
        }

        if (dates.length == 2 && this.fromDate == "") {
          this.toDate = dates[1];
          dates.splice(0, 1);
          return;
        }

        if (dates.length == 1 && this.fromDate != dates[0]) {
          this.toDate = dates[0];
          this.value = [this.fromDate, this.toDate];
          return;
        }

        this.toDate = dates[1];
      }
    },
    allowedDates(value) {
      if (this.isDatePicker == "to" && this.fromDate != "") {
        return this.fromDate <= value && value <= this.dateToday();
      }

      if (this.isDatePicker == "from" && this.toDate != "") {
        return value <= this.toDate;
      }

      return value <= this.dateToday();
    },
    dateToday() {
      const date = new Date();
      return this.getFormatDate(date);
    },
    getFormatDate(date) {
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const year = date.getFullYear();

      return year + "-" + month + "-" + day;
    },
  },
};
</script>

<style>
.datepicker-wrapper .v-picker__title {
  display: none;
}

.datepicker-wrapper .accent,
.datepicker-wrapper .accent--text {
  color: var(--input-text-primary) !important;
}

.datepicker-wrapper main {
  margin-top: 20px;
}
</style>

<style scoped>
.datepicker-container {
  margin-inline: 10px;
}

.button-container,
.textfield-wrapper {
  display: flex;

  gap: 10px;
}

.date-label-wrapper {
  display: flex;
  justify-content: center;

  margin-top: 10px;
}

.datepicker-wrapper footer .button-wrapper {
  width: 50%;
}
</style>
