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
    booksListElement.addEventListener('click', function(e){
      const target = e.target.offsetParent;
      if(target.tagName == 'A'){
        e.preventDefault();
      }
    });

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
        //console.log('favBooks: ', favoriteBooks);
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
        //console.log('filters: ',filters);
        filterBooks();
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

  const filterBooks = ()=> {
    const imagesOfBooks = document.querySelectorAll('.book__image');

    for(const book of books){
      let shouldBeHidden = false;
      //console.log('book nr',book.id, ' :', book.details);
      for(const category of filters){
        if(book.details[category]){
          shouldBeHidden = true;
          //console.log('book nr',book.id, ' should be greyed out');
          break;
        }
      }
      if(shouldBeHidden){
        imagesOfBooks[book.id-1].classList.add('hidden');
      } else {
        imagesOfBooks[book.id-1].classList.remove('hidden');
      }
    }
  };

  render();
  initActions();
}