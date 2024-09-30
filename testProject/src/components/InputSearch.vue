<template>
  <label class="relative block">
    <span class="sr-only">Search</span>
    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
      <MagnifyingGlassIcon class="h-5 w-5 fill-slate-300" />
    </span>
    <input
        v-model="searchQuery"
        @input="emitSearch"
        class="text-black placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-2"
        placeholder="Search for anything..."
        type="text"
        name="search"
    />
  </label>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';

const emit = defineEmits(['search']);
const searchQuery = ref('');

const emitSearch = () => {
  emit('search', searchQuery.value);
};
</script>

