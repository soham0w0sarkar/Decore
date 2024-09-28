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
	let showSearchModal = false;

	// Toggle Sidebar visibility
	const toggleSidebar = () => {
		sidebar = !sidebar;
	};

	// Toggle Search Modal visibility
	const toggleSearchModal = () => {
		showSearchModal = !showSearchModal;
	};

	/**
	 * Close sidebar when clicking outside
	 * @param {MouseEvent} event
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

	// Clean up event listeners
	onMount(() => {
		document.addEventListener('click', closeSidebar);
		return () => {
			document.removeEventListener('click', closeSidebar);
		};
	});

	export let pathname;
	export let screenWidth;
	export const categories = [
		{ name: 'Category 1' },
		{ name: 'Category 2' },
		{ name: 'Category 3' }
	];
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
			<!-- Wishlist (Heart Icon) -->
			<button on:click={() => window.location.href = '/wishlist'} aria-label="Wishlist">
				<IconHeart />
			</button>
			<!-- Shopping Cart -->
			<button on:click={() => window.location.href = '/cart'} aria-label="Shopping Cart">
				<IconShoppingCart />
			</button>
		</span>
	</div>
{:else}
	<div class="bg-surface-50 flex items-center justify-around overflow-visible min-h-20">
		<span class="flex gap-4 w-1/2 justify-start p-4">
			<button on:click={toggleSidebar} aria-label="Open Sidebar">
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
			<!-- Search Icon -->
			<button on:click={toggleSearchModal} aria-label="Open Search">
				<IconSearch />
			</button>
			<!-- Wishlist -->
			<button on:click={() => window.location.href = '/wishlist'} aria-label="Wishlist">
				<IconHeart />
			</button>
			<!-- Shopping Cart -->
			<button on:click={() => window.location.href = '/cart'} aria-label="Shopping Cart">
				<IconShoppingCart />
			</button>
		</span>
	</div>

	{#if showSearchModal}
		<Search />
	{/if}
{/if}

<style>
	div {
		height: 70%;
		width: 100%;
		padding: 2px;
	}
</style>
