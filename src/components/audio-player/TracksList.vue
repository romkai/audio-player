<template>
  <div class="track-list__wrapper custom-scroll">
    <div
      v-for="(track, index) in tracks"
      :key="track.id"
      class="track-list__item"
      :class="{
        'track-list__item--active': index === activeIndex,
        'track-list__item--playing':
          index === activeIndex && trackState.playing,
      }"
      @click="$emit('pick', index)"
    >
      <div class="track-list__item-preview-wrapper">
        <img
          class="track-list__item-preview-image"
          :src="track.album.cover_small"
          :alt="track.title + ' preview'"
        />
        <span class="icon track-list__item-preview-play">
          play_circle_filled
        </span>
        <span class="icon track-list__item-preview-pause">
          pause_circle_filled
        </span>
      </div>
      <div class="track-list__item-info">
        <div class="track-list__item-info-track-name">
          <div>{{ track.title }}</div>
          <div>{{ getTrackDuration(index) }}</div>
        </div>
        <div class="track-list__item-info-artist-name">
          {{ track.artist.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Track } from "@/api/types/ApiTypes";
import getTime from "./helpers/getTime";
import { TrackState } from "@/components/audio-player/types/playerTypes";

@Component
export default class TracksList extends Vue {
  @Prop() private tracks!: Track[];
  @Prop() private activeIndex!: number;
  @Prop() private trackState!: TrackState;

  getTrackDuration(index: number) {
    const seconds =
      index === this.activeIndex
        ? this.trackState.currentTime
        : this.tracks[index].duration;
    return getTime(seconds);
  }
}
</script>

<style lang="scss">
.track-list {
  &__wrapper {
    position: absolute;
    top: 65px;
    left: 12px;
    right: 12px;
    bottom: 12px;
    overflow: hidden;
    overflow-y: auto;
    padding-right: 4px;
    @media screen and (max-width: 900px) {
      margin-top: 16px;
      position: static;
    }
  }
  &__item-preview {
    &-wrapper {
      position: relative;
      margin-right: 8px;
      width: 50px;
      height: 50px;
      .icon {
        opacity: 0;
        color: #e5e2e2;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        transition: all 300ms;
      }
    }
    &-image {
      border-radius: 4px;
      width: 100%;
      height: 100%;
    }
  }
  &__item {
    display: flex;
    width: 100%;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    &:hover {
      background: rgb(18 108 146 / 30%);
      .track-list__item-preview-image {
        filter: brightness(0.5);
      }
    }
    &:hover:not(.track-list__item--active) {
      .track-list__item-preview-play {
        opacity: 1;
      }
    }
    &--active {
      background: rgb(18 108 146 / 20%);
      .track-list__item-preview-image {
        filter: brightness(0.5);
      }
      .track-list__item-preview-play {
        opacity: 1;
      }
      .track-list__item-info-track-name {
        div:last-child {
          color: aqua;
        }
      }
    }
    &--playing {
      .track-list__item-preview-pause {
        opacity: 1;
      }
      .track-list__item-preview-play {
        opacity: 0;
      }
    }
    &:not(:last-child) {
      margin-bottom: 4px;
    }
    &-info {
      margin-top: 8px;
      color: #fff;
      flex: 1;
      overflow: hidden;
      padding-right: 4px;
      &-track-name {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 700;
        div:first-child {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-right: 12px;
        }
        div:last-child {
          font-size: 14px;
          font-weight: 300;
        }
      }
      &-artist-name {
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 36px;
      }
    }
  }
}
</style>
