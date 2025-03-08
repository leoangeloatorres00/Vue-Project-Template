<template>
  <div class="wrapper">
    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main @scroll="onScroll">
        <slot name="content"></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      event: {},
    };
  },
  methods: {
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      const event = { scrollTop, clientHeight, scrollHeight };
      localStorage.setItem("scroll", JSON.stringify(event));

      window.dispatchEvent(
        new CustomEvent("scroll", {
          detail: localStorage.getItem("scroll"),
        })
      );
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden !important;
}

.wrapper {
  height: 100vh;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-self: center;
}

main {
  flex: 1;
  overflow: auto;
  padding: 20px;
}

footer {
  padding: 20px;
}

@media screen and (min-width: 1024px) {
  .container {
    width: 1024px;
  }
}
</style>
