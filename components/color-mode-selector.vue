<template>
	<div class="flex gap-2 items-center">
		<div class="text-gray-500 text-xs" v-show="showNextModelLabel">
			Change to {{ nextMode }}
		</div>
		<button
			@click="toggleColorMode"
			@mouseenter="showNextModelLabel = true"
			@mouseleave="showNextModelLabel = false"
			class="hover:bg-gray-100 dark:hover:bg-gray-600 px-2 py-1 text-gray-500 text-4xl md:text-base">
			{{ nextmModelIcon }}
		</button>
	</div>
</template>

<script lang="ts" setup>
	const showNextModelLabel = ref(false);
	const colorMode = useColorMode();

	// colorMode.preference = 'system'; // default value
	// *0 设置初始值可避免服务器渲染警告 因为 客户端和服务器不一致
	// *1 或 设置客户端渲染

	const modes = ['system', 'light', 'dark']; // 0, 1, 2 .length = 3

	const nextModeIcons = {
		system: '🌓',
		light: '🌕',
		dark: '🌑',
	};

	const nextMode = computed(() => {
		const currentModeIndex = modes.indexOf(colorMode.preference);
		return modes[(currentModeIndex + 1) % modes.length]; // 0 -> 1 -> 2 -> 0
	});

	const nextmModelIcon = computed(
		() => nextModeIcons[nextMode.value as keyof typeof nextModeIcons]
	);
	const toggleColorMode = () => (colorMode.preference = nextMode.value);
</script>

<style></style>
