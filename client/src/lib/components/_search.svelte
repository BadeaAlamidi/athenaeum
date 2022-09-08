<script>
    import {onDestroy} from 'svelte'
    import {page} from '$app/stores'
    import soundex from '../soundex.js'
    import {searchStatus, tagArray as filterArray, tagSearchFlagStore as tagSearchFlag} from '../stores.js'
    //built-in svelte animations:
    import {fly} from 'svelte/transition' //for tags in tagsearchbar
    import {fade} from 'svelte/transition'//for chaning the search bar type
    import {flip} from 'svelte/animate'//for chaning the search bar type

    
    const tokenAnimDuration = 500;
    
    // let normalSearch; // boolean for switching between tag search and normal title/isbn search
    let tagSearchString='';
    //array of the tags the user added for their query:
    // let tagArray = $page.url.searchParams.has("tags")?$page.url.searchParams.get("tags")
    //                                                     .split(',').map((tag)=>tag.trim())
    //                                                     .filter((tag)=>tag.length>0)
    //                 : [];
    const tokenCtor = [];
    if ($page.url.searchParams.has('tags')){
        const arr = $page.url.searchParams.get('tags')
                    .split('|').filter((tag)=>tag.trim().length>0)
                    .map(e=>{return {token:e, color:'black'}})
        for (const i of arr) tokenCtor.push(i)
    }
    if ($page.url.searchParams.has('authors')){
        const arr = $page.url.searchParams.get('authors')
                    .split('|').filter((auth)=>auth.trim().length>0)
                    .map(e=>{return {token:e, color:'red'}})
        for (const i of arr) tokenCtor.push(i)
    }
    filterArray.set(tokenCtor);

    let suggestions = [];
    tagSearchFlag.set($page.url.searchParams.get('tag') === "true"? true : false)
    // let tagSearchFlag = $page.url.searchParams.get('tag') === "true"? true : false;
    let searchString = $page.url.searchParams.get('searchString')??'';
    
    // represents all of the tags from the database
    let tagsMap = [];
    // holds all of the authors from the database:
    let authorArray;
    // fetches tags from the backend and calls the soundex function for each tag to create a hash for each tag
    const getTags = async () =>{
        let res = await fetch("/api/tags");

        const tagsRes = await res.json();
        res = await fetch('/api/authors')
        const authRes = await res.json();
        authorArray = Array.from(authRes);

        let map=[];
        Array.from(tagsRes).forEach(({tagname})=>{
            const identifier = soundex(tagname);
            if (map[identifier]) map[identifier].push(tagname);
            else map[identifier] = [tagname,];
        });
        tagsMap = map;

        return map;
    }
    // utility function created to introduce a cool-down
    // feature when the user mutates the tagArray. The 1500 ms
    // interval is reset if the user mutates the tagArray more than
    // once in less than 1500 ms. causes an html node to render as reaction
    // to changing the value of the searchStatus and is meant to stop the
    // user from abusing the backend database

    let lastTimeoutID;
    $: {
        const tagTokens = $filterArray.filter(({color})=>color=='black').map(obj=>obj.token)
        const authTokens= $filterArray.filter(({color})=>color=='red'  ).map(obj=>obj.token);

        $page.url.searchParams.set('tags', tagTokens.join('|'));
        $page.url.searchParams.set('authors', authTokens.join('|'));
        console.log($page.url.searchParams.get('authors'))
        // stop interval from happening if page just loaded:
        if(lastTimeoutID){
            searchStatus.set('not_ready');
            clearTimeout(lastTimeoutID);
        lastTimeoutID = setTimeout(()=>searchStatus.set('ready'),1500);
        } else lastTimeoutID = 1;
    }
    // if ($page.url.searchParams.get('tag') === "true") $tagSearchFlag = true;
    // this statement reacts to the changes done to the normalSearchText store to reflect its contents into the page store:
    // $: $page.url.searchParams.set('searchString',$normalSearchText)
    $: $page.url.searchParams.set('searchString',searchString);
    $: if (suggestions && suggestions.length) console.log("suggestions found", suggestions)
    $: {
        // $page.url.searchParams.set('tag',$tagSearchFlag.toString())
        $page.url.searchParams.set('tag',$tagSearchFlag.toString())
        
        console.log('tag URLparameter option was set to', $page.url.searchParams.get('tag'))
        }
    function tagSearchInput(event){
        if (tagSearchString.length>1){
            // test if current input matches one of the indexes of the global tags variable
            //TODO: use set instead of array
            const filterArrayTokens = $filterArray.map(({token})=>token)

            const suggestionsTokens = new Set();
            suggestions.forEach(({token})=>{suggestionsTokens.add(token)})

            if (tagsMap[soundex(tagSearchString)])
                suggestions = tagsMap[soundex(tagSearchString)]
                    .filter((suggestion)=>!filterArrayTokens.includes(suggestion))
                    .map((ele)=>{return {token:ele, color:'black'}});

            for (let {author} of authorArray)
                if (!filterArrayTokens.includes(author) && !suggestionsTokens.has(author)
                && author.startsWith(tagSearchString)) {
                    suggestions = [...suggestions, {token:author, color:'red'}]
                }
        }
        else suggestions = [];
        
        for (let {token, color} of suggestions){
            if (token === tagSearchString){
                tagSearchString = "";
                // tagArray = [...tagArray, val];//copies entire array(+1 new elem) into the same symbol. could use push method followed by tagArray = tagArray to trigger svelte reaction but
                                              //this looks cooler
                filterArray.update(e=>[...e,{token, color}]);
                event.currentTarget.focus();
            }
        }
    }

    //intermediary for toggling $tagSearchFlag created to await the animation of tokens if they
    //  exist while switching between the two search modes:
    let regularSearch = true;
    let timeOutId;
    const unsub = tagSearchFlag.subscribe(value=>{
        clearTimeout(timeOutId);
        if (value == true){
            regularSearch = false;
        } else {
            if ($filterArray.length)
                timeOutId=setTimeout(()=>regularSearch = true, tokenAnimDuration);
            else regularSearch = true;
        }
    });

    // function that removes the last element of the tag array
    // by pressing 'backspace' while typing on tag text input field
    function tagDelete(e){
        if (e.key == "Backspace" && this.selectionStart==0){
            // pop is more appropriate but this looks cleaner as the assignment operator is used, triggering svelte's reactions
            // tagArray = tagArray.slice(0,tagArray.length - 1);
            filterArray.update(e=>e.slice(0,e.length - 1));
            }
    }
    // function that handles the click button of one of the html elements
    // that represent the tag array.
    function removeFromTagArray(e){
        let filterElement = e.currentTarget.dataset.tagValue;
        // tagArray = tagArray.filter((tag)=> tag!==filterElement);
        filterArray.update(v=>v.filter(({token})=>token!==filterElement))
    }
    // should this be scrapped and have its logic moved to before the reactive statements above?
    onDestroy(unsub);
    function searchReq(){
        // navigate to the index.svelte page with the accumulated get params from this component:
        window.location.href = window.location.protocol + '//' + $page.url.host + '/?' 
                                + $page.url.searchParams;
    }
</script>
<!-- {#if $tagSearchFlag} -->
{#if $tagSearchFlag}
<div style:background=black class="flex flex-wrap" >
    <span class="flex gap-x-px justify-evenly flex-wrap">
        {#each $filterArray as {token, color} (token)}
            <div  data-type={color} in:fly="{{ y: 100, duration: tokenAnimDuration }}" 
                out:fly="{{ y: 100, duration: tokenAnimDuration }}"
                class=" token bg-blue-500 hover:bg-blue-700 text-white font-bold
                py-2 px-4 rounded-full flex flex-wrap justify-center"
                animate:flip>
                <!-- <div style:display="inline-block" style:color="white">{tag}</div> -->
                {token}
                <span data-tag-value = {token} on:click={removeFromTagArray} class=inline-block>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
            </div>
        {/each}
    </span>
    <!-- update the tagArray only when the space button was pressed -->
    <div style:width=auto style:padding="2px 0" style:flex=auto class=box-border
        style:background="linear-gradient(90deg, rgba(190, 18, 61,0) 0%, rgba(190, 18, 61,1)"
    >
        <input type="text" placeholder="Search by tags (unfinished)" bind:value={tagSearchString} 
            on:input={tagSearchInput} on:keydown={tagDelete} on:keyup={(e)=>{if (e.key==='Enter') 
            searchReq()}} list=suggestions style:background-color=black style:color=white
            style:height=100% style:width=100%
    >
    </div>
    <datalist id=suggestions>
        {#each suggestions as {token, color}}
        <option value = {token} style:background={color}>{token}</option>    
        {/each}
    </datalist>
    <button on:click = {searchReq} style:min-width=1.5rem style:min-height=1.5rem 
        style:padding-left=3px style:background-color="rgb(190,18,61)" class="rounded-r-md box-border"
        style:border-right-width=0.375rem style:border-color="rgb(190,18,61)">
        <span id=search-btn-span></span>
    </button>
</div>
{:else if regularSearch}
<div style:display="flex" >
    <input type="text" placeholder="Search by title, ISBN, or ISBN13 (prepend with &quot isbn10/13:&quot)" bind:value={searchString} 
        on:keyup={(e)=>{if (e.key==='Enter') searchReq()}}
        class=rounded-l-md
    >
    <button on:click={searchReq} style:min-width=1.5rem style:min-height=1.5rem style:padding-left=3px
        style:background-color="rgb(0, 200, 166)" class="rounded-r-md box-border"
        style:border-right-width=.375rem style:border-color="rgb(0, 200, 166)">
        <span id=search-btn-span></span>
    </button>
</div>
{/if}
<lable for="searchType">Tag Search</lable>
{#await getTags()}
    <input type="checkbox" name="searchType" bind:checked={$tagSearchFlag} disabled={true}>
    <lable for="searchType">loading tags...</lable>
{:then tagMap}
    <input type="checkbox" name="searchType" bind:checked={$tagSearchFlag}>
{/await}
<style>
    div>input{
        flex:auto;
        color : black;
    }

    .token{
        transition: color 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .token[data-type*=red]{
        background-color: rgb(190, 18, 61);
    }
    .token[data-type*=black]{
        background-color: #1F2530;
    }
    .token[data-type=red]:hover{
        color:black;
    }
    .token[data-type=black]:hover{
        color:rgb(190, 18, 61);
    }
    #search-btn-span{
        display:block;
        background-color: white;
        mask-image: url("$lib/assets/search.svg");
        -webkit-mask-image: url("$lib/assets/search.svg");
        mask-repeat:no-repeat;
        -webkit-mask-repeat:no-repeat;
        width: calc(1.5rem - 3px);
        height:calc(1.5rem - 3px);
    }
</style>
