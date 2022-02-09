<template>
  <div class="not-permission__container">
    <div class="text">您暂无权限查看哦~</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'NotFound',
    setup() {},
  });
</script>

<style lang="scss" scoped>
  .not-permission__container {
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    background-color: #fff;

    .text {
      margin-top: 1rem;
      color: #64697b;
      font-size: 0.3rem;
    }
  }
</style>
