<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>

export default {
  
  mounted() {

    const lines = [
        [0, 1, 2],[3, 4, 5],[6, 7, 8],
        [0, 3, 6],[1, 4, 7],[2, 5, 8],
        [0, 4, 8],[2, 4, 6],
      ];
      var aa = Array(9).fill(null);
  }
}
</script>

<style scoped>

</style>