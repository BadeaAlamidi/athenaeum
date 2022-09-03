<script context="module">
	import {browser} from '$app/env'

	//inspired by mdn's example for IntersectionObserver:
	function generateThresholds(){
		const res = [];
		const dissections = 200;
		for (let i = 1; i<= dissections; ++i){
			res.push(i/dissections);
		}
		return res;
	}
	const options = {
		root: null,
		margins: "0px",
		threshold: generateThresholds(),
	};

	let observer;


	if (browser) {
		observer= new IntersectionObserver((entries)=>{
			//only one element is attached to this observer:
			let detail = entries[0].intersectionRatio;
			entries[0].target.dispatchEvent(new CustomEvent('visible',{detail}))
		}, options);
	}
</script>
<script>
	import SearchBar from "$lib/components/_search.svelte";
	import Logo from "$lib/components/_logo.svelte"
	import { page } from "$app/stores";
	import anthonyav from "$lib/assets/anthony.png";
	import badeaav from "$lib/assets/2b.png";
	import {onMount} from "svelte"

	let navElement;
	let footElement;
	//footer css variable:
	let rotValue;
	//auto scroll into results if search parameters were provided:
	//DOES NOT WORK. THERE IS NO REACTIVE SYMBOL IN THE STATEMENT
	$: if (navElement  && window.location.pathname == '/' && window.location.search){
		console.log('reaction triggered in __layout.svelte')
		navElement.scrollIntoView();
	}
	onMount(()=>{
		observer.observe(footElement);

		return {destroy: ()=>observer.unobserve(footElement)}
	});

	function updateRot({detail:ratio}){
		// don't rotate if viewport is bigger than document element:
		const documentElement = document.documentElement;
		if (documentElement.scrollHeight <= window.innerHeight) {
			rotValue=0; 
			return;
		}
		rotValue = 90 - (90*ratio);
	}
	//ensures rotValue is 0 when the user has scrolled to bottom. Added since intersection observer
	// does not trigger once the footer is full in viewport (threshold of 1)
	function testBottom(){
		if (Math.abs(document.documentElement.scrollHeight - window.innerHeight
			 - document.documentElement.scrollTop) < 1) rotValue = 0;
	}
</script>
<svelte:window on:scroll={testBottom}/>
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
<footer class="bg-black block relative p-5 overflow-hidden" style:max-height=100vh style:z-index=1
	bind:this={footElement} on:visible={updateRot}>
	<span id=header class="text-white m-auto flex items-center justify-center" >Developed by:</span>
	<address class="text-white flex" style:grid-area=addr1 style:gap=10px style:--rot={rotValue + 'deg'}>
		<img src="{badeaav}" style:width=3rem style:height=3rem alt=badeasav class=object-contain/>
		<div>
			Badea Alamidi 
			<a href="https://github.com/badeaalamidi" style:transition="color 300ms">
				https://github.com/BadeaAlamidi
			</a>
		</div>
	</address>
	<address class="text-white flex" style:grid-area=addr2 style:gap=10px style:--rot={"-" + rotValue + 'deg'}>
		<img style:width=3rem style:height=3rem src="{anthonyav}" alt=anthonysav/>
		<div>
			Anthony Chavez 
			<a href="https://github.com/anthonychavezdev" style:transition="color 300ms">
				https://github.com/anthonychavezdev
			</a>
		</div>
	</address>
	<span class="mt-auto mb-0 bottom-footer-info flex flex-wrap-reverse justify-center items-center"
	 style:width=100% style:column-gap=100px style:grid-area=info
	>		
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
	footer{
		display: grid;
		grid-template:
		'head '  1fr
		'addr1' 1.5fr
		'addr2' 1.5fr
		'.    ' 2fr
		'info'  1fr
		/ 1fr;
	}
	footer>address{
		max-width:375px;
		margin: 0 auto;
		background-color: #1F2530;
		transition: transform 200ms linear;
	}
		footer>address:nth-child(2){
			transform-origin: 150%;
			transform: rotate(var(--rot));
		}
		footer>address:nth-child(3){
			transform-origin: -50%;
			transform: rotate(var(--rot));
		}
	footer #header{
		grid-area:head;
		z-index:5;
		backdrop-filter: blur(80px);
		background-color:#1F2530;
		opacity:0.5;
		width:100%;
		max-width: 375px;
		height:100%;
	}
	address img{
		object-fit: contain;
	}
</style>