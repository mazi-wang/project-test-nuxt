export default {
	// https://router.vuejs.org/zh/api/#router-options
	// https://router.vuejs.org/api/interfaces/routeroptions.html
	scrollBehavior(to, from, savedPosition) {
		// return 期望滚动到哪个的位置

		if (savedPosition) return savedPosition;
		if (to.hash) return { el: to.hash, top: 30, behavior: 'smooth' };

		return { top: 0, left: 0, behavior: 'smooth' };
	},
};
