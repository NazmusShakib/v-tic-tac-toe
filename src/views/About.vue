<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>

export default {
  
  mounted() {

      console.log(process.env.VUE_APP_PUSHER_APP_KEY);
      console.log(process.env.VUE_APP_PUSHER_APP_CLUSTER);
  }
}
</script>

<style scoped>

</style>