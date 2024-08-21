<template>
    <div class="header" style="display: flex">
        <h3>
            <button>방만들기</button>
            <button @click="$router.push('/gallery')">갤러리 페이지</button>
            <button @click="$router.push('/follow')">팔로우 페이지</button>
            <button @click="$router.push('/mypage')">마이페이지</button>
        </h3>
    </div>
</template>

<script>

export default {

};
</script>

<style scoped>


.info {
    flex: 1 0;
    align-self: flex-end;
}
</style>
