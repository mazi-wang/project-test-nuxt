<template>
	<NuxtLayout>
		<section>
			{{ error }}
			<h1 class="text-4xl mb-4">Opps{{ error.statusCode }}</h1>
			<h2 class="text-xl text-gray-500 drak:text-gray-400">
				{{ error.statusMessage }}
			</h2>
			<button @click="handleError">清除错误</button>
		</section>
	</NuxtLayout>
</template>

<script setup>
	defineProps({
		error: Object,
	});

	const handleError = () => clearError({ redirect: '/' });
</script>
