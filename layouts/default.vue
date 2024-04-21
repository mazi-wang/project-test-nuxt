<template>
	<div class="container mx-auto max-w-4xl">
		<header class="flex justify-between items-center mt-5">
			<div class="flex items-center gap-12">
				<div class="hidden md:block">
					<NuxtLink
						to="/"
						class="text-xl font-semibold p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
						Zang Yang
					</NuxtLink>
				</div>
				<!-- nav -->
				<Menu />
			</div>

			<!-- *3 使用客户端渲染 -->
			<ClientOnly>
				<ColorModeSelector />
			</ClientOnly>
		</header>
		<main class="py-2 mt-10">
			<slot />
		</main>
	</div>
</template>

<script lang="ts" setup>
	/* 	
	const colorMode = useColorMode();
	console.log(colorMode.preference);
	colorMode.preference = 'light'; */

	useHead({
		title: '我的应用',
		meta: [{ name: 'description', content: '我的神奇网站。' }],
		bodyAttrs: {
			class: 'test',
		},
		script: [{ innerHTML: "console.log('Hello world')" }],

		// 作为字符串，
		// 其中`%s`会被标题替换
		titleTemplate: '%s - 网站标题',
		// ... 或者作为一个函数
		// titleTemplate: productCategory => {
		// 	return productCategory ? `${productCategory} - 网站标题` : '网站标题';
		// },

		link: [
			{
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
				crossorigin: '',
			},
		],
	});

	useSeoMeta({
		title: '我的神奇网站',
		ogTitle: '我的神奇网站',
		description: '这是我的神奇网站，让我来告诉你关于它的一切。',
		ogDescription: '这是我的神奇网站，让我来告诉你关于它的一切。',
		ogImage: 'https://example.com/image.png',
		twitterCard: 'summary_large_image',
	});
</script>

<style>
	body {
		font-family: 'Reboto';
	}

	body {
		@apply bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300;
	}
</style>
