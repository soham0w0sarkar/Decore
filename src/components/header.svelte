<script>
	import { onMount } from 'svelte';
	import { Search, Sidebar } from '$lib';
	import {
		IconHeart,
		IconShoppingCart,
		IconSearch,
		IconLayoutSidebarLeftExpand
	} from '@tabler/icons-svelte';

	let sidebar = false;

	const toggleSidebar = () => {
		sidebar = !sidebar;
	};

	/**
	 * @param {MouseEvent} event
	 * @param event
	 */
	const closeSidebar = (event) => {
		if (
			sidebar &&
			event.target &&
			event.target instanceof HTMLElement &&
			event.target.closest('.sidebar') === null &&
			event.target.closest('.arrows') === null
		) {
			toggleSidebar();
		}
	};

	export let pathname;
	export let screenWidth;
	export const categories = [
		{ name: 'Category 1' },
		{ name: 'Category 2' },
		{ name: 'Category 3' }
	];

	onMount(() => {
		document.addEventListener('click', closeSidebar);
		return () => {
			document.removeEventListener('click', closeSidebar);
		};
	});
</script>

{#if screenWidth >= 991}
	<div class="bg-surface-50 flex items-center justify-around overflow-visible min-h-20">
		<span class="flex w-1/2 justify-evenly">
			<span class="font-bold"><a href="/">Logo</a></span>
			<span class="font-bold">Products</span>
		</span>
		<Search />
		<span class="flex gap-2 w-10">
			{#if pathname !== '/login'}
				<span class="w-2/5"><a href="/login">Login</a></span>
			{/if}
			<IconHeart />
			<IconShoppingCart />
		</span>
	</div>
{:else}
	<div class="bg-surface-50 flex items-center justify-around overflow-visible min-h-20">
		<span class="flex gap-4 w-1/2 justify-start p-4">
			<button on:click={toggleSidebar}>
				<IconLayoutSidebarLeftExpand />
			</button>
			{#if sidebar}
				<div class="sidebar">
					<Sidebar />
				</div>
			{/if}
			<span class="font-bold"><a href="/">Logo</a></span>
		</span>
		<span class="flex gap-4 w-1/2 justify-end p-4">
			<IconSearch />
			<IconHeart />
			<IconShoppingCart />
		</span>
	</div>
{/if}

<style>
	div {
		height: 70%;
		width: 100%;
		padding: 2px;
	}
</style>
