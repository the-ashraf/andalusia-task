<script setup>
import axios from "axios";
import {onMounted, ref, watch} from "vue";
const emit = defineEmits(["updated"]);
import { FunnelIcon } from "@heroicons/vue/24/solid";

let baseUrl = 'https://pocms-stage.ahbsdev.com/api/categories';
let axiosConfig = {headers: {'BU-ID': import.meta.env.VITE_API_KEY, 'lang': 'en'}};

const categories = ref([]);
const loading = ref(true);

const selectedCategories = ref([]);

onMounted(() => {
	fetch()
})

function fetch() {
	axios
		.get(baseUrl, axiosConfig)
		.then(response => {
			categories.value = response.data.data.filter((key) => key.name.length)
		})
		.finally(() => {
			loading.value = false
		})
}

watch(selectedCategories, (val) => {
	emit("updated", val);
})

</script>

<template>
	<div class="w-full h-full flex justify-center items-center" v-if="loading">
		<div class="w-10 h-10 my-10 border-4 border-gray-300 border-l-blue-700 rounded-full animate-spin duration-200"></div>
	</div>

	<div class="" v-else>
		<div class="bg-gradient-to-l from-brand-dark to-brand-light text-white py-2 px-3 font-bold rounded-t-lg flex items-center gap-2">
			<FunnelIcon class="h-5 w-5 text-white" />
			<span>فئات العروض المتاحة</span>
		</div>
		<ul class="rounded-b-lg border border-[#8ECAFF] p-8 divide-y divide-gray-200">
			<li class="flex items-center justify-between" v-for="category in categories" :key="category.id">
				<div class="flex items-center gap-2 py-1">
					<input type="checkbox" :name="category.slug" :id="category.id" :value="category.id" v-model="selectedCategories">
					<label class="text-sm text-gray-500" for="category.id">{{ category.name }}</label>
				</div>

				<span class="text-brand font-bold">{{ category.posts_count }}</span>
			</li>
		</ul>
	</div>
</template>