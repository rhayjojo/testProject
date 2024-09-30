<template>
  <header>
      <nav class="w-full p-2 flex justify-evenly">
        <HomeIcon class="w-12" />
        <InputSearch @search="updateSearch"/>
        <button @click="openAddModal" class="btn" onclick="my_modal_3.showModal()">
          <PlusIcon class="w-8" />
          Add
        </button>
        <dialog id="my_modal_3"  class="modal">
          <div class="modal-box">
            <form method="dialog" @submit.prevent="handleSubmit">
              <button
                  type="button"
                  onclick="my_modal_3.close()"
                  class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <input
                  type="text"
                  class="text-black placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 mt-3 "
                  placeholder="Entrer le type de maison"
                  v-model="currentHome.type"
              /><br />
              <input
                  type="number"
                  class="text-black placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                  placeholder="Entrer le prix de la maison"
                  v-model="currentHome.priceHome"
              />
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text"></span>
                  <input
                      type="checkbox"
                      checked="checked"
                      v-model="currentHome.availability"
                      class="checkbox"
                  />
                </label>
              </div>
              <div class="card-actions justify-end">
                <button type="submit" class="btn btn-primary">
                  {{ editMode ? 'Enregistrer les modifications' : 'Ajouter' }}
                </button>
              </div>
            </form>
          </div>
        </dialog>


        <label class="swap swap-rotate">
          <input type="checkbox" class="theme-controller" value="synthwave" />
          <svg
              class="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
            <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
              class="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
            <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </nav>
    </header>
    <div class="grid grid-cols-4 justify-items-center mx-auto">
      <CardHome
          v-for="(home, index) in filteredHomes"
          :key="index"
          :type="home.type"
          :availability="home.availability"
          :priceHome="home.priceHome"
          @edit-home="openEditModal(index)"
      />
    </div>
</template>

<script setup lang="ts">
import { HomeIcon, PlusIcon } from '@heroicons/vue/24/solid'
import InputSearch from "@/components/InputSearch.vue";
import { ref, onMounted, computed } from "vue";
import CardHome from "@/components/CardHome.vue";
import axios from "axios";

const homeList = ref([]);
const currentHome = ref({
  type: '',
  availability: true,
  priceHome: null,
});

const editMode = ref(false);
const editIndex = ref(null);
const resetForm = () => {
  currentHome.value = {
    type: '',
    availability: true,
    priceHome: null,
  };
};
const openAddModal = () => {
  resetForm();
  editMode.value = false;
  document.getElementById('my_modal_3').showModal();
};

const openEditModal = (index) => {
  editMode.value = true;
  editIndex.value = index;
  currentHome.value = { ...homeList.value[index] };
  document.getElementById('my_modal_3').showModal();
};


const handleSubmit = () => {
  if (!currentHome.value.type || !currentHome.value.priceHome) {
    alert("Veuillez remplir tous les champs.");
  } else{
    if (editMode.value && editIndex.value !== null) {
      homeList.value[editIndex.value] = { ...currentHome.value };
    } else {
      homeList.value.push({ ...currentHome.value });
    }

    localStorage.setItem('homeList', JSON.stringify(homeList.value));
    resetForm()
    document.getElementById('my_modal_3').close();
  }

};

onMounted(() => {
  const storedHomeList = localStorage.getItem('homeList');
  if (storedHomeList) {
    homeList.value = JSON.parse(storedHomeList);
  } else {
    async function fetchHomeData() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos/1');
        const data = response.data;

        currentHome.type = data.title;
        currentHome.availability = true;
        currentHome.priceHome = Math.floor(Math.random() * 1000);

        homeList.value.push({ ...currentHome });
        localStorage.setItem('homeList', JSON.stringify(homeList.value));
      } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
      }
    }
    fetchHomeData();
  }
});

const searchTerm = ref('');

const updateSearch = (term: string) => {
  searchTerm.value = term;
};


const filteredHomes = computed(() => {
  if (!searchTerm.value) return homeList.value;
  return homeList.value.filter(home =>
      home.type.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>

