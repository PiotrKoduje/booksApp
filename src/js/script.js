{
    "use strict";

    const booksListElement = document.querySelector('.books-list');
    const bookTemplate = document.getElementById('template-book');
    const books = dataSource.books;
    const template = Handlebars.compile(bookTemplate.innerHTML);
    
    const render = () => {
        for(const book of books){
            const generatedHTML = template(book);
            const element = utils.createDOMFromHTML(generatedHTML);
            booksListElement.appendChild(element);
        }
    }
    
   render();
}
