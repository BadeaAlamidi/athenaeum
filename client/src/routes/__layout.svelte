<script>
	import SearchBar from "$lib/components/_search.svelte";
	import Logo from "$lib/components/_logo.svelte"
	import { goto } from "$app/navigation";

</script>
<a href = "#navbar">
	<Logo />
</a>
<nav id=navbar>
	<span>
		<a href="/">
			<svg id="homeIcon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
				<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
			</svg>Home
		</a>
	</span>
	<!-- <a href="/about">About</a>
	<a href="/settings">Settings</a> -->
	<SearchBar/>
</nav>
<slot></slot>
<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	nav{
		color:white;
		background-color: black;
		top:0;
		position: sticky;
		padding: 10px;
		z-index: 1;
	}
	a{
		font-size: 1.5rem;
		display:flex;
		align-items: center;
		transition:color 1s cubic-bezier(0.075, 0.82, 0.165, 1);
	}
	svg{
		width : 1.5rem;
		height : 1.5rem;
	}
	a:hover{
		color:rgb(255,0,129);
	}
	:root{
		scroll-behavior : smooth;
	}
</style>