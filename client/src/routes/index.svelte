<script>
 import BookComponent from "./_bookComponent.svelte";
 import {page} from "$app/stores"
 import { onMount } from 'svelte';


 let selectValue = $page.url.searchParams.get('order') ?? 'id';
 let selectDirection = $page.url.searchParams.get('direction') ?? 'ASC';
 let bookFetch = async () => {
     let order = $page.url.searchParams.get('order') ?? 'id';
     let direction = $page.url.searchParams.get('direction') ?? 'DESC';
     const res = await fetch(`http://localhost:5000/api/books?order=${order}&direction=${direction}`);
     return await res.json();
 }
//  onMount(async () => {
//      const res = await fetch("http://localhost:5000/api/books");
//      books = await res.json();
//      console.log(books);
//  })
 function ReOrder(){
    window.location.href=`http://localhost:3000?order=${selectValue}&direction=${selectDirection}`
 }
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
{#await bookFetch()}
<p>Loading Books...</p>
{:then books} 
<div>
    <label for="order">Sort by: </label>
    <select bind:value={selectValue} on:change={ReOrder}>
        <option value="title">Title</option>
        <option value="publishDate">Date published</option>
        <option value="rating">Rating</option>
        <option value="pageCount">Page Count</option>
        <option value="id">Book ID</option>
    </select>
    <label for="ASC">
        <input type="radio" id="ASC" value="ASC" name="direction" bind:group={selectDirection} on:change={ReOrder}>
        Ascending 
    </label>
    <label for="DESC">
        <input type="radio" id="DESC" value="DESC" name="direction" bind:group={selectDirection} on:change={ReOrder}>
        Descending
    </label>
</div>
<div class="grid-container">
    {#each books as book}
    <div class="grid-items">
        <BookComponent>
            <span slot="title">{book.title}</span>
            <span slot="image"><img src="{book.thumbnailUrl}" alt="Book cover"></span>
        </BookComponent>
    </div>
    {/each}
</div>
  {:catch error}
    <p>{error}</p>
  {/await}
