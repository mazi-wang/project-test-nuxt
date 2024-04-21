<template>
	<article
		class="prose dark:prose-invert max-w-none prose-pre:bg-white dark:prose-pre:bg-gray-800 prose-pre:text-gray-700 dark:prose-pre:text-gray-300">
		<ContentDoc>
			<template #not-found>
				<h1>Document not found</h1>
			</template>

			<!-- https://cn.vuejs.org/guide/components/slots.html#dynamic-slot-names -->
			<!-- * 作用域插槽 -->
			<template v-slot="{ doc }">
				<div class="grid grid-cols-6 gap-16">
					<div :class="{ 'col-span-4': doc.toc, 'col-span-6': !doc.toc }">
						<ContentRenderer :value="doc" />
					</div>
					<div class="col-span-2 not-prose" v-if="doc.toc">
						<aside class="sticky top-8">
							<div class="font-semibold mb-2">Table of Contents</div>
							<nav>
								<TocLinks :links="doc.body.toc.links" :active-id="activeId" />
							</nav>
						</aside>
					</div>
				</div>
			</template>
		</ContentDoc>
	</article>
</template>

<script setup>
	// const route = useRoute();
	// console.log(route, route.params.slug);
	const activeId = ref(null);
	onMounted(() => {
		const callback = entries => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					console.log(entry);
					activeId.value = entry.target.id;
					break;
				}
			}
		};
		const observer = new IntersectionObserver(callback, {
			root: null,
			threshold: 0.5,
		});
		const elements = document.querySelectorAll('h2, h3');

		console.log(elements);
		for (const element of elements) {
			observer.observe(element);
		}
		onBeforeUnmount(() => {
			console.log('onBeforeUnmount');
			for (const element of elements) {
				observer.unobserve(element);
			}
		});
	});
</script>

<style></style>
