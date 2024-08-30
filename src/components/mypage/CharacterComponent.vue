<template>
  <div class="temp_border">
    <div class="customizing">
      <button class="customButton saveBtn" @click="save">SAVE</button>
      <button class="customButton returnBtn" @click="returnToPrevious">
        return
      </button>
      <div class="customList">
        <!-- Hair -->
        <div class="customIcon">
          <button class="leftBtn" @click="changeComponent('hair', -1)">
            ◀
          </button>
          <img src="@/assets/image/hair.png" alt="" />
          <button class="rightBtn" @click="changeComponent('hair', 1)">
            ▶
          </button>
        </div>

        <!-- Eyes -->
        <div class="customIcon">
          <button class="leftBtn" @click="changeComponent('eyes', -1)">
            ◀
          </button>
          <img src="@/assets/image/eyes.png" alt="" />
          <button class="rightBtn" @click="changeComponent('eyes', 1)">
            ▶
          </button>
        </div>

        <!-- Mouth -->
        <div class="customIcon">
          <button class="leftBtn" @click="changeComponent('mouth', -1)">
            ◀
          </button>
          <img src="@/assets/image/mouth.png" alt="" />
          <button class="rightBtn" @click="changeComponent('mouth', 1)">
            ▶
          </button>
        </div>

        <!-- Clothes -->
        <div class="customIcon">
          <button class="leftBtn" @click="changeComponent('clothes', -1)">
            ◀
          </button>
          <img src="@/assets/image/clothes.png" alt="" />
          <button class="rightBtn" @click="changeComponent('clothes', 1)">
            ▶
          </button>
        </div>

        <!-- Shoes -->
        <div class="customIcon">
          <button class="leftBtn" @click="changeComponent('shoes', -1)">
            ◀
          </button>
          <img src="@/assets/image/shoes.png" alt="" />
          <button class="rightBtn" @click="changeComponent('shoes', 1)">
            ▶
          </button>
        </div>
      </div>
    </div>
    <div class="base_character">
      <div
        v-for="(item, index) in getTempWearing"
        :key="index"
        :id="'char_layer_' + index"
        :style="{ backgroundImage: `url(${item.imageUrl})` }"
        class="char_layer"
      ></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      currentIndexes: {
        hair: 0,
        eyes: 0,
        mouth: 0,
        clothes: 0,
        shoes: 0,
      },
      components: {
        hair: [],
        eyes: [],
        mouth: [],
        clothes: [],
        shoes: [],
      },
    };
  },
  created() {
    if (this.$store.state.wearing.length === 0) {
      this.fetchWearingComponents();
    }
    this.fetchAllComponents();
  },
  computed: {
    ...mapGetters([
      'getLoginUserId',
      'getWearing',
      'getTempWearing',
      'getAllComponents',
    ]),
  },
  methods: {
    ...mapMutations(['setWearing', 'setTempWearing', 'setAllComponents']),
    async fetchWearingComponents() {
      try {
        const userId = this.getLoginUserId;
        console.log('Fetching wearing components for user ID:', userId); // 사용자 ID 확인
        const response = await axios.get(
          `http://localhost:8080/api/wearings/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT를 Authorization 헤더에 추가
            },
          }
        );
        console.log('API Response:', response); // 응답 데이터 확인
        const sortedData = response.data.sort((a, b) => {
          return a.avatarComponentCategoryId - b.avatarComponentCategoryId;
        });
        this.setWearing(sortedData);
        this.setTempWearing([...sortedData]);
      } catch (error) {
        console.error('Error fetching wearing components:', error); // 오류 메시지 출력
      }
    },

    async fetchAllComponents() {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/avatar-components',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT를 Authorization 헤더에 추가
            },
          }
        );
        const data = response.data;

        // 카테고리별로 나누어서 저장
        data.forEach((component) => {
          const category = this.getCategoryNameById(
            component.avatarComponentCategoryId
          );
          if (category) {
            this.components[category].push(component);
          }
        });

        this.setAllComponents(data);
        console.log('Components:', this.components);
      } catch (error) {
        console.error('모든 아바타 컴포넌트를 가져오는 중 오류 발생:', error);
      }
    },

    getCategoryNameById(categoryId) {
      const categoryMap = {
        1: 'hair',
        2: 'eyes',
        3: 'mouth',
        4: 'clothes',
        5: 'shoes',
      };
      return categoryMap[categoryId];
    },

    changeComponent(category, direction) {
      const currentIndex = this.currentIndexes[category];
      const componentsArray = this.components[category];
      if (!componentsArray || componentsArray.length === 0) return;

      let newIndex = currentIndex + direction;
      if (newIndex < 0) newIndex = componentsArray.length - 1;
      if (newIndex >= componentsArray.length) newIndex = 0;

      // tempWearing을 업데이트
      const updatedTempWearing = this.getTempWearing.map((item) => {
        if (
          item.avatarComponentCategoryId ===
          componentsArray[newIndex].avatarComponentCategoryId
        ) {
          return componentsArray[newIndex];
        }
        return item;
      });

      this.setTempWearing(updatedTempWearing);
      this.currentIndexes[category] = newIndex;

      console.log('Updated tempWearing:', updatedTempWearing);
    },
    async save() {
      try {
        const userId = this.getLoginUserId;

        // 1. 기존 Wearing 데이터 삭제
        await axios.delete(
          `http://localhost:8080/api/wearings/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log('기존 Wearing 데이터 삭제 완료');

        // 2. tempWearing 데이터를 Wearing 테이블에 저장
        const savePromises = this.getTempWearing.map((item) => {
          return axios.post(
            'http://localhost:8080/api/wearings',
            {
              userId: userId,
              avatarComponent: {
                id: item.id,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
        });

        await Promise.all(savePromises);
        console.log('새로운 Wearing 데이터 저장 완료');

        // 3. wearing 상태를 tempWearing과 동일하게 업데이트
        this.setWearing([...this.getTempWearing]);
        console.log('wearing 상태가 tempWearing과 동일하게 업데이트됨');

        // 4. 성공 메시지 표시
        this.$swal({
          title: '저장 성공!',
          text: '변경 사항이 성공적으로 저장되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        });
      } catch (error) {
        console.error('저장 중 오류 발생:', error);
        this.$swal({
          title: '저장 실패',
          text: '저장하는 도중 오류가 발생했습니다. 다시 시도해주세요.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    },
    returnToPrevious() {
      this.setTempWearing([...this.getWearing]);
    },
  },
};
</script>

<style scoped>
.temp_border {
  width: 85%;
  height: 60%;

  position: relative;
}

.customizing {
  position: absolute;
  top: 50%;
  left: 2%; /* 왼쪽에서 10% 떨어지게 설정 (원하는 위치로 조정 가능) */
  transform: translateY(-50%);
  width: 20%;
  height: 100%;

  text-align: center;
}

.base_character {
  position: relative; /* 기본 위치를 상대 위치로 설정 */
  width: 370px;
  height: 370px;
  border: 6px solid #5a4a3b;
  border-radius: 20px;
  margin: 0 auto;
  background-image: url(@/assets/image/char_background.png);
  background-size: cover;
}

.customButton {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
  background-color: #f2c249; /* 노란색 계열 */
  border: 3px solid #a67f59; /* 갈색 */
  color: rgb(90, 74, 59); /* 다크 브라운 */
  padding: 6px 11px;
  border-radius: 80px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  outline: none;

  margin: 5px;
  margin-bottom: 20px;
}

.customButton:hover {
  background-color: #fff4d1; /* 베이지 계열 */
  border-color: #f2c249; /* 노란색 */
}

.customList {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
}

.customIcon {
  display: flex; /* Flexbox 활성화 */
  align-items: center; /* 요소들을 세로 방향으로 가운데 정렬 */
  justify-content: center; /* 필요에 따라 가로 방향 정렬 */
  gap: 10px;
}

.customIcon button {
  height: 30px;
  width: 30px;
  background-color: transparent;
  border: none;
}

.customIcon button:hover {
  font-size: 20px;
  cursor: pointer;
}

.customIcon img {
  width: 50px;
  height: 50px;
  border: 3px dashed rgb(90, 74, 59);
  border-radius: 50px;
}

.base_character {
  position: relative; /* 기본 위치를 상대 위치로 설정 */
  width: 370px;
  height: 370px;
  border: 6px solid #5a4a3b;
  border-radius: 20px;
  margin: 0 auto;
  background-image: url(@/assets/image/char_background.png);
  background-size: cover;
}

.char_layer {
  position: absolute; /* 절대 위치로 설정하여 레이어가 겹치게 함 */
  top: 0; /* 상단을 기준으로 위치 설정 */
  left: 0; /* 좌측을 기준으로 위치 설정 */
  width: 100%; /* 부모 요소의 너비에 맞춤 */
  height: 100%; /* 부모 요소의 높이에 맞춤 */
  background-size: cover; /* 배경 이미지가 전체를 덮도록 설정 */
  background-repeat: no-repeat; /* 이미지가 반복되지 않도록 설정 */
}
</style>
