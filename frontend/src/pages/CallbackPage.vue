<template>
    <div>Processing authentication...</div>
</template>
  
<script setup>
  import { onMounted } from "vue";
  import { useAuth0 } from "@auth0/auth0-vue";
  import { useRouter } from "vue-router";

  const { handleRedirectCallback } = useAuth0();
  const router = useRouter();

  onMounted(async () => {
    await handleRedirectCallback();
    router.push("/adminhome"); // Redirect to home after login
  });
</script>