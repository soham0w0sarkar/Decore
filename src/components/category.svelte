<script>
	export let categoryTitle;
	export let images;
	export let categories;
</script>

<div class="h-screen w-full flex flex-col">
	<h1 class="w-full text-center border-b font-semibold text-2xl p-4 sm:text-3xl">
		Shop By Category - {categoryTitle}
	</h1>
	<div class="flex flex-wrap justify-center items-center p-4">
		{#each images as image, index}
			<div class="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
				<img
					src={image}
					alt={categories[index]}
					class="w-full h-64 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
				/>
				<div
					class="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
				>
					<p class="text-white text-lg sm:text-xl md:text-2xl font-semibold">{categories[index]}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
