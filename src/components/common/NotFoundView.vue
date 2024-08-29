<template>
  <div class="error-container">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist!</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.error-container {
  border: 8px solid #623604;
  border-radius: 50px;
  background-color: #eddc8d;
  height: 600px;
  width: 600px;
  display: flex;
  flex-direction: column; /* 자식 요소들을 세로 방향으로 정렬 */
  justify-content: center; /* 세로 방향으로 가운데 정렬 */
  align-items: center; /* 가로 방향으로 가운데 정렬 */
}

.error-container p {
  font-size: 18px;
}
</style>
