<script context='module'>
    import {browser} from '$app/environment';
    let observer;
    if (browser)
        //this intersection observer never gets deleted
        observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting)
                    entry.target.dispatchEvent(new Event('intersect'));
            });
        })
</script>

<script>
 import {page} from '$app/stores'
 import {onMount} from 'svelte'

 export let id;
 export let imgSource;
 export let deleted;

 let element;
 //intermediary variable that is assigned to once the component is in viewport
 //Meant for lazy-loading: 
 let hasIntersected = false;
 //the following variable is used for the opacity style property. it is set to 1 once the image
 //has completely loaded
 let opacity=0;
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
         .then(res=> {
            //alert the user that the delete operation failed when the server
            //  returns 'false'
            if (res.result == false) alert('An error ocurred in the server while deleting');
            deleted = res.result;
        });
     
 }
const href = window.location.protocol + '//' + $page.url.host + '/book?id=' + id;
 onMount(()=>{
    observer.observe(element);
    return ()=>observer.unobserve(element);
 })
</script>
{#if deleted==false}
<div bind:this={element} on:intersect={()=>hasIntersected = true} >
<!-- <div bind:this={element} on:intersect={()=>hasIntersected = true} on:click={()=>deleted=true}> -->
    <!-- <div class='wrapper' style='' title={id} on:click={navToBook}> -->
    <a class='wrapper' style='' title={id} href={href}>
        <span style:opacity="{opacity}">
            {#if hasIntersected }
                <img src="{imgSource}" alt="Book Cover" on:load={()=>opacity=1}>
            {/if}
        </span>
        <slot name='title'>no title</slot>
        <br />
    </a>
    <button id=book-del-btn on:click={() => deleteBook(id)}
        class="flex border-black text-black mt-auto"
        style:gap=0.5rem
    >
        <span style:width=1.5rem style:height=1.5rem style:background-color=black></span>
        Delete
    </button>
    <slot></slot>
</div>
{/if}
<style>
    .wrapper {
        cursor:pointer;
        border-style:solid;
        border-color:red;
    }
    img {
        width: 200px;
        height: 300px;
        object-fit: contain;
    }
    span{
        transition: 0.5s opacity cubic-bezier(0.895, 0.03, 0.685, 0.22);
    }
    div{
    width:200px;
    min-height: 300px;
    }
    #book-del-btn > span{
     mask-image: url("$lib/assets/delete.svg");
     -webkit-mask-image: url("$lib/assets/delete.svg");
     mask-repeat: no-repeat;
     -webkit-mask-repeat: no-repeat;
    }
</style>
