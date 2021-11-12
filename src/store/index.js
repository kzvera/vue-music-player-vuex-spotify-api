import { createStore } from 'vuex'

export default createStore({
  state: {
    tracks: [],
    currentTrack: null,
    currentIndex: null,
    isPlaying: false,
    progress: null
  },
  mutations: {
    setTracks(state, payload) {
      // console.log(payload);
      state.tracks = payload;
      // console.log(state);
    },
    setRandomIndex(state) {
      state.currentIndex = Math.floor(Math.random() * (state.tracks.length - 1));
    },
    setCurrentTrack(state) {
      state.currentTrack = state.tracks[state.currentIndex];
      console.log('setCurrentTrack', state);
    },
    playTrack(state) {
      state.isPlaying = true;
    },
    pauseTrack(state) {
      state.isPlaying = false;
    },
    setPrevTrack(state) {
      state.progress = 0;
      if (state.currentIndex <= 0) {
        state.currentIndex = (state.tracks.length - 1);
      } else {
        state.currentIndex = state.currentIndex - 1;
      }
    },
    setNextTrack(state) {
      state.progress = 0;
      if (state.currentIndex >= state.tracks.length - 1) {
        state.currentIndex = 0;
      } else {
        state.currentIndex = state.currentIndex + 1;
      }
    },
    updateProgress(state, payload) {
      state.progress = payload;
    }
  },
  actions: {
    async getTracks(context) {
      const token = 'BQBInSwFxiya6aN_ob76quKLM7Pr9ZSBUrb6Pf3ryxGiqlUS-k0KSu6sGohECZvZLnhREhIJwvzkoeqPAKZgVkcdcdCOgUQNVeagN2P81b9oMr3inEqS1AM3hCdU0ZR178PVcFOscqBCrOQe';

      const res = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });

      const data = await res.json();

      const tracks = [];

      for (const key in data.tracks.items) {
        if (data.tracks.items[key].track.preview_url !== null) {
          const track = {
            id: data.tracks.items[key].track.id,
            name: data.tracks.items[key].track.name,
            image: data.tracks.items[key].track.album.images[0].url,
            audio: data.tracks.items[key].track.preview_url
          }

          tracks.push(track);
        }
      }

      context.commit('setTracks', tracks);
      context.dispatch('getRandomIndex');
      context.dispatch('setCurrentTrack');

      console.log(data);
    },
    setCurrentTrack(context) {
      context.commit('setCurrentTrack');
    },
    getRandomIndex(context) {
      // generate a random number between 0 - 49 to get a random song from the list
      context.commit('setRandomIndex');
    },
    playTrack(context) {
      // Optimize with pauseTrack into a single function
      const musicContainer = document.querySelector('.musicContainer');
      const audioElement = document.querySelector('.audioElement');
      musicContainer.classList.add('play');
      
      // const playing = await audioElement.play();
      audioElement.play();

      context.commit('playTrack');
    },
    pauseTrack(context) {
      // Optimize with playTrack into a single function
      const musicContainer = document.querySelector('.musicContainer');
      const audioElement = document.querySelector('.audioElement');
      musicContainer.classList.remove('play');
      audioElement.pause();

      context.commit('pauseTrack');
    },
    async nextTrack(context) {
      context.commit('setNextTrack');
      await context.dispatch('setCurrentTrack');
      await context.dispatch('pauseTrack');
      await context.dispatch('playTrack');
    },
    async prevTrack(context) {
      context.commit('setPrevTrack');
      await context.dispatch('setCurrentTrack');
      await context.dispatch('pauseTrack');
      await context.dispatch('playTrack');
    },
    updateProgress(context, payload) {
      const { duration, currentTime } = payload.srcElement;
      const progressPercent = ((currentTime / duration) * 100).toFixed();

      context.commit('updateProgress', progressPercent);

      if (progressPercent >= 100) {
        context.dispatch('pauseTrack');
      }
    },
    updateProgressBar(_, payload) {
      const audioElement = document.querySelector('.audioElement');
      const width = payload.target.clientWidth;
      const clickX = payload.offsetX;
      const duration = audioElement.duration;

      audioElement.currentTime = ((clickX / width) * duration).toFixed();
    }
  },
  getters: {
    tracks(state) {
      return state.tracks;
    },
    currentIndex(state) {
      return state.currentIndex;
    },
    currentTrack(state) {
      return state.currentTrack;
    },
    isPlaying(state) {
      return state.isPlaying;
    },
    progress(state) {
      return state.progress;
    }
  }
})
