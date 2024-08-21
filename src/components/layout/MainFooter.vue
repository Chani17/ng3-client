<template>
  <div>
    <room-list :rooms="rooms"></room-list>
  </div>
</template>

<script>
import RoomList from '@/components/main/RoomList.vue';

export default {
  components: { RoomList },
  props: {
    rooms: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>