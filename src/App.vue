<template>
  <div class="container">
    <AudioPlayer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AudioPlayer from "./components/audio-player/AudioPlayer.vue";

@Component({
  components: {
    AudioPlayer,
  },
})
export default class App extends Vue {}
</script>
