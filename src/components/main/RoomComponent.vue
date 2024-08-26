<template>
  <div class="roomListContainer">
    <div v-for="room in this.getRooms1" v-bind:key="room.id" class="roomBox">
      <div>{{ room.id }}</div>
      <div>{{ room.title }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  created() {
    this.fetchRooms1();
  },
  computed: {
    ...mapGetters({
      getRooms1: 'getRooms',
    }),
  },
  methods: {
    ...mapActions({
      fetchRooms1: 'fetchRooms',
    }),
  },
};
</script>

<style scoped>
.roomListContainer {
}

.roomBox {
}
</style>
