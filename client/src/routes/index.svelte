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
<style>
 .grid-container {
     display: grid;
     grid-template-columns: auto auto auto;
     grid-template-rows: auto;
     grid-gap: 0.5rem;
 }
 .grid-items img {
     width: 200px;
     height: 300px;
     object-fit: cover;
 }
</style>
<h1>Welcome to Athenaeum</h1>
<div class="grid-container">
{#each books as book}
  <div class="grid-items">
    <BookComponent>
        <span slot="title">{book.title}</span>
        <span slot="image"><img src="{book.thumbnailUrl}"></span>
    </BookComponent>
  </div>
{:else}
    <p>Loading Books...</p>
{/each}
</div>
