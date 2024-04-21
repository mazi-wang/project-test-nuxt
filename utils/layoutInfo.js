export default (parentEl, childsEl, loadingEl = null) => {
	try {
		// document.querySelector('#exploreFeeds');
		const containerEl = parentEl;
		// const loadingEl = document.querySelector('#feeds-replace-loading');

		if (!containerEl) {
			// window.MF_STREAM_RENDER_EXTRA = 'no-container';
			console.log('no-container');
			return;
		}

		//  Array.from(containerEl.querySelectorAll('.note-item'));
		const notes = Array.from(childsEl);
		const notesCount = notes.length;

		if (!notesCount) {
			// window.MF_STREAM_RENDER_EXTRA = 'no-note-item';
			console.log('no-note-item');
			return;
		}

		const $$skeleton = document.getElementById('ssr-skeleton');
		if ($$skeleton) {
			$$skeleton.parentNode?.removeChild($$skeleton);
		}

		// * 容器内 clumns gapV gapH clumnWidth
		let layoutInfo = getLayoutInfo(parentEl.clientWidth);
		console.log(parentEl.clientWidth, layoutInfo);

		/* * 容器宽
		const containerWidth = Math.ceil(
			layoutInfo.columns * layoutInfo.columnWidth +
				layoutInfo.columns * layoutInfo.gapH
		);
		containerEl.style.width = containerWidth + 'px'; */

		layout(layoutInfo, notesCount, notes, containerEl);
		window.addEventListener('resize', () => {
			const nextLayoutInfo = getLayoutInfo(parentEl.clientWidth);

			layoutInfo = nextLayoutInfo;
			window.scrollTo(0, 0);
			layout(layoutInfo, notesCount, notes, containerEl);
			console.log('resize');
		});

		containerEl.style.visibility = 'visible';
		// window.MF_STREAM_RENDERED = true;
		console.log('layout-rendered');
	} catch (e) {
		console.log(e);
		// window.MF_STREAM_RENDER_EXTRA = 'script error' + e.toString();
	}
};

function getLayoutInfo(minWidth = 1728) {
	const width = Math.min(window.innerWidth, minWidth);
	if (width >= 1424)
		return {
			columns: 5,
			gapV: 16,
			gapH: 32,
			columnWidth: (width - 32 * 7) / 6,
		};

	if (width >= 1192)
		return {
			columns: 4,
			gapV: 12,
			gapH: 24,
			columnWidth: (width - 24 * 6) / 5,
		};

	if (width >= 960)
		return {
			columns: 3,
			gapV: 12,
			gapH: 24,
			columnWidth: (width - 24 * 5) / 4,
		};

	if (width >= 672)
		return {
			columns: 3,
			gapV: 12,
			gapH: 16,
			columnWidth: (width - 16 * 4) / 3,
		};

	return {
		columns: 2,
		gapV: 6,
		gapH: 12,
		columnWidth: Math.max(142, (width - 12 * 3) / 2),
	};
}

function getShortestColumn(colHeights) {
	let shortestIndex = 0;
	for (let i = 1; i < colHeights.length; i++) {
		if (colHeights[i] < colHeights[shortestIndex]) shortestIndex = i;
	}
	return shortestIndex;
}

// * layoutInfo 布局信息 notesCount 子元素个数 notes 子元素数组 containerEl 容器元素
function layout(layoutInfo, notesCount, notes, containerEl) {
	let nextTop, nextLeft, shortestColumn, note;

	// colHeights.length === layoutInfo.columns
	const colHeights = new Array(layoutInfo.columns).fill(0);

	for (let i = 0; i < notesCount; i++) {
		note = notes[i];

		const isAlignLeft =
			notesCount % layoutInfo.columns === 0
				? false
				: notesCount - i <= notesCount % layoutInfo.columns;

		shortestColumn = isAlignLeft
			? i % layoutInfo.columns
			: getShortestColumn(colHeights);

		// for(let j = 0; j < notesCount % layoutInfo.columns; j++) {}

		// top left 计算
		nextTop = colHeights[shortestColumn];
		nextLeft =
			shortestColumn * (layoutInfo.columnWidth + layoutInfo.gapH) +
			layoutInfo.gapH;

		// <div data-width="100" data-height="100"></div>
		const rawWidth = note.dataset.width;
		const rawHeight = note.dataset.height;

		// ??
		const coverEl = note.querySelector('.cover');
		if (coverEl) {
			coverEl.style.width = layoutInfo.columnWidth + 'px';
			coverEl.style.height =
				Math.round((layoutInfo.columnWidth / rawWidth) * rawHeight) + 'px';
			coverEl.style.borderRadius = layoutInfo.columns < 3 ? '12px' : '16px';
		}

		if (notes.length >= layoutInfo.columns) {
			note.style.transform = 'translate(' + nextLeft + 'px,' + nextTop + 'px)';
		} else {
			note.classList.add('static-layout');
			containerEl.classList.add('static-layout');
		}
		note.style.width = layoutInfo.columnWidth + 'px';
		colHeights[shortestColumn] =
			colHeights[shortestColumn] + note.clientHeight + layoutInfo.gapV;
		containerEl.style.height = Math.max.apply(null, colHeights) + 'px';
	}
}
