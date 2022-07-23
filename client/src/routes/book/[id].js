export async function get({params}){
    const book = await fetch('http://localhost:5000/api/book/'+params.id)
    const authors = await fetch('http://localhost:5000/api/bookauthors/'+params.id);
    const tags = await fetch('http://localhost:5000/api/booktags/'+params.id)

    // TODO: test if the result was succesful in a better way than this
    if (book && authors){
        return {
            status: 200,
            headers : {},
            body: {
                bookData: (await book.json())[0],
                bookAuthors: (await authors.json()),
                bookTags:(await tags.json())
            }
        }
    }
    return {
        status: 404
    }
}