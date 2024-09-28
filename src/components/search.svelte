<script lang="ts">
	import { IconSearch } from '@tabler/icons-svelte';
	import { writable, derived } from 'svelte/store';

	let input = writable('');
	let isFocused = writable(false);
	let suggestions = writable<string[]>([]);

	// Debounce helper to reduce API calls
	function debounce(func: Function, wait: number) {
		let timeout: ReturnType<typeof setTimeout>;
		return (...args: any[]) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => func(...args), wait);
		};
	}

	// Custom sort function to prioritize suggestions based on the input
	function customSort(arr: string[], order: string): string[] {
		const orderMap: { [key: string]: number } = {};
		for (let i = 0; i < order.length; i++) {
			orderMap[order[i]] = i;
		}

		return arr.sort((a, b) => {
			for (let i = 0; i < Math.min(a.length, b.length); i++) {
				const charA = a[i].toLowerCase();
				const charB = b[i].toLowerCase();

				if (orderMap[charA] !== orderMap[charB]) {
					return (orderMap[charA] || -1) - (orderMap[charB] || -1);
				}
			}
			return a.length - b.length;
		});
	}

	// Fetch search suggestions based on input query
	const search = debounce(async (query = '') => {
		if (!query) return;
		try {
			const res = await fetch(`/search/api/?q=${query}`);
			if (!res.ok) throw new Error('Failed to fetch suggestions');
			const data = await res.json();
			suggestions.set(data.map((item: { name: string }) => item.name));
		} catch (error) {
			console.error(error);
			suggestions.set([]);
		}
	}, 300); // 300ms debounce

	// Filter and sort suggestions based on input
	const filteredSuggestions = derived([input, suggestions], ([$input, $suggestions]) =>
		customSort(
			$suggestions.filter((suggestion) =>
				suggestion.toLowerCase().includes($input.toLowerCase())
			),
			$input.toLowerCase()
		)
	);

	// Watch input value and trigger search when updated
	$: $input, search($input);
</script>

<span
	class="{ $isFocused
		? 'bg-transparent border-1 border-gray-300'
		: 'bg-gray-100'} flex w-full md:w-1/2 lg:w-1/4 h-10 md:h-12 rounded-md m-0 p-0 transition-all ml-auto mr-4 md:mr-10 relative"
>
	<span class="flex justify-end items-center w-[10%]">
		<IconSearch class="h-1/2" color="gray" stroke={1} />
	</span>
	<input
		type="text"
		class="h-full ml-[2%] w-[88%] bg-transparent border-none outline-none focus:border-none focus:ring-0 text-xs md:text-xs lg:text-xs"
		placeholder="Search products by product, category or collection"
		onfocus={() => isFocused.set(true)}
		onblur={() => setTimeout(() => isFocused.set(false), 100)}
		bind:value={$input}
	/>

	{#if $isFocused && $filteredSuggestions.length > 0}
		<ul
			class="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-[10000]"
		>
			{#each $filteredSuggestions as suggestion}
				<li class="px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs md:text-sm lg:text-base">
					{suggestion}
				</li>
			{/each}
		</ul>
	{/if}
</span>
