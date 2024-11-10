'use strict';
{
  class BooksList{
    constructor(){
      this.favoriteBooks = [];
      this.filters = [];
      this.initData();
      this.getElements();
      this.render();
      this.initActions();
    }

    initData(){
      this.data = dataSource.books;
    }

    render(){
      for(const book of this.data){
        book.ratingWidth = 10 * book.rating;
        book.ratingBgc = this.determineRatingBgc(book.rating);
        const template = Handlebars.compile(this.dom.bookTemplate.innerHTML);
        const generatedHTML = template(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        this.dom.booksList.appendChild(element);
      }
    }
  
    getElements(){
      this.dom = {};
      this.dom.booksList = document.querySelector('.books-list');
      this.dom.bookTemplate = document.getElementById('template-book');
      this.dom.form = document.querySelector('.filters div');
      //console.log(this.dom);
    }

    initActions(){
      this.dom.booksList.addEventListener('click',(e) => {
        const target = e.target.offsetParent;
        if(target.tagName == 'A'){
          e.preventDefault();
        }
      });
  
      this.dom.booksList.addEventListener('dblclick',(e) => {
        const target = e.target.offsetParent;
        if(target.classList.contains('book__image')){
          const newFav = target.dataset.id;
          if(this.isThere(this.favoriteBooks, newFav)){
            this.favoriteBooks.push(newFav);
            target.classList.add('favorite');
          } else {
            const index = this.favoriteBooks.indexOf(newFav);
            this.favoriteBooks.splice(index, 1);
            target.classList.remove('favorite');
          }
          //console.log('favBooks: ', this.favoriteBooks);
        }
      });
  
      this.dom.form.addEventListener('click',(e) => {
        if(e.target.tagName === 'INPUT' && e.target.type === 'checkbox' && e.target.name === 'filter'){
          const category = e.target.value;
          if(e.target.checked){
            this.filters.push(category);
          } else {
            const index = this.filters.indexOf(category);
            this.filters.splice(index, 1);
          }
          //console.log('filters: ',this.filters);
          this.filterBooks();
        }
      });
    }

    isThere(arr, el){
      let count = 0;
      for(const element of arr){
        if (el === element) count++;
      }
      return count === 0 ? true : false;
    }

    filterBooks(){
      this.dom.imagesOfBooks = document.querySelectorAll('.book__image');
      console.log(this.dom);

      for(const book of this.data){
        let shouldBeHidden = false;
        //console.log('book nr',book.id, ' :', book.details);
        for(const category of this.filters){
          if(book.details[category]){
            shouldBeHidden = true;
            //console.log('book nr',book.id, ' should be greyed out');
            break;
          }
        }
        if(shouldBeHidden){
          this.dom.imagesOfBooks[book.id-1].classList.add('hidden');
        } else {
          this.dom.imagesOfBooks[book.id-1].classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
      if(rating <= 6){
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }

  const app = new BooksList();  // eslint-disable-line no-unused-vars
}