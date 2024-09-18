<script>
	import { Carousel, Category, CarouselSimple } from '$lib';

	import K1 from '$lib/images/kitchen/imagecompressor/k1-min.jpg';
	import K2 from '$lib/images/kitchen/imagecompressor/k2-min.jpg';
	import K3 from '$lib/images/kitchen/imagecompressor/k3-min.jpg';
	import K4 from '$lib/images/kitchen/imagecompressor/k4-min.jpg';
	import K5 from '$lib/images/kitchen/imagecompressor/k5-min.jpg';
	import K6 from '$lib/images/kitchen/imagecompressor/k6-min.jpg';
	import K7 from '$lib/images/kitchen/imagecompressor/k7-min.jpg';
	import K8 from '$lib/images/kitchen/imagecompressor/k8-min.jpg';

	import B1 from '$lib/images/bedroom/imagecompressor/b1-min.jpg';
	import B2 from '$lib/images/bedroom/imagecompressor/b2-min.jpg';
	import B3 from '$lib/images/bedroom/imagecompressor/b3-min.jpg';
	import B4 from '$lib/images/bedroom/imagecompressor/b4-min.jpg';
	import B5 from '$lib/images/bedroom/imagecompressor/b5-min.jpg';
	import B6 from '$lib/images/bedroom/imagecompressor/b6-min.jpg';
	import B7 from '$lib/images/bedroom/imagecompressor/b7-min.jpg';
	import B8 from '$lib/images/bedroom/imagecompressor/b8-min.jpg';

	const kitchenImages = [K1, K2, K3, K4, K5, K6, K7, K8];
	const kitchenCategories = [
		'Base Cabinets',
		'Wall Cabinets',
		'Pantry Cabinets',
		'Countertops',
		'Dining Tables',
		'Bar Stools',
		'Kitchen Carts',
		'Wine Racks'
	];

	const bedroomImages = [B1, B2, B3, B4, B5, B6, B7, B8];
	const bedroomCategories = [
		'Bed Frames',
		'Mattresses',
		'Nightstands',
		'Dressers',
		'Armoires',
		'Vanities',
		'Bedroom Benches',
		'Bedroom Sets'
	];

	/**
	 * @type {number}
	 */
	let screenWidth;
</script>

<svelte:window bind:innerWidth={screenWidth} />

<section class="bg-gray-300 h-[87vh] flex">
	<Carousel />
</section>

<section class="h-[100vh] flex flex-col">
	{#if screenWidth >= 500}
		<Category images={kitchenImages} categories={kitchenCategories} categoryTitle={'Kitchen'} />
		<Category images={bedroomImages} categories={bedroomCategories} categoryTitle={'Bedroom'} />
	{:else}
		<CarouselSimple items={kitchenImages} itemsCategory={kitchenCategories} title={'Kitchen'} />
		<CarouselSimple items={bedroomImages} itemsCategory={bedroomCategories} title={'Bedroom'} />
	{/if}
</section>
