<template>
  <div class="player__wrapper">
    <CustomAudio
      :track="activeTrack"
      :track-state="trackState"
      class="player__controls"
      @next="nextTrack"
      @prev="prevTrack"
    />
    <div class="player__track-list">
      <SearchField @update="fetchTracks" />
      <TracksList
        :tracks="tracks"
        :active-index="activeIndex"
        :track-state="trackState"
        @pick="pickTrack"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Track } from "@/api/types/ApiTypes";
import TracksList from "@/components/audio-player/TracksList.vue";
import SearchField from "@/components/audio-player/SearchField.vue";
import CustomAudio from "@/components/audio-player/CustomAudio.vue";
import Api from "@/api/Api";
import { TrackState } from "@/components/audio-player/types/playerTypes";

const api = Api.getInstance();

@Component({
  components: { CustomAudio, SearchField, TracksList },
})
export default class AudioPlayer extends Vue {
  tracks: Track[] = [];
  trackState: TrackState = {
    playing: false,
    currentTime: 0,
    duration: 0,
  };
  activeIndex = -1;

  get activeTrack(): Track | null {
    if (this.activeIndex === -1) return null;
    return this.tracks[this.activeIndex];
  }

  pickTrack(index: number) {
    if (index === this.activeIndex) {
      this.trackState.playing = !this.trackState.playing;
    }
    this.activeIndex = index;
  }

  nextTrack() {
    if (this.activeIndex < this.tracks.length - 1) {
      this.activeIndex += 1;
    }
  }

  prevTrack() {
    if (this.activeIndex > 0) {
      this.activeIndex -= 1;
    }
  }

  fetchTracks(search: string) {
    api
      .searchTracksByName(search)
      .then((tracks) => {
        this.tracks = tracks;
        this.activeIndex = -1;
      })
      .catch(console.log);
  }
}
</script>

<style lang="scss">
.player {
  &__wrapper {
    background: rgb(18 108 146 / 80%);
    border-radius: 8px;
    display: flex;
    @media screen and (max-width: 900px) {
      flex-direction: column;
    }
  }
  &__controls {
    width: 500px;
    padding: 12px;
    @media screen and (max-width: 900px) {
      width: 100%;
    }
    @media screen and (max-width: 767px) {
      padding: 8px;
    }
  }
  &__track-list {
    position: relative;
    padding: 12px;
    flex: 1;
    @media screen and (max-width: 767px) {
      padding: 8px;
    }
  }
}
</style>
