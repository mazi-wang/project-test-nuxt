<template>
	<article class="prose dark:prose-invert max-w-none">
		<ContentDoc path="/about" />
	</article>
</template>

<script lang="ts" setup>
	// This will work in both `<script setup>` and `<script>`
	// definePageMeta({
	// 	layout: 'another',
	// });

	useHead({
		title: 'About',
	});

	function enableCustomLayout() {
		setPageLayout('another');
	}
</script>

<style></style>
