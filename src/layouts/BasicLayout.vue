<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="includeList">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
  <br />
  <Counter />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  import Counter from '@/components/Counter';

  // 根据路由配置表中的 "enableKeepAlive" 动态缓存路由
  const route = useRoute();
  const includeList = ref<string[]>([]);
  const routeLen = route.matched.length;
  const parent = route.matched[routeLen - 2];
  if (parent?.children) {
    includeList.value = parent.children
      .map((item) => {
        const enableKeepAlive = item.meta?.enableKeepAlive;
        const name = item.component?.name;
        return enableKeepAlive && name ? name : '';
      })
      .filter((item) => !!item);
  }
</script>
