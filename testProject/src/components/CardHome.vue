

<template>
    <div class="card card-compact bg-base-100 h-72 w-64 shadow-xl mt-24  shadow-lg shadow-blue-900/40 relative group">
      <figure>
        <button type="button" @click="$emit('edit-home')">
          <PencilSquareIcon class="w-8 h-8 text-white absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
        <img
            src="https://media.istockphoto.com/id/2155879454/photo/this-is-an-exterior-photo-of-a-home-for-sale-in-beverly-hills-ca.webp?a=1&b=1&s=612x612&w=0&k=20&c=GvT1GQsxPREVk5rWMjlZaZHJH8TSpBDagNgZDg1NxyE="
            alt="home" />
      </figure>
      <div class="card-body">
        <p>Type: {{ infosHome.type }}</p>
        <p>Price: {{ infosHome.priceHome }}</p>
        <p v-if="infosHome.availability">Available</p>
        <p v-else>Not Available</p>

        <div class="flex gap-20">
          <div class="flex">
            <StarIcon class="w-5 h-5 text-amber-400"/>
            <StarIcon class="w-5 h-5 text-amber-400"/>
            <StarIcon class="w-5 h-5 text-amber-400"/>
            <StarIcon class="w-5 h-5 text-amber-400"/>
          </div>
          <div>
            <router-link to="">Buy Now</router-link>
          </div>
        </div>

      </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import {StarIcon, PencilSquareIcon} from "@heroicons/vue/24/solid";



const infosHome = defineProps([
    'type',
    'availability',
    'priceHome',
    'srcUrl'
])
</script>