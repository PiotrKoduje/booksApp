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
    const covers = document.querySelectorAll('.book__image');

    for(const cover of covers){
      cover.addEventListener('click',(e) => {
        e.preventDefault();
      });

      cover.addEventListener('dblclick',function(){
        cover.classList.add('favorite');
        const newFav = this.dataset.id;

        if (isItNewFav(newFav)){
          favoriteBooks.push(newFav);
        }
        console.log('favBooks: ', favoriteBooks);
      });
    }
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