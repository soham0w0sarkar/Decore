<script lang="ts">
	import K1 from '$lib/images/kitchen/imagecompressor/k1-min.jpg';

	export let product;
</script>

<svelte:head>
	<title>Search Result</title>
</svelte:head>

<div
	class="h-96 w-60 rounded-md bg-white shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
>
	<img src={K1} alt={product.name} class="object-cover w-full h-[70%]" />

	<div class="p-2">
		<h2 class="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
		<p class="text-sm text-gray-600 line-clamp-2">{product.description}</p>

		<div class="mt-2 flex justify-between items-center">
			<p class="text-md font-bold text-gray-800">${product.price}</p>
			<button
				class="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
			>
				Add to Cart
			</button>
		</div>
	</div>
</div>
