<script setup>
import {MagnifyingGlassIcon} from "@heroicons/vue/24/outline";
import {ref} from "vue";

const query = ref('');
const timeout = ref(null);

const props = defineProps({
	modelValue: {
		type: String
	}
})
const emit = defineEmits(['update:modelValue']);

function onInput() {
	clearTimeout(timeout.value);

	timeout.value = setTimeout(() => {
		emit('update:modelValue', query.value);
	}, 500);
}


</script>

<template>
	<div class="relative cursor-pointer group">
		<input
			ref="trigger"
			class="block h-8 w-full pr-8 outline-none text-gray-500 border border-gray-300 group-hover:border-brand/20 rounded-md"
			type="text"
			placeholder="البحث فى العروض"
			v-model="query"
			@input="onInput">

		<div class="absolute inset-y-0 right-0 flex items-center px-2">
			<MagnifyingGlassIcon class="h-4 w-4 text-gray-400 group-hover:text-brand"/>
		</div>
	</div>
</template>