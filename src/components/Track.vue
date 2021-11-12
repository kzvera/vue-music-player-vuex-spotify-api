<template>
  <div class="musicInfo">

    <h4>{{ track.name || '' }}</h4>

    <div class="progressContainer" @click="updateProgressBar">
      <div class="progress" :style="progress"></div>
    </div>
  </div>

  <audio :src="track.audio" @timeupdate="updateProgress" class="audioElement"></audio>

  <div class="imageContainer">
    <img :src="track.image" :alt="`${track.name} Album Cover`">
  </div>

</template>

<script>
export default {
  props: ['track'],
  computed: {
    progress() {
      return { width: this.$store.getters.progress + '%' };
    }
  },
  methods: {
    updateProgress(e) {
      this.$store.dispatch('updateProgress', e);
    },
    updateProgressBar(e) {
      this.$store.dispatch('updateProgressBar', e);
    }
  }
  
}
</script>

<style lang="scss" scoped>
.musicInfo {
  background-color: rgba(#fff, 0.5);
  border-radius: 15px 15px 0 0;
  position: absolute;
  top: 0;
  left: 20px;
  width: calc(100% - 40px);
  padding: 10px 10px 10px 150px;
  opacity: 0;
  transform: translateY(0%);
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;
  z-index: 0;

  h4 {
    margin: 0;
  }
}

.progressContainer {
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  height: 4px;
  width: 100%;

  .progress {
    background-color: #fe8daa;
    border-radius: 5px;
    height: 100%;
    width: 0%;
    transition: width 0.1s linear;
  }
}

.imageContainer {
  position: relative;
  width: 110px;

  &::after {
    content: '';
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 20px;
    height: 20px;
    transform: translate(-50%, 50%);
  }

  img {
    border-radius: 50%;
    object-fit: cover;
    height: 110px;
    width: inherit;
    position: absolute;
    bottom: 0;
    left: 0;
    animation: rotate 3s linear infinite;
    animation-play-state: paused;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
}
</style>
