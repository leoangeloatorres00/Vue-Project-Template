<template>
  <div class="splashscreen-container">
    <div class="splashscreen-wrapper">
      <Layout>
        <template v-slot:content>
          <div class="logo">
            <v-img src="@/assets/images/eC_White_Reverse.webp"></v-img>
          </div>
        </template>
      </Layout>
    </div>
  </div>
</template>

<script>
import Layout from "@/layouts/index";

import { lazyLoadImage } from "@/utils";

export default {
  components: {
    Layout,
  },
  data: () => {
    return {
      logo: "",
    };
  },
  mounted() {
    var splashscreenWrapper = document.querySelector(".splashscreen-wrapper");
    splashscreenWrapper.style.setProperty(
      "--background",
      `url(${lazyLoadImage("splashscreen_background.webp")})`
    );

    this.logo = lazyLoadImage("eC_White_Reverse.webp");
  },
};
</script>

<style></style>

<style scoped>
.splashscreen-container {
  display: flex;
  justify-content: center;
}

.splashscreen-wrapper {
  width: 1024px;
  height: 100vh;

  background-image: radial-gradient(
    182.92% 205.47% at 120.27% -19.31%,
    #48b3ff 9.62%,
    #021420 99.56%
  );
}

.splashscreen-wrapper:after {
  mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  content: "";
  position: absolute;
  width: 100%;
  height: 45%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: var(--background);
  background-size: cover;
  background-position: center;
}

.splashscreen-wrapper >>> main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.splashscreen-wrapper >>> main > div {
  width: 300px;
}
</style>
