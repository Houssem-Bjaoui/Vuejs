<script setup>
const props = defineProps({
  toast: { type: Object, required: true }
})
</script>

<template>
  <transition name="toast-fade">
    <div v-if="props.toast.show" class="libra-toast">
      <span style="color:#c9a84c">✦</span> {{ props.toast.message }}
    </div>
  </transition>
</template>
