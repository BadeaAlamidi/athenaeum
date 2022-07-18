<script>
    import {page} from '$app/stores'

    export let id;

    function navToBook(){
        window.location.href = window.location.protocol + '//' + $page.url.host + '/book/' + id;
    }
</script>
<div class='wrapper' style='' title={id} on:click={navToBook}>
    <div>
        <slot name='image'>no image</slot>
    </div>
    <slot name='title'>no title</slot>
    <br />
    <slot></slot>
</div>

<style>
    .wrapper {
        cursor:pointer;
        border-style:solid;
        border-color:red;
    }
</style>
