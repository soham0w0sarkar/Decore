<script lang="ts">
	import { invalidate } from '$app/navigation';
	import '@fontsource-variable/noto-serif';
	import { Header, Links, Loader } from '$lib';
	import { page } from '$app/stores';
	import '../app.css';
	import '../styles/global.css';

	const { data: propsData, children } = $props();
	const { supabase, session } = propsData;

	let pathname = $state('');
	let loading = $state(false);
	let screenWidth = $state(0);

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		page.subscribe((value) => {
			({ pathname } = value.url);
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:window bind:innerWidth={screenWidth} />

<Loader {loading} />

<div class="box-border min-h-[100vh] flex flex-col">
	<header class="h-[13vh] flex-shrink-0 flex justify-center flex-col shadow-md overflow-visible">
		<Header {pathname} {screenWidth} />

		{#if pathname === '/' && screenWidth >= 991}
			<Links />
		{/if}
	</header>
	{@render children()}
</div>
