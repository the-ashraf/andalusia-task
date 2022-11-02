<script setup>
import {ref} from "vue";
import Categories from "./components/Categories.vue"
import SearchBox from "./components/SearchBox.vue"
import AllOffers from "./components/AllOffers.vue"

const categories = ref('');
const search = ref('');

function onCategoryUpdate(cats) {
	categories.value = cats;
}


</script>

<template>
	<div class="">
		<header class="">
			<div class="py-2 px-4 bg-brand text-white">
				<span class="font-bold">16781</span>
			</div>
			<div class="py-4 px-4">
				<img class="h-14 w-auto block" src="./assets/logo.svg" alt="">
			</div>
		</header>

		<main>
			<div class="py-8 px-4 bg-brand text-white text-2xl flex justify-center items-center">
				عروضنا
			</div>

			<div class="flex gap-8 px-4 mt-8">
				<div class="w-1/5 space-y-8">
					<SearchBox v-model="search" />

					<Categories class="w-full" @updated="onCategoryUpdate"/>
				</div>

				<div class="w-4/5 space-y-8">
					<AllOffers :selected-categories="categories" :search-term="search" />
				</div>
			</div>
		</main>

		<footer class="mt-8 bg-[#F3FAFD]">
			<div class="py-4 px-4">
				<img class="h-16 w-auto block" src="./assets/logo.svg" alt="">
			</div>
			<hr class="border-t-2 border-gray-200 mt-2 mx-8">
			<p class="text-center text-brand-light font-bold text-xs py-2">
				جميع الحقوق محقوظة لمجموعة اندلسية للخدمات الطبية 2022 &copy;
			</p>
		</footer>
	</div>
</template>