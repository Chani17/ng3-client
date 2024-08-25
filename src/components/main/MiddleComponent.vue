<template>
  <div class="middleContainer">
    <button class="createRoomButton" @click="showModal">방만들기</button>
    <SearchBox></SearchBox>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"; 
import SearchBox from "@/components/main/SearchBox.vue";

export default {
  created() {

},

  computed: {
    ...mapGetters({
    
    }),
  },
  methods: {
    ...mapActions({
        showModal: "showModal",
    }),
  },
  components: {
    SearchBox
  }
};
</script>


<style>
.middleContainer {
    margin: 0px 60px;
}
</style>