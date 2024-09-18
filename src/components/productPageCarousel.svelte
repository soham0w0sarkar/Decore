<script>
	import { onDestroy } from 'svelte';

	/**
	 * @type {string[]}
	 */
	export let products = [];
	export let screenWidth = 1000;

	// Variable to manage animation state
	let animationClass = '';

	// Function to handle automatic scrolling
	function autoScroll() {
		scrollDown(); // Automatically scroll down every 10 seconds
	}

	// Start the automatic scrolling when the component is mounted
	const interval = setInterval(autoScroll, 10000);

	// Function to handle clicking the "up" button
	function scrollUp() {
		if (products.length <= 1) return; // No animation needed for a single item

		// Set animation direction
		animationClass = 'slide-right';

		const last = products.pop();
		if (last) products = [last, ...products];

		resetAnimation();
	}

	// Function to handle clicking the "down" button
	function scrollDown() {
		if (products.length <= 1) return; // No animation needed for a single item

		// Set animation direction
		animationClass = 'slide-left';

		// Move the first element to the end
		const first = products.shift();
		if (first) products = [...products, first];

		resetAnimation();
	}

	// Reset animation state after transition
	function resetAnimation() {
		setTimeout(() => {
			animationClass = '';
		}, 300); // Duration of animation
	}

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="h-full flex justify-evenly items-center relative">
	{#if screenWidth >= 991}
		<div class="h-full w-[25%] relative overflow-hidden">
			<div
				class="flex flex-col items-center gap-4 h-full transition-transform duration-300 ease-in-out"
				style="transform: translateY(-20%);"
			>
				{#each products as product, index}
					<div class="h-[20%] w-20 flex-shrink-0">
						<img src={product} alt={`image${index + 1}`} class="w-full h-full object-cover" />
					</div>
				{/each}
			</div>
			<button
				on:click={scrollUp}
				class="absolute top-0 left-1/2 transform -translate-x-1/2 cursor-pointer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8 text-gray-500 hover:text-black"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
				</svg>
			</button>
			<button
				on:click={scrollDown}
				class="absolute bottom-0 left-1/2 transform -translate-x-1/2 cursor-pointer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8 text-gray-500 hover:text-black"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
		</div>
	{/if}
	<div
		class={`w-full h-full relative overflow-hidden ${screenWidth <= 768 ? 'flex justify-center items-center' : ''}`}
	>
		<div
			class={`w-full h-full flex items-center justify-center transition-transform duration-300 ease-in-out ${animationClass}`}
		>
			<img src={products[0]} alt="main" class="w-full h-full object-cover" />
		</div>
	</div>
</div>

<style>
	/* Animations */
	@keyframes slideOutRight {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-100%);
		}
	}

	@keyframes slideInLeft {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(0);
		}
	}

	.slide-right img {
		animation: slideOutRight 0.3s ease forwards;
	}

	.slide-left img {
		animation: slideInLeft 0.3s ease forwards 0.15s; /* Slight delay for the incoming image */
	}
</style>
