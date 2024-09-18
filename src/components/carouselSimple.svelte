<script>
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onDestroy } from 'svelte';

	export let title = '';
	/**
	 * @type {Array<string>}
	 */
	export let itemsCategory = [];
	/**
	 * @type {Array<string>}
	 */
	export let items = [];

	// Track the current index of the carousel
	let currentIndex = 0;

	// Function to move to the previous slide
	const prevSlide = () => {
		currentIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
	};

	// Function to move to the next slide
	const nextSlide = () => {
		currentIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
	};

	// Set up an interval to automatically move to the next slide every 10 seconds
	const interval = setInterval(nextSlide, 10000);

	// Clean up the interval when the component is destroyed
	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="relative w-full h-1/2 overflow-hidden p-4">
	<h1 class="w-full flex justify-center items-center font-semibold">Shop By Category - {title}</h1>
	<div
		class="flex items-center h-[90%] transition-transform duration-500 ease-in-out"
		style="transform: translateX({-currentIndex * 100}%);"
	>
		{#each items as item}
			<div class="w-full h-[80%] flex-shrink-0">
				<img src={item} alt="Carousel" class="w-full h-full object-cover" />
			</div>
		{/each}
	</div>
	<h1
		class="absolute bottom-4 right-1/2 transform translate-x-1/2 font-bold leading-4"
		transition:fade={{ duration: 800, easing: cubicOut }}
	>
		{itemsCategory[currentIndex]}
	</h1>
	<button
		class="absolute w-[40px] h-[40px] top-1/2 transform -translate-y-1/2 left-1 bg-[rgba(220,220,220,0.4)] text-white p-2 rounded-full"
		on:click={prevSlide}
	>
		❮
	</button>
	<button
		class="absolute w-[40px] h-[40px] top-1/2 transform -translate-y-1/2 right-1 bg-[rgba(220,220,220,0.4)] text-white p-2 rounded-full"
		on:click={nextSlide}
	>
		❯
	</button>
</div>
