<script>
 import BookComponent from "./_bookComponent.svelte";
 import { onMount } from 'svelte';

 let books = [];
 onMount(async () => {
     const res = await fetch("http://localhost:5000/books");
     books = await res.json();
     console.log(books);
 })
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#each books as book}
    <p>{book.title}</p>
    <BookComponent>
        <span slot="title">{book.title}</span>
        <span slot="image"><img src="{book.thumbnailUrl}"></span>
    </BookComponent>
{:else}
    <p>Loading Books...</p>
{/each}
