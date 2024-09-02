<!-- 한수민: 갤러리 페이지 컴포넌트 구현 -->
<template>
  <div class="gallery-container">
    <div class="curtain curtain-left" />
    <div class="curtain curtain-right" />
    <div class="light light-left" />
    <div class="light light-right" />
    <div class="gallery-stage">
      <p class="gallery-name">
        <img src="@/assets/image/honor.png" alt="honor" />
      </p>
      <div class="gallery-slide">
        <button
          class="gallery-nav-button left"
          @click="scrollLeft"
          v-if="currentIndex > 0"
        >
          <span class="gallery-arrow left"></span>
        </button>
        <div class="gallery-grid">
          <div
            class="gallery-item"
            v-for="(image, index) in safeCurrentItems"
            :key="index"
            :class="getMedal(currentIndex + index)"
          >
            <div class="medal" v-if="currentIndex + index < 3"></div>
            <div class="image-frame">
              <!-- 그림 위치 --><img :src="image.url" alt="Image" />
            </div>
            <div class="image-info">
              <!-- 제시어 위치 -->
              <p class="image-caption">{{ image.title }}</p>
              <!-- 좋아요 위치 --><button
                class="image-likes"
                @click="imageLike(image)"
                v-if="!isUserGallery"
              >
                <span class="heart" :class="{ liked: isLiked(image.id) }"></span
                >{{ image.likeCount }}
              </button>
            </div>
          </div>
        </div>
        <button
          class="gallery-nav-button right"
          @click="scrollRight"
          v-if="currentIndex + itemsPerPage < images.length"
        >
          <span class="gallery-arrow right"></span>
        </button>
      </div>
    </div>
    <div class="stage-steps">
      <div class="step step1">
        <div class="tread" />
        <div class="riser" />
      </div>
      <div class="step step2">
        <div class="tread" />
        <div class="riser" />
      </div>
      <div class="step step3">
        <div class="tread" />
        <div class="riser" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'GalleryView',
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['currentIndex', 'isUserGallery', 'itemsPerPage']),
    ...mapGetters(['currentItems', 'getLoginUserId', 'isLiked']),
    safeCurrentItems() {
      return this.currentItems || [];
    },
    images() {
      return this.$store.state.images || [];
    },
  },
  methods: {
    ...mapActions(['scrollLeft', 'scrollRight']),
    getMedal(index) {
      if (index === 0) return 'gold-medal';
      if (index === 1) return 'silver-medal';
      if (index === 2) return 'bronze-medal';
      return '';
    },
    async imageLike(image) {
      const userId = this.getLoginUserId;
      const isLiked = this.isLiked(image.id);

      try {
        let likeCount;
        if (isLiked) {
          // 좋아요 취소
          const response = await axios.delete(
            `http://nggg.com:8080/${image.id}/likes`,
            {
              params: { userId },
            }
          );
          likeCount = response.data;
        } else {
          // 좋아요
          const response = await axios.post(
            `http://nggg.com:8080/${image.id}/likes`,
            null,
            {
              params: { userId },
            }
          );
          likeCount = response.data;
        }

        // 상태 업데이트
        this.$store.commit('updateLikeCount', { imageId: image.id, likeCount });
        this.$store.commit('setLikeStatus', {
          imageId: image.id,
          liked: !isLiked,
        });
      } catch (error) {
        console.error('좋아요 요청 오류:', error);
      }
    },

    // [김찬희] : 저장되어 있는 이미지들 가져오기
    async fetchImages(userId) {
      try {
        // 이미지 데이터를 먼저 가져옴
        const response = await axios.get(
          `http://nggg.com:8080/${userId}/images`
        );

        const images = response.data;

        // Vuex에 이미지 데이터를 저장
        this.$store.commit('setImages', images);

        // 모든 이미지의 ID 수집
        const imageIds = images.map((image) => image.id);

        // 모든 이미지에 대한 좋아요 상태를 한 번에 확인
        const likedResponses = await axios.get(
          `http://nggg.com:8080/${userId}/images/liked`,
          {
            params: { imageIds: imageIds.join(',') },
          }
        );

        likedResponses.data.forEach((likeStatus) => {
          this.$store.commit('setLikeStatus', {
            imageId: likeStatus.imageId,
            liked: likeStatus.liked,
          });
        });
      } catch (error) {
        console.error('이미지 로드 실패', error.message); // 에러 메시지 출력
        // 추가적인 에러 처리 로직 필요 시 여기에 추가
      }
    },
  },
  watch: {
    userId: {
      immediate: true,
      handler(newUserId) {
        this.fetchImages(newUserId);
      },
    },
  },
};
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
  background: linear-gradient(to right, #8b0000 25%, #b22222 50%, #8b0000 75%);
  box-shadow: inset -10px 0 20px rgba(0, 0, 0, 0.5),
    inset 10px 0 20px rgba(0, 0, 0, 0.5);
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

.light {
  position: absolute;
  top: 10px;
  width: 150px;
  height: 150px;
  z-index: 2;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  filter: drop-shadow(0 0 60px rgba(255, 255, 255, 0.6));
  pointer-events: none;
}

.light-left {
  left: 10%;
  transform: rotate(-15deg);
}

.light-right {
  right: 10%;
  transform: rotate(15deg);
}

.gallery-stage {
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 53%;
  height: 70%;
  background-color: snow;
  border: 10px solid goldenrod;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
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
  width: 250px;
  height: 450px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-frame {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 250px;
  height: 300px;
  overflow: hidden;
}

.image-frame img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.image-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 10px;
  bottom: 0;
  position: relative;
  box-sizing: border-box;
  margin-top: 10px;
}

.image-caption {
  font-size: 14px;
  color: #333;
  margin: 0;
}

.image-likes {
  background: none;
  border: none;
  color: black;
  font-size: 16px;
  cursor: pointer;
}

.heart::before {
  content: '🤍';
}

.heart.liked::before {
  content: '❤️';
}

.gold-medal .image-frame {
  border: 5px solid #ffd700;
}

.silver-medal .image-frame {
  border: 5px solid #c0c0c0;
}

.bronze-medal .image-frame {
  border: 5px solid #cd7f32;
}

.medal {
  position: relative;
  top: -10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 20px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.gold-medal .medal {
  background: radial-gradient(
    circle at center,
    #ffd700,
    gold
  ); /* 금속 질감의 그라데이션 */
  border: 3px solid gold; /* 약간 어두운 금색 테두리 */
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.8); /* 금색의 부드러운 그림자 */
}

.silver-medal .medal {
  background: radial-gradient(
    circle at center,
    #c0c0c0,
    #a9a9a9
  ); /* 금속 질감의 그라데이션 */
  border: 3px solid #b0b0b0; /* 약간 어두운 은색 테두리 */
  box-shadow: 0 0 15px rgba(192, 192, 192, 0.8); /* 은색의 부드러운 그림자 */
}

.bronze-medal .medal {
  background: radial-gradient(
    circle at center,
    #cd7f32,
    #b57d3d
  ); /* 금속 질감의 그라데이션 */
  border: 3px solid #b07d3d; /* 약간 어두운 청동색 테두리 */
  box-shadow: 0 0 15px rgba(205, 127, 50, 0.8); /* 청동색의 부드러운 그림자 */
}

.medal::before {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.gold-medal .medal::before {
  content: '1';
}

.silver-medal .medal::before {
  content: '2';
}

.bronze-medal .medal::before {
  content: '3';
}

.gallery-nav-button {
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: absolute;
  z-index: 1;
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

.step1 {
  width: 60%;
}

.step2 {
  width: 70%;
}

.step3 {
  width: 80%;
}

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
  background-color: firebrick;
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

@media (max-width: 768px) {
  .gallery-stage {
    width: 90%;
    height: 80%;
    border-width: 5px;
  }

  .gallery-name {
    font-size: 1.5rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
  }

  .gallery-item img {
    max-height: 150px;
  }

  .image-caption {
    font-size: 0.9rem;
  }

  .image-likes {
    font-size: 0.9rem;
  }

  .gallery-nav-button {
    width: 30px;
    height: 30px;
  }

  .gallery-arrow.left,
  .gallery-arrow.right {
    border-width: 7px 10px 7px 0;
  }
}
</style>
