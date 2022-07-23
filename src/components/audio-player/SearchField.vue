<template>
  <div class="player-search__wrapper">
    <input
      v-model="search"
      type="text"
      class="player-search__input"
      placeholder="Search for artists or tracks"
      @keypress.enter="find"
    />
    <button
      v-show="search"
      type="button"
      class="icon player-search__clear"
      @click="search = ''"
    >
      clear
    </button>
    <button type="button" class="icon player-search__find" @click="find">
      search
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SearchField extends Vue {
  search = "Romantic";

  mounted() {
    this.find();
  }

  find() {
    const correctSearch = this.search.trim();
    if (correctSearch.length < 3) return;

    this.$emit("update", correctSearch);
  }
}
</script>

<style lang="scss">
.player-search {
  &__wrapper {
    position: relative;
  }
  &__input {
    height: 36px;
    width: 100%;
    border: 1px solid rgb(18 108 146);
    border-radius: 8px;
    background: rgb(18 108 146 / 60%);
    color: #fff;
    padding: 0 28px 0 4px;
    font-size: 14px;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #dadada;
    }
  }
  &__clear {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 38px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    &.icon {
      font-size: 14px;
    }
  }
  &__find {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    &.icon {
      font-size: 20px;
    }
  }
}
</style>
