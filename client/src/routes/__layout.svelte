<script>
	import SearchBar from "$lib/components/_search.svelte";
</script>
<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/settings">Settings</a>
	<SearchBar/>
</nav>
<slot></slot>