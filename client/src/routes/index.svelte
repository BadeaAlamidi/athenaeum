<script>
 import Modal from "$lib/components/_modal.svelte";
 import BookComponent from "$lib/components/_bookComponent.svelte";
 import {page} from "$app/stores"
 import {searchStatus} from "../lib/stores"
//SVGs
 import noCoverUrl from '$lib/assets/no-cover.svg'

 let modal;
 let files;
 let newBook = {
     isbn10: "",
     isbn13: "",
     subtitle: "",
     rating: "",
     maturityRating: "",
     thumbnailUrl: "",
     smallThumbnailUrl: "",
     language: "",
     publishDate: new Date(),
     pageCount: "",
     description: "",
     author: "",
     title: "",
 };

 let selectValue = $page.url.searchParams.get('order') ?? 'id';
 let selectDirection = $page.url.searchParams.get('direction') ?? 'ASC';
 let collapsed = ($page.url.searchParams.has('direction') || $page.url.searchParams.has('direction'))??
                 false;
 let bookFetch = async () => {
    const order = $page.url.searchParams.get('order') ?? 'id';
     const direction = $page.url.searchParams.get('direction') ?? 'ASC';
     const searchString = $page.url.searchParams.get('searchString')?? '';
     const tagsSearchString = $page.url.searchParams.get('tags');
     const authSearchString = $page.url.searchParams.get('authors');
     
     const requestURL = new URL(window.location.href);
     requestURL.searchParams.set('order',order);
     requestURL.searchParams.set('direction',direction);
     if ($page.url.searchParams.get("tag")==="true"){
        requestURL.pathname = '/api/taggedbooks';
        requestURL.searchParams.set('tags',tagsSearchString);
        requestURL.searchParams.set('authors',authSearchString);
     } else {
        requestURL.pathname = '/api/books';
        requestURL.searchParams.set('searchString', searchString)
     }

     const res = await fetch(requestURL);
     return await res.json();
 }
 //  onMount(async () => {
 //      const res = await fetch("http://localhost/api/books");
 //      books = await res.json();
 //      console.log(books);
 //  })
 function ReOrder(){
     $page.url.searchParams.set('order',selectValue);
     $page.url.searchParams.set('direction',selectDirection);
     // window.location.href=`http://localhost:3000?order=${selectValue}&direction=${selectDirection}`
     window.location.href=$page.url.href;
 }
 function addBook(e) {
     // I need to be able to access the 
     const form_input_locations = [5, 6];
     /* const form_input_locations = [5]; */
     const formData = new FormData(e.target);
     const data = {};
     for (let field of formData) {
         const [key, value] = field;
         data[key] = value;
     }
     console.log("data: ")
     console.log(data);
     console.log("files: ")
     // Yeah, this looks ugly, I know...
     let images = [e.target[form_input_locations[0]].files[0], e.target[form_input_locations[1]].files[0]];
     /* let images = [e.target[form_input_locations[0]].files[0]]; */
     console.log(images);
     modal.display(false);
     for (const key in newBook) {
         // this avoids grabbing properties in the property chain
         if (newBook.hasOwnProperty(key)) {
             console.log(`${key} --> ${newBook[key]}`);
         }
     }
     const url = "/api/add/book";
     const options = {
         method: "POST",
         body: formData
     };

     fetch(url, options).then(res => {
         console.log(res);
         if (res.status != 200) {
             alert("HTTP ERROR CODE: " + res.status.toString() + "\n" + res.statusText);
         }
     }).catch(error => {
         // error
         console.log("Error");
         console.log(error);
     });
 }

 function deleteBook(id) {
     const url = "/api/delete/book"
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
/*styling javascript functionality*/
//clicking on "Results link":
 function expand_sharable_div(e){
    console.log(e)
     navigator.clipboard.writeText($page.url.href)
     .then(()=>{
         e.target.innerText = $page.url.href + ' Copied! (Click again to update)';
         e.target.classList.remove('unclicked');
         e.target.classList.remove('border-x-4');
     }, ()=>e.currentTarget.innerText = "failed to copy link to clipboard"
     )
 }
 //filter tray height reaction variable:
 $:collapsibleHeight = collapsed? '15rem' : 0;
 
//  let collapsibleHeight = '0';
 function filterBtnClick(e){
    collapsed = !collapsed;
    // if (collapsed) collapsibleHeight = '0';
    if (collapsed) collapsibleHeight = '15rem';
    else collapsibleHeight = "15rem";
 }

</script>

<style>
 .crud-add-btn {
     margin-top: 0.5%;
     margin-bottom: 0.5%;
     margin-left:auto;
     background-color: coral;
     align-items: center;
     gap:0.5rem;
     border-right-color:coral;
     border-right-width: thick;
     /* background-image: url("/src/lib/assets/plus.svg"); */
    }
 .crud-add-btn>span{
      mask-image: url("$lib/assets/plus.svg");
      -webkit-mask-image: url("$lib/assets/plus.svg");
      width: 1.5rem;
      height:1.5rem;
      background-color: black;
  }
 .flex-item{
    width:200px;
    min-height: 300px;
 }
 #sharable-link-div.unclicked{
     background-color: rgb(0, 0, 0);
     /* display:inline; */
     color: white;
 }
 #sharable-link-div>span{
    mask-image: url("$lib/assets/copy.svg");
    -webkit-mask-image: url("$lib/assets/copy.svg");
 }
#book-del-btn > span{
     mask-image: url("$lib/assets/delete.svg");
     -webkit-mask-image: url("$lib/assets/delete.svg");
    }
    #filter-btn>div{
     mask-image: url("$lib/assets/filter.svg");
     -webkit-mask-image: url("$lib/assets/filter.svg");
 }
    #book-del-btn > span,
    #sharable-link-div>span,
    .crud-add-btn>span,
    #filter-btn>div{
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat;
    }
 form {
     display: flex;
     flex-direction: column;
     width: 40%;
 }
 form > div {
     display: flex;
     justify-content: space-between;
 }
 form > div + * {
     margin-top: 10px;
 }
 form input, form textarea {
     width: 50%;
     border: 1px black solid;
 }
 form button {
     margin-top: 1em;
     border: 1px black solid;
 }
 form button[type="submit"] {
     width: 25%;
 }
 .wrapper{
    min-height: 100vh;
    padding: 10px;
 }
 input[type="radio"]{
    width:  1.5rem;
    height: 1.5rem;
    accent-color:coral;
 }
label:not(.modal-form label){
     display:inline-flex;
     gap:.5rem;
 }
 #collapsible{
    transition: max-height 1s;
    max-height: var(--maxHeight);
 }
 #tray{
    width:100%;
    margin: 0 auto;
    display:grid;
    grid-template:
    "orderH sortH" 1fr
    ".      .    " .5rem
    "title  ascnd" 1fr
    "pubdt  dscnd" 1fr
    "ratng  .    " 1fr
    "pgcnt  .    " 1fr
    "id     .    " 1fr
    /1fr 1fr;
    column-gap: 5vw;
    row-gap: .5rem;
}
    /*order matters in CSS????!!!!*/
    @media screen and (min-width: 1000px){
        #tray{width:80%;}
    }
    @media screen and (min-width: 1500px){
        #tray{width:50%;}
    }
</style>
<!-- added for minimum-height -->
<div class=wrapper>

{#if $searchStatus == 'ready'}
    {#await bookFetch()}
    <p>Loading Books...</p>
    {:then books}
    <span id=filter-btn class="flex cursor-pointer" style:gap=.5rem on:click={filterBtnClick}>
        <div style:width=1.5rem style:height=1.5rem class=bg-black></div>
        Filter
    </span>
    <div id=collapsible class="overflow-hidden" style:--maxHeight={collapsibleHeight}>
        <div id=tray>
            <!-- <label for="order">Sort by: </label> -->
            <span style:grid-area=orderH class="border-box border-b-4 border-black">Order by</span>
            <span style:grid-area=sortH  class="border-box border-b-4 border-black">Sort by</span>
            <!-- <select bind:value={selectValue} on:change={ReOrder}>
                <option value="title">Title</option>
                <option value="publishDate">Date published</option>
                <option value="rating">Rating</option>
                <option value="pageCount">Page Count</option>
                <option value="id">Book ID</option>
            </select> -->
            {#each [{gridArea:'title',value:'title',text:'Title'},
                    {gridArea:'pubdt',value:'publishDate',text:'Date Published'},
                    {gridArea:'ratng',value:'rating',text:'Rating'},
                    {gridArea:'pgcnt',value:'pageCount',text:'Page Count'},
                    {gridArea:'id',value:'id',text:'Book ID'},] as orderOption (orderOption.gridArea)}
                <label for="{orderOption.gridArea}" style:grid-area={orderOption.gridArea}>
                    <input bind:group={selectValue} type=radio value={orderOption.value} on:change={ReOrder}/>
                    {orderOption.text}
                </label>
            {/each}
            <label for="ASC" style:grid-area=ascnd>
                <input type="radio" id="ASC" value="ASC" name="direction" bind:group={selectDirection} on:change={ReOrder}>
                Ascending 
            </label>
            <label for="DESC" style:grid-area=dscnd>
                <input type="radio" id="DESC" value="DESC" name="direction" bind:group={selectDirection} on:change={ReOrder}>
                Descending
            </label>
        </div>
    </div>
    <div class="flex items-center flex-wrap-reverse">
        <div id = sharable-link-div class="unclicked rounded-full border-x-4 border-black cursor-pointer
        flex my-4" style:gap=.5rem on:click={expand_sharable_div}>
        Results link...
        <span style:width=1.5rem style:height=1.5rem style:background-color=white></span>
        </div>
        <button class="crud-add-btn rounded-full" style:display=inline-flex style:align-items=center 
        style:gap=0.5rem on:click={() => modal.display(true)}>
        <span></span>
        Add book
        </button>
    </div>
<Modal bind:this={modal}>
    <h2 >Add a book</h2>
    <form on:submit|preventDefault={addBook} id=modal-form>
        <div>
            <label for="isbn10">isbn10</label>
            <input type="text" name="isbn10" bind:value={newBook.isbn10} id="isbn10" />
        </div>
        <div>
            <label for="isbn13">isbn13</label>
            <input type="text" name="isbn13" bind:value={newBook.isbn13} id="isbn13" />
        </div>
        <div>
            <label for="subtitle">subtitle</label>
            <input type="text" name="subtitle" bind:value={newBook.subtitle} id="subtitle" />
        </div>
        <div>
            <label for="rating">rating</label>
            <input type="text" name="rating" bind:value={newBook.rating} id="rating" />
        </div>
        <div>
            <label for="maturityRating">maturity rating</label>
            <input type="text" name="maturityRating" bind:value={newBook.maturityRating} id="maturityRating" />
        </div>
        <div>
            <label for="thumbnailUrl">thumbnail url</label>
            <input type="file"
                   accept="image/*" name="thumbnailUrl" bind:files={newBook.thumbnailUrl} id="thumbnailUrl" />
        </div>
        <div>
            <label for="smallThumbnailUrl">small thumbnail url</label>
            <input type="file"
                   accept="image/*" name="smallThumbnailUrl" bind:files={newBook.smallThumbnailUrl} id="smallThumbnailUrl" />
        </div>
        <div>
            <label for="language">language</label>
            <input type="text" name="language" bind:value={newBook.language} id="language" />
        </div>
        <div>
            <label for="publishDate">publish date</label>
            <input type="date" name="publishDate" bind:value={newBook.publishDate} id="publishDate" />
        </div>
        <div>
            <label for="pageCount">page count</label>
            <input type="text" name="pageCount" bind:value={newBook.pageCount} id="pageCount" />
        </div>
        <div>
            <label for="description">description</label>
            <textarea type="text" name="description" bind:value={newBook.description} id="description" />
        </div>
        <div>
            <label for="author">Author</label>
            <input type="author" id="author" name="author" bind:value={newBook.author} />
        </div>
        <div>
            <label for="title">Title</label>
            <input type="text" id="title" name="title" bind:value={newBook.title} />
        </div>
        <button type="submit">Submit</button>
    </form>
</Modal>    
    <div class="flex flex-wrap justify-around gap-y-4 ">
        {#each books as {title, thumbnailUrl, id}}
        <div class="flex-item">
            <BookComponent id={id} imgSource={thumbnailUrl || noCoverUrl}>
                <span slot="title">{title}</span>
                <button id=book-del-btn on:click={() => deleteBook(id)}
                    class="flex border-black text-black mt-auto"
                    style:gap=0.5rem
                >
                    <span style:width=1.5rem style:height=1.5rem style:background-color=black></span>
                    Delete
                </button>
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
</div>
