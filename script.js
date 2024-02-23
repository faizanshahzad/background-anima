const { Anchor, Ellipse, Shape } = Zdog;

(() => {
	const ease = (t) => {
		if ((t *= 2) < 1) return 0.5 * t * t * t * t * t;
		return 0.5 * ((t -= 2) * t * t * t * t + 2);
	};

	const quartOut = (t) => {
		return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
	};

	const backInOut = (t) => {
		const s = 1.70158 * 1.525;
		if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
		return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
	};

	const PI = Math.PI;
	const TAU = PI * 2;

	const colors = {
		belt: ["hsl(220 14% 25%)", "hsl(210 20% 91%)"],
		box: ["hsl(216 9% 32%)", "hsl(219 9% 36%)", "hsl(220 8% 41%)"],
		star: ["hsl(159 61% 63%)", "hsl(169 82% 44%)"],
		assembly: [
			"hsl(220 9% 19%)",
			"hsl(219 9% 46%)",
			"hsl(210 20% 91%)",
			"hsl(169 82% 44%)"
		]
	};

	const strokes = {
		belt: [6, 0.5],
		star: [4, 1],
		box: 3
	};

	const radius = 50;
	const spread = 12;

	const root = new Anchor();

	new Ellipse({
		addTo: root,
		color: colors.belt[0],
		stroke: strokes.belt[0],
		diameter: radius * 2,
		rotate: {
			x: TAU / 4
		}
	});

	new Ellipse({
		addTo: root,
		color: colors.belt[1],
		stroke: strokes.belt[1],
		diameter: radius * 2,
		translate: {
			y: (strokes.belt[0] / 2) * -1
		},
		rotate: {
			x: TAU / 4
		}
	});

	new Shape({
		addTo: root,
		color: colors.box[0],
		stroke: strokes.box,
		fill: true,
		path: [
			{ x: spread, y: 0, z: 0 },
			{ x: spread * -1, y: 0, z: 0 },
			{ x: spread * -1, y: spread * 2 * -1, z: 0 },
			{ x: spread, y: spread * 2 * -1, z: 0 }
		]
	});

	new Shape({
		addTo: root,
		color: colors.box[1],
		stroke: strokes.box,
		fill: true,
		path: [
			{ x: spread * -1, y: spread * 2 * -1, z: 0 },
			{ x: spread * -1, y: spread * 2 * -1, z: (radius + spread / 2) * -1 },
			{ x: spread, y: spread * 2 * -1, z: (radius + spread / 2) * -1 },
			{ x: spread, y: spread * 2 * -1, z: 0 }
		]
	});

	new Shape({
		addTo: root,
		color: colors.box[2],
		stroke: strokes.box,
		fill: true,
		path: [
			{ x: spread * -1, y: spread * 2 * -1, z: (radius + spread / 2) * -1 },
			{ x: spread, y: spread * 2 * -1, z: (radius + spread / 2) * -1 },
			{ x: spread, y: 0, z: (radius + spread / 2) * -1 },
			{ x: spread * -1, y: 0, z: (radius + spread / 2) * -1 }
		]
	});

	const path = (() => {
		const [r1, r2] = [spread * 0.35, spread * 0.6];
		return Array(10)
			.fill()
			.map((_, i, { length }) => {
				const r = i % 2 === 0 ? r1 : r2;
				const angle = TAU / 4 + (TAU / length) * i;
				const x = Math.cos(angle) * r;
				const y = Math.sin(angle) * r;

				return { x, y };
			});
	})();

	const pathSmall = (() => {
		const [r1, r2] = [spread * 0.16, spread * 0.25];
		return Array(10)
			.fill()
			.map((_, i, { length }) => {
				const r = i % 2 === 0 ? r1 : r2;
				const angle = TAU / 4 + (TAU / length) * i;
				const x = Math.cos(angle) * r;
				const y = Math.sin(angle) * r;

				return { x, y };
			});
	})();

	const star = new Shape({
		addTo: root,
		color: colors.star[0],
		stroke: strokes.star[0],
		fill: true,
		path,
		translate: {
			y: spread * -1,
			z: strokes.star[0] / 2
		}
	});

	const stars = new Anchor({
		addTo: root,
		translate: {
			y: spread * -1,
			z: radius * -1
		}
	});

	new Shape({
		addTo: stars,
		color: colors.star[1],
		stroke: strokes.star[1],
		fill: true,
		path: pathSmall,
		translate: {
			x: spread * 1.5,
			y: (spread / 2) * -1
		}
	});

	new Shape({
		addTo: stars,
		color: colors.star[1],
		stroke: strokes.star[1],
		fill: true,
		path: pathSmall,
		translate: {
			x: spread * 1.5,
			y: spread / 2
		}
	});

	new Shape({
		addTo: stars,
		color: colors.star[1],
		stroke: strokes.star[1],
		fill: true,
		path: pathSmall,
		translate: {
			x: spread * 1.8 * -1,
			y: (spread / 2) * -1
		}
	});

	new Shape({
		addTo: stars,
		color: colors.star[1],
		stroke: strokes.star[1],
		fill: true,
		path: pathSmall,
		translate: {
			x: spread * 1.8 * -1,
			y: spread / 2
		}
	});

	const center = new Anchor({
		addTo: root
	});

	const offset = new Anchor({
		addTo: center,
		translate: {
			y: (15.5 + strokes.belt[0] / 2 + strokes.belt[1] / 2) * -1,
			z: radius
		}
	});

	const squircleSmall = new Shape({
		fill: true,
		path: [
			{ x: 0, y: 0 },
			{
				bezier: [
					{ x: 0.7, y: 0 },
					{ x: 0.8, y: 0.1 },
					{ x: 0.8, y: 1.6 }
				]
			},
			{
				bezier: [
					{ x: 0.8, y: 3.1 },
					{ x: 0.7, y: 3.2 },
					{ x: 0, y: 3.2 }
				]
			},
			{
				bezier: [
					{ x: -0.7, y: 3.2 },
					{ x: -0.8, y: 3.1 },
					{ x: -0.8, y: 1.6 }
				]
			},
			{
				bezier: [
					{ x: -0.8, y: 0.1 },
					{ x: -0.7, y: 0 },
					{ x: 0, y: 0 }
				]
			}
		]
	});

	const squircleLarge = new Shape({
		fill: true,
		path: [
			{ x: 0, y: 0 },
			{
				bezier: [
					{ x: 7, y: 0 },
					{ x: 7.5, y: 0.5 },
					{ x: 7.5, y: 5 }
				]
			},
			{
				bezier: [
					{ x: 7.5, y: 9.5 },
					{ x: 7, y: 10 },
					{ x: 0, y: 10 }
				]
			},
			{
				bezier: [
					{ x: -7, y: 10 },
					{ x: -7.5, y: 9.5 },
					{ x: -7.5, y: 5 }
				]
			},
			{
				bezier: [
					{ x: -7.5, y: 0.5 },
					{ x: -7, y: 0 },
					{ x: 0, y: 0 }
				]
			}
		]
	});

	const zOffsets = [1, 4];

	const antenna = new Anchor({
		addTo: offset
	});

	const handles = new Anchor({
		addTo: offset
	});

	const screen = new Anchor({
		addTo: offset
	});

	const face = new Anchor({
		addTo: offset
	});

	new Shape({
		addTo: antenna,
		color: colors.assembly[2],
		stroke: 3.2
	});

	new Shape({
		addTo: antenna,
		color: colors.assembly[0],
		stroke: 1,
		path: [{ y: 1.5 }, { y: 3 }]
	});

	screen.translate.y = 3;

	squircleLarge.copy({
		addTo: screen,
		color: colors.assembly[1]
	});

	squircleLarge.copy({
		addTo: screen,
		color: colors.assembly[0],
		translate: {
			y: 1.25,
			z: zOffsets[0]
		},
		scale: {
			x: 0.825,
			y: 0.725
		}
	});

	new Shape({
		addTo: screen,
		color: colors.assembly[2],
		fill: true,
		path: [
			{ x: 3, y: 0 },
			{ x: -3, y: 0 },
			{
				arc: [
					{ x: -3, y: 3 },
					{ x: 0, y: 3 }
				]
			},
			{
				arc: [
					{ x: 3, y: 3 },
					{ x: 3, y: 0 }
				]
			}
		],
		translate: {
			y: 9.25,
			z: zOffsets[0] * -1
		}
	});

	handles.translate.y = 6.4;

	[-1, 1].forEach((direction) => {
		squircleSmall.copy({
			addTo: handles,
			color: colors.assembly[2],
			translate: {
				x: 8 * direction,
				z: zOffsets[0] * -1
			}
		});
	});

	face.translate.y = 9.75;
	face.translate.z = zOffsets[1];

	new Shape({
		addTo: face,
		color: colors.assembly[3],
		stroke: 0.5,
		fill: true,
		path: [
			{ x: 1, y: 0 },
			{ x: -1, y: 0 },
			{
				arc: [
					{ x: -1, y: 1 },
					{ x: 0, y: 1 }
				]
			},
			{
				arc: [
					{ x: 1, y: 1 },
					{ x: 1, y: 0 }
				]
			}
		]
	});

	[-1, 1].forEach((direction) => {
		squircleSmall.copy({
			addTo: face,
			color: colors.assembly[3],
			stroke: 0.5,
			translate: {
				x: 3.5 * direction,
				y: -4
			}
		});
	});

	const element = document.querySelector("canvas");
	const { width, height } = element;
	const context = element.getContext("2d");
	const zoom = 4.7;

	context.lineCap = "round";
	context.lineJoin = "round";

	const render = () => {
		context.clearRect(0, 0, width, height);
		context.save();
		context.translate(width / 2, height / 2);
		context.scale(zoom, zoom);
		root.renderGraphCanvas(context);
		context.restore();
	};

	root.translate.y = 12;
	root.rotate.x = -0.15;
	root.rotate.y = 0.05;
	stars.scale = 0;

	root.updateGraph();
	render();

	const steps = [
		{
			anchor: screen,
			label: "High-def display"
		},
		{
			anchor: handles,
			label: "Comfy handles"
		},
		{
			anchor: antenna,
			label: "Vital sensor"
		},
		{
			anchor: face,
			label: "Revved up engine"
		}
	];

	let index = 0;
	let state = "wait";
	let frame = null;
	let timeout = null;
	let counter = 0;
	const thresholds = [60, 120];
	let direction = 1;
	const translateY = {
		offset: offset.translate.y,
		face: face.translate.y
	};

	const label = document.querySelector("p");
	const buttonNext = document.querySelector('button[data-action="next"]');
	const buttonPrevious = document.querySelector('button[data-action="prev"]');

	const updateControls = () => {
		if (index < steps.length - 1) buttonNext.removeAttribute("disabled");
		else buttonNext.setAttribute("disabled", "");

		if (index > 0) buttonPrevious.removeAttribute("disabled");
		else buttonPrevious.setAttribute("disabled", "");
	};

	const updateUI = () => {
		for (let i = 0; i < steps.length; i++) {
			const visible = i <= index;
			for (const child of steps[i].anchor.children) {
				child.visible = visible;
			}
		}
		root.updateGraph();
		render();

		label.textContent = steps[index].label;
	};

	const animateOut = () => {
		counter++;
		const e = ease(counter / thresholds[1]);

		center.rotate.y = e * PI * direction;

		root.updateGraph();
		render();

		if (counter >= thresholds[1]) {
			updateUI();

			counter = 0;

			if (direction === 1) {
				const delay = label.textContent.length * 100;
				timeout = setTimeout(() => {
					frame = requestAnimationFrame(animateStep);
					clearTimeout(timeout);
				}, delay);
			} else {
				frame = requestAnimationFrame(animateIn);
			}
		} else {
			frame = requestAnimationFrame(animateOut);
		}
	};

	const animateStep = () => {
		counter++;
		const t1 = Math.min(1, (counter / thresholds[0]) * 3);
		const t2 = counter / thresholds[0];
		const e = ease(t2);

		star.scale = 1 - Math.sin(t1 * PI) * 0.2;

		stars.scale = quartOut(t2);
		for (const star of stars.children) {
			star.scale = 1 - e;
			star.stroke = 1 - e;
		}

		root.updateGraph();
		render();

		if (counter >= thresholds[0]) {
			stars.scale = 0;

			root.updateGraph();
			render();

			counter = 0;
			frame = requestAnimationFrame(animateIn);
		} else {
			frame = requestAnimationFrame(animateStep);
		}
	};

	const animateIn = () => {
		counter++;
		const e = ease(counter / thresholds[1]);

		center.rotate.y = e * PI * direction + PI;

		root.updateGraph();
		render();

		if (counter >= thresholds[1]) {
			counter = 0;

			if (index === steps.length - 1) {
				frame = requestAnimationFrame(animateEnd);
			} else {
				updateControls();
				state = "wait";
				cancelAnimationFrame(frame);
			}
		} else {
			frame = requestAnimationFrame(animateIn);
		}
	};

	const animateEnd = () => {
		counter++;
		const l = Math.sin(backInOut(counter / thresholds[0]) * PI);

		offset.translate.y = translateY.offset - l;
		face.translate.y = translateY.face - l;
		offset.scale = 1 + l * 0.05;

		root.updateGraph();
		render();

		if (counter >= thresholds[0]) {
			counter = 0;

			updateControls();
			state = "wait";
			cancelAnimationFrame(frame);
		} else {
			frame = requestAnimationFrame(animateEnd);
		}
	};

	const handleStart = () => {
		buttonPrevious.setAttribute("disabled", "");
		buttonNext.setAttribute("disabled", "");
		state = "animate";
		animateOut();
	};

	const handleNext = () => {
		if (state !== "wait" || index >= steps.length - 1) return;

		direction = 1;
		index++;
		handleStart();
	};

	const handlePrevious = () => {
		if (state !== "wait" || index <= 0) return;

		direction = -1;
		index--;
		handleStart();
	};

	updateUI();
	updateControls();

	label.setAttribute("aria-live", "polite");
	label.setAttribute("role", "status");
	buttonNext.addEventListener("click", handleNext);
	buttonPrevious.addEventListener("click", handlePrevious);
})();
