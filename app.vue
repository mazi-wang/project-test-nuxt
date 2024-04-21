<template>
	<div>
		<NuxtLayout>
			<!-- :name="layout" -->
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup>
	// * 设置页面默认布局 :name="layout" 优先级高于页面 definePageMeta()
	// const layout = 'another'; // * layouts/another.vue
	// const layout = 'default';
</script>

<style>
	.page-enter-active,
	.page-leave-active {
		transition: all 0.4s;
	}
	.page-enter-from,
	.page-leave-to {
		opacity: 0;
		filter: blur(1rem);
	}
</style>
