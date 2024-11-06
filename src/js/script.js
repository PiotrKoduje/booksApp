'use strict';
{
  const booksListElement = document.querySelector('.books-list');
  const bookTemplate = document.getElementById('template-book');
  const books = dataSource.books;
  const template = Handlebars.compile(bookTemplate.innerHTML);
  const favoriteBooks = [];
      
  const render = () => {
    for(const book of books){
      const generatedHTML = template(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      booksListElement.appendChild(element);
    }
  };

  const initActions = () => {
    booksListElement.addEventListener('dblclick',function(e){
      const target = e.target.offsetParent;

      if(target.classList.contains('book__image')){
        const newFav = target.dataset.id;
        
        if(isItNewFav(newFav)){
          favoriteBooks.push(newFav);
          target.classList.add('favorite');
        } else {
          const index = favoriteBooks.indexOf(newFav);
          favoriteBooks.splice(index, 1);
          target.classList.remove('favorite');
        }
        console.log('favBooks: ', favoriteBooks);
      }
    });
  };
            
  const isItNewFav = (newFav) => {
    let count = 0;
    for(const fav of favoriteBooks){
      if (newFav === fav){
        count++;
      }
    }
    return count === 0 ? true : false;
  };

  render();
  initActions();
}