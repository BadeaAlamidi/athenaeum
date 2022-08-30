<script>
	import SearchBar from "$lib/components/_search.svelte";
	import Logo from "$lib/components/_logo.svelte"
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	let navElement;
	//auto scroll into results if search parameters were provided:
	$: if (navElement  && window.location.pathname == '/' && window.location.search){
		navElement.scrollIntoView();
	}
</script>
{#if $page.url.pathname === '/'}
	<Logo on:click={()=>{navElement.scrollIntoView()}} />
{/if}
<nav id=navbar bind:this={navElement}>
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
<footer class="bg-black block relative p-5" style:height=30vh style:z-index=1>
	<div class="mb-auto block">textContent</div>
	<span class="mt-auto mb-0 bottom-footer-info flex flex-wrap-reverse justify-center items-center"
	 style:width=100% style:gap=10px
	>
		<span class=dummy></span>
		<span style:color=white>© ATHENAEUM, Inc.</span>
		<a style:color=white href="https://github.com/BadeaAlamidi/athenaeum"
			class="flex items-center" style:gap=0.5rem
		>
			<span id=github-svg style:width=3rem style:height=3rem class=bg-white ></span>
				Find this project on GitHub
		</a>
	</span>
</footer>
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
	nav a{
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
	/* footer>span>span:last-child{ */
	#github-svg{
		-webkit-mask: url("$lib/assets/github.svg");
		mask: url("$lib/assets/github.svg");
		mask-repeat: no-repeat;
		-webkit-mask-repeat: no-repeat;
	}
</style>