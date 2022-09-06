<script>
 import {fade} from 'svelte/transition';
 let visible = false;
 export function display(show) {
     visible = show;
 }
</script>
<style>
 .modal-wrapper {
     background-color: rgba(0,0,0, 0.6);
     position: fixed;
     width: 100%;
     height: 100%;
     top: 0;
     left: 0;
     z-index: 12;
     display: flex;
    }
    .modal {
     display:grid;
     grid-template:
     'header cancel' 2rem
     'form   form  ' 1fr
     / 1fr 2rem;
     row-gap: 1em;
     background-color: #ffffff;
     min-width:50vw;
     max-width: 100vw;
     max-height: 100vh;
     padding: 3px 0;
     margin: auto;
     overflow-y:auto;
     color:white;
     background-color:black;
     border-radius:10px;
     box-shadow: 10px 10px 10px black;
 }
 button {
     width: 10%;
     border: 1px black solid;
 }
 #cancelForm{
    grid-area:cancel;
    width:2rem;
    height:2rem;
    /* padding:3px; */
    border:0;
    background-color:rgb(0, 200, 166);
    mask-image: url("$lib/assets/close.svg");
        -webkit-mask-image: url("$lib/assets/close.svg");
        mask-repeat:no-repeat;
        -webkit-mask-repeat:no-repeat;
 }
</style>
{#if visible}
    <div class="modal-wrapper" on:click={(e)=>{if(e.target == e.currentTarget) visible=false;}}
        transition:fade
    >
        <div class="modal ">
            <slot />
            <button id=cancelForm class=mx-auto on:click={() => display(false)}></button>
        </div>
    </div>
{/if}
