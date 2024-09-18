<script>
	let options = ['New Arrivals', 'Sale', 'Furniture', 'Kitchen', 'Combos'];
</script>

<div class="bg-black flex justify-evenly items-center">
	{#each options as option}
		<a href="/" class="text-white font-medium">{option}</a>
	{/each}
</div>

<style>
	div {
		height: 30%;
		width: 100%;
		padding: 2px;
	}
</style>
