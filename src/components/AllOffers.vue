<script setup>
import axios from "axios";
import {onMounted, ref, watch} from "vue";
import SingleOffer from "./SingleOffer.vue"

const baseUrl = 'https://pocms-stage.ahbsdev.com/api/offers';

const offers = ref([]);
const page = ref(1);
const limit = ref(10);
const sort_title = ref('order');
const sort_key = ref('order');
const sort_type = ref('desc');
const loading = ref(false);

const props = defineProps(['selectedCategories', 'searchTerm'])


watch(() => props.searchTerm, () => {
	loadOffers();
})

watch(() => props.selectedCategories, () => {
	loadOffers();
})

watch(sort_key, () => {
	loadOffers();
})

watch(sort_type, () => {
	loadOffers();
})

watch(page, () => {
	loadOffers();
})

function loadMoreOffers () {
	page.value = offers.value.meta.current_page + 1
}

function onSortChange (e) {
	let sortPair = e.target.value.split('_');
	sort_key.value = sortPair[0];
	sort_type.value = sortPair[1];
	sortPair = null;
}

const loadOffers = () => {
	loading.value = true;

	offers.value = [];

	const params = {
		categories_id: '[' + props.selectedCategories.toString() + ']',
		limit: limit.value,
		sort_key: sort_key.value,
		sort_type: sort_type.value,
		search: props.searchTerm,
		page: page.value,
	}

	const searchParams = new URLSearchParams(params);

	axios
		.get(baseUrl, {
			headers: {'BU-ID': import.meta.env.VITE_API_KEY, 'lang': 'en'},
			params: searchParams
		})
		.then(response => {
			offers.value = response.data
		})
		.finally(() => {
			loading.value = false
		})
}

onMounted(() => {
	loadOffers();
})
</script>
<template>
	<div class="space-y-8">
		<div class="flex justify-between items-center">
			<h2 class="pb-2 border-b-4 border-brand font-bold text-lg">جميع العروض المتاحة</h2>

			<select class="block h-8 w-40 px-2 text-sm outline-none text-gray-500 border border-gray-300 group-hover:border-brand/20 rounded-md" name="sort" id="sort" @change.prevent="onSortChange" v-model="sort_title">
				<option value="order_desc">الترتيب الإفتراضي</option>
				<option value="price_desc">الاعلي سعراً</option>
				<option value="price_asc">الاقل سعراً</option>
				<option value="bookings_desc">الاكثر حجزاً</option>
				<option value="bookings_asc">الاقل حجزاً</option>
			</select>
		</div>

		<div class="w-full h-full flex justify-center items-center" v-if="loading">
			<div
				class="w-10 h-10 my-10 border-4 border-gray-300 border-l-blue-700 rounded-full animate-spin duration-200"></div>
		</div>

		<div class="grid grid-cols-2 gap-8" v-else>
			<SingleOffer v-for="offer in offers.data" :key="offer.id" :offer="offer" />
		</div>

		<div class="flex justify-center w-full" v-if="offers.links?.next">
			<button class="btn text-brand w-auto px-3" @click.prevent="loadMoreOffers">
				تحميل المزيد من العروض
			</button>
		</div>
	</div>
</template>