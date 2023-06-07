<template>
  <div>Pinia Count:</div>
  <div>
    <div class="global-text">{{ evenOrOdd }}</div>
    <button @click="decrement()">-</button>
    <span class="count-text">{{ count }}</span>
    <button @click="increment()">+</button>
    <button @click="incrementAsync()">async +</button>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue';

  import { useCounter } from '@/store/modules/counter';

  export default defineComponent({
    setup() {
      const counter = useCounter();

      const state = reactive({
        count: computed(() => counter.count),
        evenOrOdd: computed(() => counter.evenOrOdd),
      });

      const decrement = () => {
        counter.decrement();
      };

      const increment = () => {
        counter.increment();
      };

      const incrementAsync = () => {
        counter.incrementAsync();
      };

      return {
        ...toRefs(state),
        decrement,
        increment,
        incrementAsync,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import './index.scss';

  .count-text {
    color: $color;
    font-size: 18px;
    font-weight: bold;
  }
</style>
