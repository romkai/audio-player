<template>
  <div class="custom-audio__wrapper">
    <div class="custom-audio__poster-wrapper">
      <img class="custom-audio__poster" :src="posterSource" alt="#" />
    </div>

    <div class="custom-audio__info">
      <div class="custom-audio__info-track-name">
        <div>{{ trackName }}</div>
        <div>{{ progress }}</div>
      </div>
      <div class="custom-audio__info-artist-name">{{ artistName }}</div>
    </div>

    <div class="custom-audio__audio-wrapper">
      <div class="custom-audio__controls">
        <button
          type="button"
          class="icon custom-audio__controls-prev"
          @click="prev"
          :disabled="!track"
        >
          skip_previous
        </button>
        <button
          type="button"
          class="icon custom-audio__controls-play"
          @click="toggle"
          :disabled="!track"
        >
          {{
            trackState.playing ? "pause_circle_filled" : "play_circle_filled"
          }}
        </button>
        <button
          type="button"
          class="icon custom-audio__controls-next"
          @click="next"
          :disabled="!track"
        >
          skip_next
        </button>
      </div>

      <audio
        class="custom-audio__audio"
        ref="audio"
        :src="audioSource"
        controls
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import { Track } from "@/api/types/ApiTypes";
import getTime from "@/components/audio-player/helpers/getTime";
import { TrackState } from "@/components/audio-player/types/playerTypes";

@Component
export default class CustomAudio extends Vue {
  @Prop() private track!: Track | null;
  @Prop() private trackState!: TrackState;
  @Ref("audio") readonly audio!: HTMLAudioElement;

  // COMPUTED

  get audioSource() {
    return this.track?.preview;
  }

  get progress() {
    const { currentTime, duration } = this.trackState;
    return `${getTime(currentTime)}/${getTime(duration)}`;
  }

  get trackName() {
    return this.track?.title;
  }

  get artistName() {
    return this.track?.artist.name;
  }

  get posterSource() {
    return this.track
      ? this.track.album.cover_big
      : require("@/assets/images/track-background.jpg");
  }

  // HOOKS

  mounted() {
    this.audio.addEventListener("ended", this.onEnded);
    this.audio.addEventListener("pause", this.onPause);
    this.audio.addEventListener("play", this.onPlay);
    this.audio.addEventListener("timeupdate", this.onTimeUpdate);
  }

  beforeDestroy() {
    this.audio.removeEventListener("ended", this.onEnded);
    this.audio.removeEventListener("pause", this.onPause);
    this.audio.removeEventListener("play", this.onPlay);
    this.audio.removeEventListener("timeupdate", this.onTimeUpdate);
  }

  // AUDIO EVENTS

  onEnded() {
    this.trackState.playing = false;
    this.next();
  }

  onPlay() {
    this.trackState.playing = true;
  }

  onPause() {
    this.trackState.playing = false;
  }

  onTimeUpdate() {
    this.trackState.currentTime = this.audio.currentTime;
    this.trackState.duration = this.audio.duration;
  }

  // ACTIONS

  async play() {
    await this.$nextTick();
    await this.audio.play();
  }

  async pause() {
    await this.$nextTick();
    await this.audio.pause();
  }

  toggle() {
    if (this.trackState.playing) this.pause();
    else this.play();
  }

  prev() {
    this.$emit("prev");
  }

  next() {
    this.$emit("next");
  }

  // WATCHERS

  @Watch("track")
  onTrackChange() {
    if (this.track) {
      this.play();
    }
  }

  @Watch("trackState.playing")
  onTrackStatePlayingChange() {
    if (this.trackState.playing) {
      this.play();
    } else {
      this.pause();
    }
  }
}
</script>

<style lang="scss">
.custom-audio {
  &__wrapper {
  }
  &__poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 8px;
    &-wrapper {
      padding-top: 100%;
      position: relative;
    }
  }
  &__info {
    color: #fff;
    margin-top: 12px;
    padding: 0 24px;
    height: 51px;
    @media screen and (max-width: 767px) {
      padding: 0 12px;
    }
    &-track-name {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 24px;
      font-weight: 700;
      div:first-child {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 12px;
      }
      div:last-child {
        font-size: 18px;
        font-weight: 300;
      }
    }
    &-artist-name {
      font-size: 18px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 12px;
    }
  }
  &__audio-wrapper {
    position: relative;
    display: flex;
    margin-top: 12px;
  }
  &__controls {
    position: absolute;
    top: 50%;
    left: 12px;
    z-index: 2;
    transform: translateY(-50%);
    display: flex;
    &-play {
      &.icon {
        font-size: 42px;
      }
    }
    button {
      border: none;
      cursor: pointer;
      background: transparent;
      &:disabled {
        cursor: default;
      }
    }
  }
  &__audio {
    width: 100%;
    &::-webkit-media-controls-panel {
      background: #9ed1ea;
    }
    &::-webkit-media-controls-play-button,
    &::-webkit-media-controls-time-remaining-display,
    &::-webkit-media-controls-current-time-display {
      display: none !important;
      -webkit-appearance: none;
    }
    &::-webkit-media-controls-timeline {
      margin-left: 100px;
    }
  }
}
</style>
