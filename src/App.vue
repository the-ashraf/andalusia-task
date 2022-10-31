<script setup>
import Categories from "./components/Categories.vue"
import {onMounted, ref, watch} from "vue";
import axios from "axios";

const baseUrl = 'https://pocms-stage.ahbsdev.com/api/offers';

const offers = ref([]);
const categories = ref('');
const limit = ref(10);
const sort_key = ref('order');
const sort_type = ref('desc');
const search = ref('');
const loading = ref(false);

function onCategoryUpdate(cats) {
	categories.value = cats;
}

watch(categories, () => {
	loadOffers();
})

watch(sort_key, () => {
	loadOffers();
})

const loadOffers = () => {
	loading.value = true;

	offers.value = [];

	const params = {
		categories_id: '[' + categories.value.toString() + ']',
		limit: limit.value,
		sort_key: sort_key.value,
		sort_type: sort_type.value,
		search: search.value,
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
					<div class="relative">
						<input class="shadow border border-gray-300 placeholder-gray-300 py-1 rounded-sm w-full" type="text" value="اكتب اسم العرض هنا">
					</div>

					<Categories class="w-full" @updated="onCategoryUpdate"/>
				</div>

				<div class="w-4/5 space-y-8">
					<div class="flex justify-between items-center">
						<h2 class="pb-2 border-b-4 border-brand font-bold text-lg">جميع العروض المتاحة</h2>

						<select class="w-32 text-brand rounded-sm border border-gray-300" name="sort" id="sort" v-model="sort_key">
							<option value="price">السعر</option>
							<option value="bookings">عدد الحجوازت</option>
							<option value="order">الترتيب</option>
						</select>
					</div>




					<div class="">
						<div class="w-full h-full flex justify-center items-center" v-if="loading">
							<div
								class="w-10 h-10 my-10 border-4 border-gray-300 border-l-blue-700 rounded-full animate-spin duration-200"></div>
						</div>

						<div class="grid grid-cols-2 gap-8" v-else>
							<div class="border rounded-lg overflow-hidden relative" v-for="offer in offers.data" :key="offer.id">
								<div class="w-auto">
									<img class="w-full h-auto object-cover object-top" :src="offer.image"
									     :alt="offer.image_alt" :title="offer.image_title">
								</div>
								<div class="p-4 bg-[#F3FAFD]">
									<h4 class="font-bold">{{ offer.title.ar }}</h4>

									<p class="text-gray-600 text-xs">{{ offer.small_description.ar }}</p>

									<div class="mt-2">
								<span class="text-[#b4003c] font-bold">
									السعر:
									{{ offer.discount_price }}
									ريال
								</span>
										<span class="text-gray-600 font-light text-sm">
									بدلا من
									<span class="line-through">
										{{ offer.price }}
										ريال
									</span>
								</span>
									</div>

									<div class="text-brand text-sm font-bold mt-2">
										العرض ساري حتي
										{{ offer.end_at }}
									</div>

									<div class="flex justify-between gap-3 mt-2">
										<button class="btn bg-gradient-to-r from-brand-dark to-brand-light text-white">
											احصل علي العرض
										</button>

										<button class="btn text-brand">
											تفاصيل العرض
										</button>
									</div>

									<div class="absolute top-0 left-0 py-2 px-3 bg-gradient-to-b from-red-600 to-orange-500 text-white rounded-br-2xl">
										<span class="text-xs">خصم</span>
										{{ offer.discount }}%
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<footer></footer>
	</div>
</template>