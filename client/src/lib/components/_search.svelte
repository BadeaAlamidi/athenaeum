<script>
    import {onMount} from 'svelte'
    import {page} from '$app/stores'
    import soundex from '../soundex.js'
    import {searchStatus} from '../stores.js'
    
    // import {queryParamStore} from '$lib/stores'
    // import {normalSearchText} from '$lib/stores'
    
    
    // let normalSearch; // boolean for switching between tag search and normal title/isbn search
    let tagSearchString='';
    //array of the tags the user added for their query:
    let tagArray = $page.url.searchParams.has("tags")?$page.url.searchParams.get("tags")
                                                        .split(',').map((tag)=>tag.trim())
                                                        .filter((tag)=>tag.length>0)
                    : [];
    let suggestions = [];
    let tagSearchFlag = $page.url.searchParams.get('tag') === "true"? true : false;
    let searchString = $page.url.searchParams.get('searchString')??'';
    
    // represents all of the tags from the database
    let tagsMap = [];
    // fetches tags from the backend and calls the soundex function for each tag to create a hash for each tag
    const getTags = async () =>{
        const res = await fetch("http://localhost:5000/api/tags");
        const tagsRes = await res.json();

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

    // TODO: can this be turned into a normal svelte reaction block?
    let lastTimeoutID;
    const tagSearchReaction = function (){
        $page.url.searchParams.set('tags', tagArray.join());
        searchStatus.set('not_ready');
        clearTimeout(lastTimeoutID);
        lastTimeoutID = setTimeout(()=>searchStatus.set('ready'),1500);
    }
    // if ($page.url.searchParams.get('tag') === "true") $tagSearchFlag = true;
    // this statement reacts to the changes done to the normalSearchText store to reflect its contents into the page store:
    // $: $page.url.searchParams.set('searchString',$normalSearchText)
    $: $page.url.searchParams.set('searchString',searchString);
    $: if (suggestions && suggestions.length) console.log("suggestions found", suggestions)
    $: {
        // $page.url.searchParams.set('tag',$tagSearchFlag.toString())
        $page.url.searchParams.set('tag',tagSearchFlag.toString())
        
        console.log('tag URLparameter option was set to', $page.url.searchParams.get('tag'))
        }

    function tagSearchInput(event){
        // test if current input matches one of the indexes of the global tags variable
        if (tagSearchString.length>1 && tagsMap[soundex(tagSearchString)]){
            suggestions = tagsMap[soundex(tagSearchString)].filter((suggestion)=>!tagArray.includes(suggestion));
        }
        else suggestions = [];
        
        let inputElement = event.target;
        let val = inputElement.value;
        let optionElements = document.getElementById('suggestions').querySelectorAll('*');
        // for (let i=0; i < optionElements.length; ++i){
        //     if(optionElements[i].innerHTML === val){ //assumes innerHTML will be of type string. should be guaranteed to be as such
            //         tagArray = [...tagArray, val]; 
            //                                        
            //         tagSearchString= '';
            //     }
        // }
        for (let i of suggestions){
            if (i === val){
                tagSearchString = "";
                tagArray = [...tagArray, val];//copies entire array(+1 new elem) into the same symbol. could use push method followed by tagArray = tagArray to trigger svelte reaction but
                                              //this looks cooler
                tagSearchReaction();
            }
        }
    }

    // function that removes the last element of the tag array
    // by pressing 'backspace' while typing on tag text input field
    function tagDelete(e){
        if (e.key == "Backspace" && this.selectionStart==0){
            // pop is more appropriate but this looks cleaner as the assignment operator is used, triggering svelte's reactions
            tagArray = tagArray.slice(0,tagArray.length - 1);
            tagSearchReaction();
            }
    }
    // function that handles the click button of one of the html elements
    // that represent the tag array.
    function removeFromTagArray(e){
        let filterElement = e.currentTarget.dataset.tagValue;
        tagArray = tagArray.filter((tag)=> tag!==filterElement);
        tagSearchReaction();
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
{#if tagSearchFlag}
<div style:background="grey" style:display="flex">
    <span style="background: black">
        {#each tagArray as tag }
            <div style:display="inline-block" style:color="white">
                <!-- <div style:display="inline-block" style:color="white">{tag}</div> -->
                {tag}
                <button data-tag-value = {tag} on:click={removeFromTagArray}>x</button>
            </div>
        {/each}
    </span>
    <!-- update the tagArray only when the space button was pressed -->
    <input type="text" placeholder="Search by tags (unfinished)" bind:value={tagSearchString} on:input={tagSearchInput} on:keydown={tagDelete} 
        on:keyup={(e)=>{if (e.key==='Enter') searchReq()}} list=suggestions>
    <datalist id=suggestions>
        {#each suggestions as suggestion}
        <option value = {suggestion}>{suggestion}</option>    
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
    <input type="checkbox" name="searchType" bind:checked={tagSearchFlag} disabled={true}>
    <lable for="searchType">loading tags...</lable>
{:then tagMap}
    <input type="checkbox" name="searchType" bind:checked={tagSearchFlag}>
{/await}
<style>
    div>input{
        flex:auto
    }
    /* div>button{
        justify-self:end;
    } */
</style>