<template>
<div class="header">
    <!-- 방 만들기 버튼은 왼쪽에 정렬 -->
    <button @click="showModal = true">방만들기</button>

    <!-- route-btn들은 오른쪽에 정렬 -->
    <div class="route-btns">
      <img class="route-btn" src="@/assets/gallery.png" @click="$router.push('/gallery')" alt="갤러리 페이지">
      <img class="route-btn" src="@/assets/friends.png" @click="$router.push('/follow')" alt="팔로우 페이지">
      <img class="route-btn" src="@/assets/user.png" @click="$router.push('/mypage')" alt="마이페이지">
    </div>
    <!-- 방 생성 modal 컴포넌트 -->
    <CreateRoomModal :showModal="showModal" @close="showModal = false" />
  </div>
    
  </template>
  
  <script>
  import CreateRoomModal from '@/components/main/CreateRoomModal.vue';
  
  export default {
    components: {
      CreateRoomModal
    },
    data() {
      return {
        showModal: false,  // 모달창 표시 여부
      };
    },
  };
  </script>
  
  <style scoped>
  .route-btns {
    display: flex;
    gap: 10px;
  }

  .route-btns .route-btn {
    width: 2.1vw;
    height: 4vh;
    cursor: pointer;
    margin: 5px;
  }
  </style>