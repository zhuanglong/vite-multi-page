<template>
  <div></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { usePermission } from '@/store/modules/permission';

  export default defineComponent({
    name: 'Login',
    setup() {
      onMounted(() => {
        // 静默登录
        const router = useRouter();
        const permission = usePermission();
        permission.fetchRoles().then(() => {
          router.replace('/');
        });
      });
    },
  });
</script>
