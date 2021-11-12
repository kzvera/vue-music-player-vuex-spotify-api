<template>
    <div class="navigation">
        <button class="actionBtn actionBtn__prev" @click="prevTrack">
            <font-awesome-icon icon="backward" />
        </button>
        <button class="actionBtn actionBtn__play" @click="playTrack">
            <font-awesome-icon icon="pause" v-if="isPlaying" />
            <font-awesome-icon icon="play" v-else />
        </button>
        <button class="actionBtn actionBtn__next" @click="nextTrack">
            <font-awesome-icon icon="forward" />
        </button>
    </div>
</template>

<script>
export default {
    computed: {
        isPlaying() {
            return this.$store.getters.isPlaying;
        }
    },
    methods: {
        playTrack() {
            if (this.isPlaying) {
                this.$store.dispatch('pauseTrack');
            } else {
                this.$store.dispatch('playTrack');
            }
        },
        nextTrack() {
            this.$store.dispatch('nextTrack');
        },
        prevTrack() {
            this.$store.dispatch('prevTrack');
        }
    }
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.actionBtn {
  background-color: #fff;
  border: 0;
  color: #dfdbdf;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  margin: 0 20px;

  &__play {
    color: #cdc2d0;
    font-size: 30px;
  }
}
</style>