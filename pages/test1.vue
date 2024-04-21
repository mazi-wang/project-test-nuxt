<template>
	<div class="wrapper">
		<div class="background" :style="{ height: `${total_height}px` }"></div>
		<div class="list">
			<div class="line">
				<div class="item lt">BEIJING</div>
				<div class="item gt">北京</div>
			</div>
			<div class="line">
				<div class="item lt">shanghai</div>
				<div class="item gt">上海</div>
			</div>
			<div class="line">
				<div class="item lt">guangzhou</div>
				<div class="item gt">广州</div>
			</div>
			... //省略
		</div>
	</div>
</template>
<style scoped>
	.wrapper {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 60px;
		overflow-y: scroll;
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: -1;
	}

	.list {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
</style>
