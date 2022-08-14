<script>
    import {onMount} from 'svelte'
    import {page} from '$app/stores'
    import soundex from '../soundex.js'
    import {searchStatus, tagArray as filterArray, tagSearchFlagStore as tagSearchFlag} from '../stores.js'
    
    // import {queryParamStore} from '$lib/stores'
    // import {normalSearchText} from '$lib/stores'
    
    
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
            const filterArrayTokens = $filterArray.map(({token})=>token)
            if (tagsMap[soundex(tagSearchString)])
                suggestions = tagsMap[soundex(tagSearchString)]
                    .filter((suggestion)=>!filterArrayTokens.includes(suggestion))
                    .map((ele)=>{return {token:ele, color:'black'}});

            for (let {author} of authorArray)
                if (!filterArrayTokens.includes(author) && author.startsWith(tagSearchString)) {
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
            }
        }
    }

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
    onMount(()=>{
        // if ((!($page.url.searchParams.get('tag'))) || $page.url.searchParams.get('tag') === "false")
        //     {$tagSearchFlag = false; console.log('tagSearchFlag was set to false on mount')}
        // else $tagSearchFlag = true;
    }
    );
    function searchReq(){
        // navigate to the index.svelte page with the accumulated get params from this component:
        window.location.href = window.location.protocol + '//' + $page.url.host + '/?' 
                                + $page.url.searchParams;
    }
</script>
<!-- {#if $tagSearchFlag} -->
{#if $tagSearchFlag}
<div style:background="grey" style:display="flex">
    <span>
        {#each $filterArray as {token, color} }
            <div style:display="inline-block" style:color="white" style:background={color}>
                <!-- <div style:display="inline-block" style:color="white">{tag}</div> -->
                {token}
                <button data-tag-value = {token} on:click={removeFromTagArray}>x</button>
            </div>
        {/each}
    </span>
    <!-- update the tagArray only when the space button was pressed -->
    <input type="text" placeholder="Search by tags (unfinished)" bind:value={tagSearchString} on:input={tagSearchInput} on:keydown={tagDelete} 
        on:keyup={(e)=>{if (e.key==='Enter') searchReq()}} list=suggestions>
    <datalist id=suggestions>
        {#each suggestions as {token, color}}
        <option value = {token} style:background={color}>{token}</option>    
        {/each}
    </datalist>
    <button on:click = {searchReq}>Search</button>
</div>
{:else}
<div style:display="flex">
    <input type="text" placeholder="Search by title, ISBN, or ISBN13 (prepend with &quot isbn10/13:&quot)" bind:value={searchString} 
        on:keyup={(e)=>{if (e.key==='Enter') searchReq()}}>
    <button on:click={searchReq}>Search</button>
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
        flex:auto
    }
</style>
