<script>
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
 }
 .modal {
     background-color: #ffffff;
     max-width: 50vw;
     padding: 1rem;
     margin: 5% auto;
 }
 button {
     width: 10%;
     border: 1px black solid;
 }
</style>
{#if visible}
    <div class="modal-wrapper">
        <div class="modal">
            <slot />
            <button on:click={() => display(false)}>Cancel</button>
        </div>
    </div>
{/if}
