<template>
    <div class="header" style="display: flex">
      <h3>
        <button @click="showModal = true">방만들기</button>
        <button @click="$router.push('/gallery')">갤러리 페이지</button>
        <button @click="$router.push('/follow')">팔로우 페이지</button>
        <button @click="$router.push('/mypage')">마이페이지</button>
      </h3>

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
  </style>
