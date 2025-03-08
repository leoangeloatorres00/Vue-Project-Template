<template>
  <v-card>
    <v-card-text>
      <div class="editor-wrapper">
        <div class="element">
          <slot name="element"></slot>
        </div>

        <v-divider vertical class="editor-divider" />

        <div class="options">
          <h5>Options</h5>
          <div class="radio">
            <slot name="radio"></slot>
          </div>

          <div class="checkbox">
            <slot name="checkbox"></slot>
          </div>
        </div>
      </div>

      <v-divider class="source-divider" />

      <div class="source">
        <h5>Source Code</h5>
        <div>
          <div class="source-code">
            <slot name="source"></slot>
          </div>
          <Images class="copy" src="copy.webp" @click="onCopy" />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Images from "@/components/elements/image.vue";
import { copyText } from "@/utils/data";

export default {
  components: {
    Images,
  },
  methods: {
    onCopy() {
      const sourceCode = this.formatSourceCode();
      copyText(sourceCode);
    },
    formatSourceCode() {
      const attributes = [
        "type",
        "label",
        "lists",
        "rounded",
        "disabled",
        "outlined",
        "required",
        "placeholder",
      ];

      let element = document.querySelector(".source-code");
      let text = element.innerText;

      attributes.forEach((attribute) => {
        text = text.replaceAll(`${attribute}`, `~${attribute}`);
      });

      text = text.replaceAll(/\s/g, "").trim();

      return text.replaceAll("~", " ");
    },
  },
};
</script>

<style scoped>
.editor-wrapper {
  display: flex;
  align-items: center;
}

.editor-wrapper .element {
  width: 70%;
  padding-inline: 25px;
}

.editor-wrapper .editor-divider {
  margin-inline: 0px 30px;
}

.source-divider {
  margin-block: 20px;
}

.source > div {
  display: flex;
  justify-content: space-between;

  margin-top: 10px;
}

.copy >>> .image {
  width: 20px;
  height: 20px;
}

@media screen and (max-width: 700px) {
  .editor-wrapper {
    flex-direction: column;
  }

  .editor-wrapper .element {
    width: 100%;
    padding-inline: 0px;
    margin-bottom: 20px;
  }

  .editor-wrapper .checkbox {
    display: grid;
    grid-column-gap: 30px;
    grid-template-columns: auto auto;
  }
}
</style>
