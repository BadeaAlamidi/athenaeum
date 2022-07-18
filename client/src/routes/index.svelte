<script>
 import BookComponent from "$lib/components/_bookComponent.svelte";
 import {page} from "$app/stores"
 import {searchStatus} from "../lib/stores"
// import {queryParamStore} from "$lib/stores.js"
// import { onMount } from 'svelte';


 let selectValue = $page.url.searchParams.get('order') ?? 'id';
 let selectDirection = $page.url.searchParams.get('direction') ?? 'ASC';
 let bookFetch = async () => {
     const order = $page.url.searchParams.get('order') ?? 'id';
     const direction = $page.url.searchParams.get('direction') ?? 'ASC';
     const searchString = $page.url.searchParams.get('searchString')?? '';
     const tagsSearchString = $page.url.searchParams.get('tags');
     let requestURL;
     if ($page.url.searchParams.get("tag") && $page.url.searchParams.get("tag")==="true"){
        requestURL = `http://localhost:5000/api/taggedbooks?order=${order}&direction=${direction}&tags=${tagsSearchString}`;
     } else {
        requestURL = `http://localhost:5000/api/books?order=${order}&direction=${direction}&searchString=${searchString}`;
     }

     const res = await fetch(requestURL);
     return await res.json();
 }
//  onMount(async () => {
//      const res = await fetch("http://localhost:5000/api/books");
//      books = await res.json();
//      console.log(books);
//  })
 function ReOrder(){
    $page.url.searchParams.set('order',selectValue);
    $page.url.searchParams.set('direction',selectDirection);
    // window.location.href=`http://localhost:3000?order=${selectValue}&direction=${selectDirection}`
    window.location.href=$page.url.href;
 }

 function deleteBook(id) {
     const url = "http://localhost:5000/api/delete/book"
     const options = {
         method: 'POST',
         body: JSON.stringify({bookId: id}),
         headers: {
             'Content-Type': 'application/json'
         }
     }
     fetch(url, options)
         .then(res => res.json())
         .then(res => console.log(res));
     console.log("res sent");
 }

 function expand_sharable_div(){
    navigator.clipboard.writeText($page.url.href)
            .then(()=>console.log('async copy success'), ()=>console.log('async copy failed'))

    // change look as necessary:
        sharable_div.id = 'sharable-link-div_open';
        sharable_div.innerText = $page.url.href + ' Copied! (Click again to update)';
 }

 let sharable_div;

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
 #sharable-link-div_closed{
    background-color: rgb(0, 0, 0);
    display:inline;
    color: white;
 }
 #sharable-link-div-open{
    background-color: white;
    display:inline;
    color: black;
 }
</style>
<h1>Welcome to Athenaeum</h1>

{#if $searchStatus == 'ready'}
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
    <div id = sharable-link-div_closed bind:this={sharable_div} on:click={expand_sharable_div}>
        Results link...
    </div>
    <div class="grid-container">
        {#each books as {title, thumbnailUrl, id}}
        <div class="grid-items">
            <BookComponent id={id}>
                <span slot="title">{title}</span>
                <span slot="image"><img src="{thumbnailUrl}" alt="Book cover"></span>
                <button on:click={() => deleteBook(book.id)}>Delete</button>
            </BookComponent>
        </div>
        {/each}
    </div>
      {:catch error}
        <p>{error}</p>
      {/await}
    {:else}
    <span>waiting for user</span>
{/if}