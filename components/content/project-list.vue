<template>
	<div class="not-prose">
		<section v-if="pending">Loading...</section>
		<section v-else-if="error">Soming went wrong... Try again!</section>
		<section v-else>
			<ul calss="grid grid-cols-1 gap-4">
				<li
					v-for="respository in repos"
					:key="respository.id"
					class="border border-gray-200 rounder-sm p-4 hover:bg-gray-100 font-mono dark:hover:bg-gray-500">
					<a :href="respository.html_url" target="_blank">
						<div class="flex items-center justify-between">
							<div class="font-semibold">{{ respository.name }}</div>
							<div>{{ respository.stargazers_count }} ⭐</div>
						</div>
						<p class="text-sm">
							{{ respository.description }}
						</p>
					</a>
				</li>
			</ul>
		</section>
	</div>
</template>

<script setup>
	const { data, pending, error } = await useFetch(
		'https://api.github.com/users/piotr-jura-udemy/repos'
	);

	// console.log(data.value);

	const repos = computed(() =>
		data.value
			.filter(repo => repo.description)
			.sort((a, b) => {
				return b.stargazers_count - a.stargazers_count;
			})
	);
</script>

<style></style>
