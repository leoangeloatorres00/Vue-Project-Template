<template>
  <div class="container">
    <CardList
      :items="lists"
      title="transaction"
      actiontitle="amount"
      actionsubtitle="endingBalance"
    />

    <Button ref="btnBack" @click="onBack"> Return Home </Button>
  </div>
</template>

<script>
import { formatAmount } from "@/utils/data";

import Button from "@/components/Button.vue";
import CardList from "@/components/CardList.vue";

export default {
  components: {
    Button,
    CardList,
  },
  data: () => {
    return {
      items: [
        {
          transaction: "Withdraw",
          transactionDate: "January 01, 2025",
          amount: 10,
          endingBalance: 1020.13213215,
        },
        {
          transaction: "Deposit",
          transactionDate: "January 02, 2025",
          amount: 5.5,
          endingBalance: 105,
        },
      ],

      lists: [],
    };
  },
  mounted() {
    this.lists = this.items.map((item) => {
      item.amount = `PHP ${formatAmount(item.amount)}`;
      item.endingBalance = `PHP ${formatAmount(item.endingBalance)}`;

      return item;
    });
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.container {
  margin: 10px;
  padding: 10px;
}
</style>
