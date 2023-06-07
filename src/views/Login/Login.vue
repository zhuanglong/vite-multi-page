<template>
  <div></div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  import { usePermission } from '@/store/modules/permission';

  const router = useRouter();

  onMounted(() => {
    // 静默登录，拿到 code 请求登录接口
    const { fetchRoles, startPath } = usePermission();
    fetchRoles().then(() => {
      router.replace(startPath || '/');
    });
  });
</script>
