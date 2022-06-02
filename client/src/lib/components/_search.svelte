<script>
    import {onMount} from 'svelte'
    import {page} from '$app/stores'
    // import {queryParamStore} from '$lib/stores'
    // import {normalSearchText} from '$lib/stores'
    
    
    // let normalSearch; // boolean for switching between tag search and normal title/isbn search
    let tagSearchString='';
    let tagArray = [];
    let tagSearchFlag = $page.url.searchParams.get('tag') === "true"? true : false;
    let searchString = $page.url.searchParams.get('searchString')??'';
    
    // if ($page.url.searchParams.get('tag') === "true") $tagSearchFlag = true;
    // this statement reacts to the changes done to the normalSearchText store to reflect its contents into the page store:
    // $: $page.url.searchParams.set('searchString',$normalSearchText)
    $: $page.url.searchParams.set('searchString',searchString)
    $: {
        // $page.url.searchParams.set('tag',$tagSearchFlag.toString())
        $page.url.searchParams.set('tag',tagSearchFlag.toString())

        console.log('tag URLparameter option was set to', $page.url.searchParams.get('tag'))
        }
    // $: { // this block reacts to the changes done to the normalSearchText store to reflect its contents into the page store:
    //     $page.url.searchParams.set('searchString',$normalSearchText)
    // }
    function tagSearchInput(event){
        if (event.key== " "){   //space
            // tagArray = searchString.split(' ').filter(token=>token!=='');
            tagArray = [...tagArray, tagSearchString.trim()];
            tagSearchString=''
            console.log(tagArray)
        }
        else if (event.key == "Backspace" && this.selectionStart){
            // TODO: implement tag removal.
        }
    }
    // should this be scrapped and have its logic moved to before the reactive statements above?
    onMount(()=>{
        // if ((!($page.url.searchParams.get('tag'))) || $page.url.searchParams.get('tag') === "false")
        //     {$tagSearchFlag = false; console.log('tagSearchFlag was set to false on mount')}
        // else $tagSearchFlag = true;
            }
        );
    function normalSearchReq(e){
        // let paramString=`notag=${$normalSearchFlag}&`;
        window.location.href = window.location.protocol + '//' + $page.url.host + '/?' + $page.url.searchParams.toString();
    }
</script>
<!-- {#if $tagSearchFlag} -->
{#if tagSearchFlag}
<div style:background="grey" style:display="flex">
    <span style="background: black">
        {#each tagArray as tag }
            <div style:display="inline-block" style:color="white">{tag}</div>
        {/each}
    </span>
    <!-- update the tagArray only when the space button was pressed -->
    <input type="text" placeholder="Search by tags (unfinished)" bind:value={tagSearchString} on:keyup={tagSearchInput}>
    <button>Search</button>
</div>
{:else}
<div style:display="flex">
    <input type="text" placeholder="Search by title, ISBN, or ISBN13 (prepend with &quot isbn10/13:&quot)" bind:value={searchString} 
        on:keyup={(e)=>{if (e.key==='Enter') normalSearchReq()}}>
    <button on:click={normalSearchReq}>Search</button>
</div>
{/if}
<lable for="searchType">Tag Search</lable>
<input type="checkbox" name="searchType" bind:checked={tagSearchFlag}>
<style>
    div>input{
        flex:auto
    }
    /* div>button{
        justify-self:end;
    } */
</style>