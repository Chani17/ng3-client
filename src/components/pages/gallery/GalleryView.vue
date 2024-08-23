<template>
  <div class="gallery-container">
    <div class="curtain curtain-left"/>
    <div class="curtain curtain-right"/>
    <div class="gallery-stage">
      <p class="gallery-name">
        <!-- 여기에 사용자 이름 위치 --> {{username}}님의 명예의 전당</p>
      <div class="gallery-slide">
        <button class="gallery-nav-button left" @click="scrollLeft" v-if="currentIndex > 0"><span class="gallery-arrow left"></span></button>
        <div class="gallery-grid">
          <div class="gallery-item" v-for="(image, index) in currentItems" :key="index">
            <!-- 그림 위치 --><img :src="image.src" alt="Image"/>
            <div class="image-info">
              <!-- 제시어 위치 -->
              <!-- 좋아요 위치 -->
            </div>
          </div>
        </div>
        <button class="gallery-nav-button right" @click="scrollRight" v-if="currentIndex + itemsPerPage < images.length"><span class="gallery-arrow right"></span></button>
      </div>
    </div>
    <div class="stage-steps">
      <div class="step step1">
        <div class="tread"/>
        <div class="riser"/>
      </div>
      <div class="step step2">
        <div class="tread"/>
        <div class="riser"/>
      </div>
      <div class="step step3">
        <div class="tread"/>
        <div class="riser"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GalleryView.vue",
  data() {
    return {
      images: [
        { src: require('@/assets/logo.png'), caption: 'Sunset', likes: 10 },
        { src: require('@/assets/logo.png'), caption: 'Drawing', likes: 5 },
        { src: require('@/assets/logo.png'), caption: 'Mountain', likes: 12 },
        { src: require('@/assets/logo.png'), caption: 'Beach', likes: 8 },
        { src: require('@/assets/logo.png'), caption: 'Forest', likes: 7 },
        { src: require('@/assets/logo.png'), caption: 'Logo', likes: 3 },
        { src: require('@/assets/logo.png'), caption: 'River', likes: 15 },
        { src: require('@/assets/logo.png'), caption: 'City', likes: 6 }
      ],
      currentIndex: 0,
      itemsPerPage: 3
    }
  },
  computed: {
    currentItems() {
      return this.images.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
    }
  },
  methods: {
    scrollLeft() {
      if(this.currentIndex > 0) {
        this.currentIndex -= this.itemsPerPage;
      }
    },
    scrollRight() {
      if(this.currentIndex + this.itemsPerPage < this.images.length) {
        this.currentIndex += this.itemsPerPage;
      }
    }
  }
}
</script>

<style scoped>
.gallery-container {
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.curtain {
  width: 50%;
  height: 100%;
  background-color: darkred;
  position: absolute;
  top: 0;
  z-index: 1;
  background: linear-gradient(to right, #8B0000 25%, #B22222 50%, #8B0000 75%);
  box-shadow: inset -10px 0 20px rgba(0, 0, 0, 0.5), inset 10px 0 20px rgba(0, 0, 0, 0.5);
}

.curtain-left {
  left: 0;
  animation: curtainSlideLeft 2s forwards;
}

.curtain-right {
  right: 0;
  animation: curtainSlideRight 2s forwards;
}

@keyframes curtainSlideLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-55%);
  }
}

@keyframes curtainSlideRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(55%);
  }
}

.gallery-stage {
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 53%;
  height: 70%;
  background-color: white;
  border: 10px solid goldenrod;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.gallery-name {
  font-family: serif;
  font-weight: bold;
  font-size: x-large;
  color: goldenrod;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.gallery-slide {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  place-items: center;
}

.gallery-item {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 250px;
  height: 300px;
  overflow: hidden;
}

.gallery-item img {
  max-width: 100%;
  max-height: 100%;
}

.gallery-nav-button {
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: background 0.3s, box-shadow 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-nav-button:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.gallery-nav-button.left {
  left: 10px;
}

.gallery-nav-button.right {
  right: 10px;
}

.gallery-arrow {
  width: 0;
  height: 0;
  border-style: solid;
}

.gallery-arrow.left {
  border-width: 10px 15px 10px 0;
  border-color: transparent #000 transparent transparent;
}

.gallery-arrow.right {
  border-width: 10px 0 10px 15px;
  border-color: transparent transparent transparent #000;
}

.stage-steps {
  position: absolute;
  bottom: -20px;
  width: 50%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step {
  height: 20px;
  position: relative;
  margin-bottom: 10px;
}

.step1 { width: 60%; }

.step2 { width: 70%; }

.step3 { width: 80%; }

.tread {
  height: 20px;
  background-color: gray;
  position: absolute;
  bottom: 10px;
  width: 100%;
  z-index: 0;
  clip-path: polygon(7% 0%, 93% 0%, 100% 100%, 0% 100%);
}

.riser {
  height: 10px;
  background-color: dimgray;
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 0;
}

.tread:after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 100%;
  background-color: red;
  clip-path: inherit;
}

.riser:after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 100%;
  background-color: darkred;
}

</style>