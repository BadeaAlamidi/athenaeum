<script context='module'>
    import {browser} from '$app/env';
    let observer;
    if (browser)
        observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting)
                    entry.target.dispatchEvent(new Event('intersect'));
            });
        })
    //this intersection observer never gets deleted
</script>

<script>
 import {page} from '$app/stores'
 import {onMount} from 'svelte'

 export let id;
 export let imgSource;

 let element;
 //intermediary variable that is assigned to once the component is in viewport
 //Meant for lazy-loading: 
 let hasIntersected = false;
 //the following variable is used for the opacity style property. it is set to 1 once the image
 //has completely loaded
 let opacity=0;
 function navToBook(){
     window.location.href = window.location.protocol + '//' + $page.url.host + '/book?id=' + id;
    }
const href = window.location.protocol + '//' + $page.url.host + '/book?id=' + id;
 onMount(()=>{
    observer.observe(element);
    return ()=>observer.unobserve(element);
 })
</script>
<div bind:this={element} on:intersect={()=>hasIntersected = true}>
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
    <slot></slot>
</div>

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
</style>
