<script>
    import BookComponent from "./_bookComponent.svelte";
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<BookComponent>
    <img slot='image' src="http://books.google.com/books/content?id=5iwwAQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt="book cover">
</BookComponent>
