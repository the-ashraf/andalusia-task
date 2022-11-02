<script setup>
defineProps({
	offer: {
		type: Object
	}
})
</script>
<template>
	<div class="border rounded-lg overflow-hidden relative">
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
</template>