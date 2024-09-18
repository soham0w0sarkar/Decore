<script lang="ts">
	import { Product } from '$lib';

	const propsData = $props();
</script>

<div class="flex-1 overflow-y-scroll flex gap-11 p-4 flex-wrap">
	{#each propsData.data.products as product}
		<Product {product} />
		<Product {product} />
		<Product {product} />
		<Product {product} />
		<Product {product} />
		<Product {product} />
		<Product {product} />
		<Product {product} />
	{/each}
</div>
