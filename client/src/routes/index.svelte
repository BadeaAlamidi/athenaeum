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
<h1>Welcome to Athenaeum</h1>

{#each books as book}
    <BookComponent>
        <span slot="title">{book.title}</span>
        <span slot="image"><img src="{book.thumbnailUrl}"></span>
    </BookComponent>
{:else}
    <p>Loading Books...</p>
{/each}
