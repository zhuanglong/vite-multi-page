<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <img alt="" src="@/projects/projectA/assets/老虎.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <H5Rem />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'Home',
  });
</script>

<script lang="ts" setup>
  import H5Rem from '@/components/H5Rem';
  import HelloWorld from '@/components/HelloWorld';
</script>
