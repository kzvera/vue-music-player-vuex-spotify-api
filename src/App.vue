<template>
  <div>
    <h1>Music Player</h1>
    <div class="musicContainer">   
      <app-track :track="currentTrack"></app-track>
      <app-controls></app-controls>
    </div>
  </div>
</template>

<script>
import AppControls from './components/Controls.vue';
import AppTrack from './components/Track.vue';

export default {
  components: {
    AppControls,
    AppTrack
  },
  computed: {
    currentTrack() {
      return this.$store.getters.currentTrack || {};
    }
  },
  created() {
    this.$store.dispatch('getTracks');
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

* {
  box-sizing: border-box;
}

body {
  background-image: linear-gradient(0deg, rgba(247,247,247,1) 23.8%, rgba(252,221,221,1) 92%);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Lato', sans-serif;
  margin: 0;
}

h1 {
  text-align: center;
}

.musicContainer {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 20px 20px 0 rgba(252, 169, 169, 0.6);
  display: flex;
  padding: 20px 30px;
  position: relative;
  margin: 100px 0;
  z-index: 10;

  &.play {
    .imageContainer img {
      animation-play-state: running;
    }

    .musicInfo {
      opacity: 1;
      transform: translateY(-100%);;
    }
  }
}


</style>