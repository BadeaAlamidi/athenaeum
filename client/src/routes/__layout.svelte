<script>
	import SearchBar from "$lib/components/_search.svelte";
</script>
<nav>
	<a href="/">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
			<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
		</svg>Home
	</a>
	<!-- <a href="/about">About</a>
	<a href="/settings">Settings</a> -->
	<SearchBar/>
</nav>
<slot></slot>
<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>