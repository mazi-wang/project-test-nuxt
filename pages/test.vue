<template>
	<div ref="exploreFeeds" class="h-screen relative invisible">
		<div
			class="absolute top-0 left-0 right-0 z-0"
			:style="{ height: `${total_height}px` }"></div>
		<section
			ref="noteItem"
			v-for="item in noteItems"
			:key="item.msg"
			class="note-item absolute">
			<img :src="item.src" class="rounded-2xl" />
			<div class="text-sm p-3">{{ item.msg }}</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
	const exploreFeeds = ref<HTMLDivElement | null>(null);
	const noteItem = ref<HTMLDivElement[] | null>(null);

	const total_height = 1000;

	const data = [
		{
			src: 'http://sns-webpic-qc.xhscdn.com/202404041939/4be76af1e1aa8e94097436a07e3d3095/1040g2sg3106efm3v62105pdlumn3kd7tq6idcmg!nc_n_webp_mw_1',
			msg: '十分建议女孩子婚前要对方开具这个证明',
		},
		{
			src: 'http://sns-webpic-qc.xhscdn.com/202404041939/4be76af1e1aa8e94097436a07e3d3095/1040g2sg3106efm3v62105pdlumn3kd7tq6idcmg!nc_n_webp_mw_1',
			msg: '求求泡泡玛特加强品控吧🥹',
		},
		{
			src: 'http://sns-webpic-qc.xhscdn.com/202404041941/a1849cf7a90c2d3edcd24ab88cb9c029/spectrum/1040g34o310n6bhle6k005pdltlb3btmm9464r28!nc_n_webp_mw_1',
			msg: '赛跑的乐趣 ',
		},
		{
			src: 'http://sns-webpic-qc.xhscdn.com/202404041941/5442511c8ad470228b49c7dad9602918/1040g008310uk56pr6a605ob6aligkah9729jpqg!nc_n_webp_mw_1',
			msg: '公共场合要不咱们还是注意点？',
		},
		{
			src: 'http://sns-webpic-qc.xhscdn.com/202404041942/9f7b7aee770a237caff7885254fb813e/1040g2sg310kqeiam6k6g5n3435q47jeuk1v4so8!nc_n_webp_mw_1',
			msg: '我好爱这一张 ',
		},
		{
			src: 'http://sns-webpic-qc.xhscdn.com/202404041934/754237191aa062378a544e3bda249a96/1040g008310jgov2smg6g5pc09d9mdr2fdbrptt0!nc_n_webp_mw_1',
			msg: '🇦🇺下课噜 ',
		},
		{
			src: 'http://sns-webpic-qc.xhscdn.com/202404041936/0dc0773847529de0048e1cb990e79102/1040g2sg310utic8umi0g5pch6c1oid57evfsme0!nc_n_webp_mw_1',
			msg: 'Sí🥥🫣🍹 ',
		},
		{
			src: 'http://sns-webpic-qc.xhscdn.com/202404041937/86d2bb7fe8845e18eb531569041d909e/1040g008310r6hrj8mm005p418ib486regabdul8!nc_n_webp_mw_1',
			msg: '我校长竟然偷偷拍电影',
		},
		{
			src: 'http://sns-webpic-qc.xhscdn.com/202404041937/608571fa19c5ba703615aaa1a887bb17/1040g008310v0qpsvmc004a95k3kakhpvrcjnuo0!nc_n_webp_mw_1',
			msg: '白月光电视剧❗谁懂啊，小时候天天熬夜追❗',
		},
		{
			src: 'http://sns-webpic-qc.xhscdn.com/202404041937/8f5f9301445a2bd31a7d2f9c6210c6f7/1040g2sg310kkm25qmc00419hvdeg70fonaba3rg!nc_n_webp_mw_1',
			msg: '河南的朋友你们的嘴真严啊！都开始修仙了！',
		},
	];

	const noteItems = ref<any>([...data]);

	onMounted(() => {
		const io = new IntersectionObserver(config => {
			if (config[0].intersectionRatio > 0 && noteItems.value.length < 40) {
				io.unobserve(noteItem.value?.at(-3) as Element);
				noteItems.value.push(...data);

				console.log(noteItems.value.length);
				nextTick(() => {
					layoutInfo(exploreFeeds.value, noteItem.value);
					io.observe(noteItem.value?.at(-3) as Element);
				});
				// layoutInfo(exploreFeeds.value, noteItem.value);
			} else if (noteItems.value.length >= 40) {
				console.log('no');
				io.unobserve(noteItem.value?.at(-3) as Element);
			}
		});
		// console.log(io);
		// * document.querySelector('#test') as Element
		io.observe(noteItem.value?.at(-3) as Element);
		nextTick(() => {
			window.scrollTo(0, 0);
			layoutInfo(exploreFeeds.value, noteItem.value);
		});
	});
</script>

<style></style>
