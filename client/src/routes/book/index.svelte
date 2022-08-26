<script>
    import {tagArray as filterArray, tagSearchFlagStore as tagSearchFlag} from '../../lib/stores'
    import {page} from '$app/stores'
    import noCoverUrl from '$lib/assets/no-cover.svg'

    let bookData = {};
    let bookAuthors=[];
    let bookTags=[];

    // const {isbn10, isbn13, title, subtitle, rating, 
    //       thumbnailUrl, language, publishDate, pageCount, description,
    //       textSnippet } = bookData;
    
    async function getBookData() {
     return fetch("api/book/" + $page.url.searchParams.get('id'),
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
             bookData = resData[0];
             return resData[0];
         })
         .catch(err => console.warn(err));
    }
    async function getAuthorData() {
     return fetch("api/bookauthors/" + $page.url.searchParams.get('id'),
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
             bookAuthors = resData;
             return resData;
         })
         .catch(err => console.warn(err));
    }
    async function getTagData() {
     return fetch("api/booktags/" + $page.url.searchParams.get('id'),
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
             bookTags = resData;
             return resData;
         })
         .catch(err => console.warn(err));
    }

    $: DisplayDescription = bookData.textSnippet || bookData.description 
                            || 'No description available';
    $: spanState = (bookData.textSnippet && bookData.description)? 'Show more' : undefined;

//---------------------------------------------
    function toggleSpanState(){
        if (spanState == 'Show more'){
            spanState = 'Show less';
            DisplayDescription = bookData.description;
        } else {
            spanState = 'Show more';
            DisplayDescription = bookData.textSnippet;
        }
    }
//---------------------------------------------
    // tells whether the authors and tags of this book are in the filterArray
    // meant for avoiding the addition of an author / a tag to the filterArray more than once:
    const tokenMap = {};
    $:{
        //inclusion of filterArray here should guarantee this reaction block to run
        const filterArrayTokens = $filterArray.map(({token})=>token)
        for (const i of [...bookTags.map(e=>e.tagname), ...bookAuthors.map(e=>e.author)]){

            if (filterArrayTokens.includes(i)) tokenMap[i] = true;
            // triggers reaction
            else tokenMap[i] = false;
        }
    }

/**
 * 
*/
/**
* @param {{ currentTarget: HTMLElement; }} e
*/
    function tokenClick(e){
        tagSearchFlag.set(true);
        const token = e.currentTarget.dataset.token;
        const color = e.currentTarget.dataset.bg;
        if(tokenMap[token]==false){
            filterArray.update(v=>[...v, {token, color}]);
        }
    }
</script>
<style>
    @media screen and (orientation: landscape){
        :root{
            --descWidth:15vw;
            --gridWidth:50%;
            --headerRowHeight: 10vh;
            /* --botInfoFlexDirection : row; */
        }}
        /*added for minimum dimensions (iphoneSE)*/
        @media screen and (orientation: portrait),(max-width: 700px) {
            :root{
                --descWidth:auto;
                --gridWidth:100%;
                --headerRowHeight: 4vh;
            /* --botInfoFlexDirection : column; */
    }}
    /*smallest width in landscape mode that does not make image too small*/
    @media screen and (orientation: landscape) and (max-width: 1250px){
        :root{
            --imageGridArea:alimg;
            --headerRowHeight : auto;
            --imageColWidth: 0;
        }
        #book-grid{
            margin-top:4vh;
            margin-bottom:4vh;
        }
    }
    /*smallest width in portrait mode that does not make image too small*/
    @media screen and (orientation: portrait) and (max-width: 630px){
        :root{
            --imageGridArea:alimg;
            --headerRowHeight : auto;
            --imageColWidth: 0;
        }
        #book-grid{
            margin-top:4vh;
            margin-bottom:4vh;
        }
    }

    #book-grid {
        display: grid;
        width : var(--gridWidth);
        margin-left : auto;
        margin-right : auto;
        grid-template:  ".     alimg alimg" var(--headerRowHeight)
                        "image title title" auto
                        "image subt  subt " auto
                        "image info  info " auto
                        "image .     .    " 7vh
                        "image desc  desc " auto
                        "image .     .    " 5vh
                        "image binfo binfo" 1fr
                        ".     binfo binfo" 1fr
                        ".     binfo binfo" 1fr
                       / var(--imageColWidth, auto)  var(--descWidth)   var(--descWidth);
        column-gap: 5vw;
        /* row-gap:5vh; */
    }
    #img {
        grid-area: var(--imageGridArea, image);
        width:100%;
    }
    img{
        margin : auto;
        object-fit:contain;
        max-height: 300px;
        width: 200px;
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
    #authorsContainer,#tagsContainer{
        display:flex;
        flex-direction:column;
        gap: 5px;
    }
    #authorsContainer::before,#tagsContainer::before{
        content:":";
    }
    h1,h2{
        margin:0;
        display: flex;
        align-items: center;
    }
    #bottomInfo{
        grid-area: binfo;
        display:flex;
        /* flex-direction:var(--botInfoFlexDirection) */
        flex-wrap:wrap;
        gap: 3vh 5vw
        
    }
    #firstGridCol, #secondGridCol{
        display:grid;
        grid-template: "label1 info1" calc(1em + 10px)
                       "label2 info2" calc(1em + 10px)
                       "label3 info3" auto
        / 5em       1fr
    }
    .bottomCell{
        /* display: inline; */
        height: 100%;
    }
    .token{
        color:white;
    }
    .token[data-bg*=red]{
        background-color: rgb(190, 18, 61);
    }
    .token[data-bg*=black]{
        background-color:black;
    }
</style>
<div style:min-height=70vh>
{#await getBookData()}
    <p>...Loading</p>
{:then {isbn10, isbn13, title, subtitle, rating, 
    thumbnailUrl, language, publishDate, pageCount,}}
<div id=book-grid>
    <div id=img >
        <img src={thumbnailUrl || noCoverUrl} alt=placeholder class=shrink-0/>
    </div>
    <h1 id=title style:grid-area=title class=text-2xl>{title}</h1>
    {#if subtitle}
        <h2 id=subTitle style:grid-area=subt style:height=100% class=text-xl>{subtitle || ''}</h2>
    {/if}
    <div id=bookInfo >
        <span id=pubDate >Publish Date: {publishDate ||"Not available"}</span>
        <div id=pageCount>Page Count: {pageCount || "Not available"}</div>
    </div>
    <div id=desc style:grid-area=desc>
      {DisplayDescription}
      {#if spanState}
      <span id=descSpan style:cursor=pointer on:click={toggleSpanState}>
        {spanState}
      </span>
      {/if}
    </div>
    <div id=bottomInfo>
        <div id=firstGridCol>
            <div id=rating class=bottomCell style:grid-area=label1>Rating</div>
            <div class=bottomCell style:grid-area=info1>: {rating || '-'}</div>
            <div id=language class=bottomCell style:grid-area=label2>Language</div>
            <div class=bottomCell style:grid-area=info2>: {language.toUpperCase() || '-'}</div>
            {#await getAuthorData()}
                <div style:gird-area=label3 class=bottomCell>Authors</div>
                <div  class=bottomCell style:grid-area=info3>: ...Loading</div>
            {:then bookAuthors}
                {#if bookAuthors.length == 0}
                <div style:gird-area=label3 class=bottomCell>Authors</div>
                <div  class=bottomCell style:grid-area=info3>: -</div>
                {:else}
                <div style:gird-area=label3 class=bottomCell>Authors</div>
                <div id=authorsContainer class=bottomCelll style:grid-area=info3>
                    {#each bookAuthors as {author}}
                    <span on:click={tokenClick} 
                        class="token bg-blue-500 hover:bg-blue-700 text-white font-bold
                               py-2 px-4 rounded-full"
                        data-token={author} data-bg=red
                    >
                        {author}
                    </span>
                    {/each}
                </div>
                {/if}
            {/await}
        </div>
        <div id = secondGridCol>
            <div id=isbn13 class=bottomCell style:grid-area=label1>ISBN13</div>
            <div class=bottomCell style:grid-area=info1>: {isbn13 || '-'}</div>
            <div id=isbn10 class=bottomCell style:grid-area=label2>ISBN10</div>
            <div class=bottomCell style:grid-area=info2>: {isbn10 || '-'}</div>
            <div class=bottomCell style:grid-area=label3>Tags</div>
            {#await getTagData()}
                <span class=bottomCell style:grid-area=info3>: ...Loading</span>
            {:then bookTags}
            {#if bookTags.length == 0}
            <span class=bottomCell style:grid-area=info3>: -</span>
            {:else}
            <div id=tagsContainer class=bottomCell style:grid-area=info3> 
                {#each bookTags as {tagname}}
                <span on:click={tokenClick} class="
                    token bg-blue-500 hover:bg-blue-700 text-white font-bold
                    py-2 px-4 rounded-full" 
                    data-token={tagname} data-bg=black>
                    {tagname}
                </span>
                {/each}
            </div>
            {/if}
            {/await}
        </div>
    </div>
</div>
{/await}
</div>