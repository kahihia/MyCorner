<template>
  <q-btn icon="image" small color="tertiary">
    <q-tooltip>
      <img :src="url" alt="" >
    </q-tooltip>
  </q-btn>
</template>
<script>
  export default {
    props: ['url']
  }
</script>
<style scoped>
  img {
    max-height: 300px;
  }
</style>
