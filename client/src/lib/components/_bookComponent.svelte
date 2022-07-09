<script>
    export let id;
</script>
<div class='wrapper' style='' title={id}>
    <div>
        <slot name='image'>no image</slot>
    </div>
    <slot name='title'>no title</slot>
</div>

<style>
    .wrapper {
        border-style:solid;
        border-color:red;
    }
</style>
