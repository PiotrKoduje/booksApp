'use strict';
{
  const booksListElement = document.querySelector('.books-list');
  const bookTemplate = document.getElementById('template-book');
  const books = dataSource.books;
  const template = Handlebars.compile(bookTemplate.innerHTML);
  const favoriteBooks = [];
  const filters = [];
  const formElement = document.querySelector('.filters div');
        
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
          
        if(isThere(favoriteBooks, newFav)){
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

    formElement.addEventListener('click', function(e){
      if(e.target.tagName === 'INPUT' && e.target.type === 'checkbox' && e.target.name === 'filter'){
        const category = e.target.value;
          
        if(e.target.checked){
          filters.push(category);
        } else {
          const index = filters.indexOf(category);
          filters.splice(index, 1);
        }
        console.log('filters: ',filters);
      }
    });
  };
              
  const isThere = (arr,el) => {
    let count = 0;
    for(const element of arr){
      if (el === element){
        count++;
      }
    }
    return count === 0 ? true : false;
  };

  render();
  initActions();
}