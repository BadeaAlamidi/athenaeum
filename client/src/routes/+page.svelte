 <script>
 import Modal from "$lib/components/_modal.svelte";
 import BookComponent from "$lib/components/_bookComponent.svelte";
 import {page} from "$app/stores";
 import {searchStatus} from "$lib/stores";
 import Spinner from "$lib/components/spinner.svelte"
//SVGs
 import noCoverUrl from '$lib/assets/no-cover.svg'
	import { tick } from "svelte";

 let modal;
 /*
    Form object to hold an argument and function reference to use for form submission.
    I want the modal form be able to be used with multiple functions on submission,
    And this is the best way I could think of doing that.
 */
 let formSubmissionObj = {arg: null, func: null};
 let files;
 let bookObj = {
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

 /*
    Fills the form with the information of a book given an id
 */
 function fillForm(id) {
     fetch("/api/book/" + id).then(res => res.json()).then(data => {
         bookObj = data[0];
         // Removes the time and just leaves the date in year month day format.
         bookObj.publishDate = bookObj.publishDate.split(" ")[0];
         console.log(bookObj.publishDate);
     });
     fetch("/api/bookauthors/" + id).then(res => res.json()).then(data => {
         bookObj.author = data[0].author;
     });
 }

 /*
    Decides which function to call on form submission
    This may very depending on which button was clicked.
    onSubmit can only call one function, so that's why this is here
  */
 function handleFormSubmission(e, formSubmissionObj) {
     console.log(e);
     console.log(formSubmissionObj);
     if (formSubmissionObj.func === editBook)
         editBook(e, formSubmissionObj.arg);
     else if (formSubmissionObj.func === addBook)
         addBook(e);
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
     modal.display(false, "");
     for (const key in bookObj) {
         // this avoids grabbing properties in the property chain
         if (bookObj.hasOwnProperty(key)) {
             console.log(`${key} --> ${bookObj[key]}`);
         }
     }
     const url = "/api/add/book";
     const options = {
         method: "POST",
         body: formData
     };

     fetch(url, options).then(res => {
         console.log(res);
         if (res.status == 200) {
            //hacky way to force re-render of books by re-assigning to store that
            //  is reacted to in the html portion of this component
            
            searchStatus.set('not_ready');
            tick().then(()=>searchStatus.set('ready'));
            
        } else 
            alert("HTTP ERROR CODE: " + res.status.toString() + "\n" + res.statusText);
     }).catch(error => {
         // error
         console.log("Error");
         console.log(error);
     });
 }
 function editBook(e, id) {
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
     modal.display(false, "");
     for (const key in bookObj) {
         // this avoids grabbing properties in the property chain
         if (bookObj.hasOwnProperty(key)) {
             console.log(`${key} --> ${bookObj[key]}`);
         }
     }
     const url = "/api/edit/book/" + id;
     const options = {
         method: "PATCH",
         body: formData
     };

     fetch(url, options).then(res => {
         console.log(res);
         if (res.status == 200) {
            //hacky way to force re-render of books by re-assigning to store that
            //  is reacted to in the html portion of this component

            searchStatus.set('not_ready')
            tick().then(()=>searchStatus.set('ready'));
         } else alert("HTTP ERROR CODE: " + res.status.toString() + "\n" + res.statusText);
     }).catch(error => {
         // error
         console.log("Error");
         console.log(error);
     });
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
 #sharable-link-div.unclicked{
     background-color: rgb(0, 0, 0);
     /* display:inline; */
     color: white;
 }
 #sharable-link-div>span{
    mask-image: url("$lib/assets/copy.svg");
    -webkit-mask-image: url("$lib/assets/copy.svg");
 }
 #book-edit-btn > span{
     mask-image: url("$lib/assets/pencil.svg");
     -webkit-mask-image: url("$lib/assets/pencil.svg");
    }
 #filter-btn>div{
     mask-image: url("$lib/assets/filter.svg");
     -webkit-mask-image: url("$lib/assets/filter.svg");
 }
    #sharable-link-div>span,
    #book-edit-btn>span,
    .crud-add-btn>span,
    #filter-btn>div{
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat;
    }
 form {
    display: flex;
    flex-direction: column;
    color:black;
    background-color: white;
    box-sizing: border-box;
 }
 form > div {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    border-bottom:1px black solid;
}
    form > div:not(:last-child){
        margin: 10px 6px 0 6px;
        text-shadow: 2px 2px 3px lightblue;
    }
    form input, form textarea {
        width: 50%;
        box-shadow: 3px 6px 1px lightblue;
     /* border: 1px 1px 0 1px; */
     border-left:1px;
     /* border-right:1px; */
     border-top:1px;

     border-color: black;
     border-style: solid;
 }
 form button {
     margin-top: 1em;
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
    <!-- <p>Loading Books...</p> -->
    <Spinner text="Loading Books" mode="clockwise"/>
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
                 </select>-->
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
        <!--
             Sets the function to be
        -->
        <button class="crud-add-btn rounded-full" style:display=inline-flex style:align-items=center
        style:gap=0.5rem on:click={() => {formSubmissionObj={arg: null, func: addBook}; modal.display(true, "Add a Book")}}>
        <span></span>
        Add book
        </button>
    </div>
<Modal bind:this={modal}>
    <h2 style:grid-area=header class=text-center style:font-size=1.5rem>{modal.getHeading()}</h2>
    <form on:submit|preventDefault={(e)=>{handleFormSubmission(e, formSubmissionObj)}} id=modal-form class=flex style:grid-area=form>
        <div>
            <label for="isbn10">ISBN10</label>
            <input type="text" name="isbn10" bind:value={bookObj.isbn10} id="isbn10" />
        </div>
        <div>
            <label for="isbn13">ISBN13</label>
            <input type="text" name="isbn13" bind:value={bookObj.isbn13} id="isbn13" />
        </div>
        <div>
            <label for="subtitle">Subtitle</label>
            <input type="text" name="subtitle" bind:value={bookObj.subtitle} id="subtitle" />
        </div>
        <div>
            <label for="rating">Rating</label>
            <input type="text" name="rating" bind:value={bookObj.rating} id="rating" />
        </div>
        <div>
            <label for="maturityRating">Maturity Rating</label>
            <input type="text" name="maturityRating" bind:value={bookObj.maturityRating} id="maturityRating" />
        </div>
        <div>
            <label for="thumbnailUrl">Thumbnail URL</label>
            <input type="file"
                   accept="image/*" name="thumbnailUrl" bind:files={bookObj.thumbnailUrl} id="thumbnailUrl" />
        </div>
        <div>
            <label for="smallThumbnailUrl">Small Thumbnail url</label>
            <input type="file"
                   accept="image/*" name="smallThumbnailUrl" bind:files={bookObj.smallThumbnailUrl} id="smallThumbnailUrl" />
        </div>
        <div>
            <label for="language">Language</label>
            <input type="text" name="language" bind:value={bookObj.language} id="language" />
        </div>
        <div>
            <label for="publishDate">Publish Date</label>
            <input type="date" name="publishDate" bind:value={bookObj.publishDate} id="publishDate" />
        </div>
        <div>
            <label for="pageCount">Page Count</label>
            <input type="text" name="pageCount" bind:value={bookObj.pageCount} id="pageCount" />
        </div>
        <div>
            <label for="description">Description</label>
            <textarea type="text" name="description" bind:value={bookObj.description} id="description" />
        </div>
        <div>
            <label for="author">Author</label>
            <input type="author" id="author" name="author" bind:value={bookObj.author} />
        </div>
        <div>
            <label for="title">Title</label>
            <input type="text" id="title" name="title" bind:value={bookObj.title} />
        </div>
        <div style:background-color=black>
            <button type="submit" style:background-color=coral class="mx-auto border-0">Submit</button>
        </div>
    </form>
</Modal>
    <div class="flex flex-wrap justify-around gap-y-4 ">
        {#each books as {title, thumbnailUrl, id} (id)}
                <BookComponent id={id} imgSource={thumbnailUrl || noCoverUrl} deleted={false}>
                    <span slot="title">{title}</span>
                    <button id="book-edit-btn" on:click={() => {fillForm(id);formSubmissionObj={arg: id, func: editBook}; modal.display(true, "Edit Book")}}
                        class="flex border-black text-black mt-auto"
                        style:gap=0.5rem
                    >
                    <span style:width=1.5rem style:height=1.5rem style:background-color=black></span>
                    Edit
                    </button>
                </BookComponent>
        {/each}
    </div>

      {:catch error}
        <p>{error}</p>
      {/await}
    {:else}
    <!-- <span>waiting for user</span> -->
    <Spinner text="Waiting for user" mode="counter-clockwise"/>
{/if}
</div>
