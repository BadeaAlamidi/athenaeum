<script>
 import {page} from "$app/stores"

 async function getBookData(id) {
     return fetch("api/book/" + id,
                  {
                      method: "GET",
                      headers: {
                          "Accept": "application/json",
                          "Content-Type": "application/json",
                      },
     })
         .then((res) => res.json())
         .then((resData) => {
             console.log(resData[0]);
             return resData[0];
         })
         .catch(err => console.warn(err));
 }

 async function getAuthorData(id) {
     return fetch("api/bookauthors/" + id,
                  {
                      method: "GET",
                      headers: {
                          "Accept": "application/json",
                          "Content-Type": "application/json",
                      },
     })
         .then((res) => res.json())
         .then((resData) => {
             console.log(resData);
             return resData;
         })
         .catch(err => console.warn(err));
 }

 let bookPromise = getBookData($page.url.searchParams.get("id"));

 let bookAuthorsPromise = getAuthorData($page.url.searchParams.get("id"));

 /* let displayAuthors = bookAuthors.length? bookAuthors[0] : '-'; */
 /* let DisplayDescription = textSnippet || description || 'No description available';
  * let spanState = (textSnippet && description)? 'Show more' : undefined;
  * function toggleSpanState(){
  *     if (spanState == 'Show more'){
  *         spanState = 'Show less';
  *         DisplayDescription = description;
  *     } else {
  *         spanState = 'Show more';
  *         DisplayDescription = textSnippet;
  *     }
  * }  */
</script>
<style>
 @media screen and (orientation: portrait){
     :root{
         --descWidth:auto;
         --gridWidth:80%;
         --headerRowHeight: 4vh;
 }}
 @media screen and (orientation: landscape){
     :root{
         --descWidth:15vw;
         --gridWidth:50%;
         --headerRowHeight: 10vh;
 }}
 #book-grid {
     display: grid;
     width : var(--gridWidth);
     margin-left : auto;
     margin-right : auto;
     grid-template:  ".     .     .    " var(--headerRowHeight)
     "image title title" 5vh
     "image subt  subt " 5vh
     "image info  info " auto
     "image .     .    " 7vh
     "image desc  desc " auto
     "image .     .    " 5vh
     "image rtng  ib13 " auto
     ".     lang  ib10 " auto
     ".     auth  auth " auto
     / auto  var(--descWidth)   var(--descWidth);
     column-gap: 5vw;
 }
 #img {
     grid-area: image;
     width:100%;
     margin : 0 auto auto auto;
 }
 #pubDate,#descSpan{
     font-weight: bold;
 }
 #bookInfo{
     grid-area: info;
     display:flex;
     align-items:center;
 }
 #pageCount{
     padding-left: 10px;
 }
 .isbngrid{
     margin-left: auto;
 }
 #authorsContainer{
     grid-area: auth;
     display:flex;
     flex-direction:column;
 }
 h1,h2{
     margin:0;
     display: flex;
     align-items: center;
 }
</style>
<div id=book-grid>
    {#await bookPromise}
        <p>...Loading</p>
    {:then book}
    <img id=img src={book.thumbnailUrl} alt=placeholder/>
    <h1 id=title style:grid-area=title>{book.title}</h1>
    {#if book.subtitle}
        <h2 id=subTitle style:grid-area=subt style:height=100%>{book.subtitle || ''}</h2>
    {/if}
    <div id=bookInfo >
        <span id=pubDate >Publish Date: {book.publishDate ||"Not available"}</span>
        <div id=pageCount>Page Count: {book.pageCount || "Not available"}</div>
    </div>
    <!-- <div id=desc style:grid-area=desc>
         {DisplayDescription}
         {#if spanState}
         <span id=descSpan style:cursor=pointer on:click={toggleSpanState}>
         {spanState}
         </span>
         {/if}
         </div> -->
    <div id=rating style:grid-area=rtng>Rating: {book.rating || '-'}</div>
    <div id=language style:grid-area=lang>Language: {book.language.toUpperCase() || '-'}</div>
    <div id=isbn13 class=isbngrid style:grid-area=ib13>ISBN13: {book.isbn13|| '-'}</div>
    <div id=isbn10 class=isbngrid style:grid-area=ib10>ISBN10: {book.isbn10|| '-'}</div>
    {#await bookAuthorsPromise}
        <p>...Loading</p>
    {:then bookAuthors}
    {#if bookAuthors.length == 0}
        <div style:gird-area=auth>Authors: -</div>
    {:else}
        <div id=authorsContainer>
            Authors:
            {#each bookAuthors as {author}}
                <span>—{author}—</span>
            {/each}
        </div>
    {/if}
    {/await}
    {/await}
</div>
