/* Script */


/* Creating new element */

function createBook(elem, elem_id, elem_title, elem_desription){
	let parent1 = document.getElementById('books');	
	let new_book = document.createElement('div');
	new_book.classList.add('book');
	parent1.appendChild(new_book);
	
	/* Add id */
	let book_id = document.createElement('div');
	book_id.classList.add('book_id');
	book_id.innerHTML = elem_id;
	new_book.appendChild(book_id);
	
	/* Add title */
	let book_title = document.createElement('div');
	book_title.classList.add('book_title');
	book_title.innerHTML = elem_title;
	new_book.appendChild(book_title);
	
	/* Add description */
	let book_description = document.createElement('div');
	book_description.classList.add('book_description');
	book_description.innerHTML = elem_desription;
	new_book.appendChild(book_description);
	
	/* Add button remove */
	let remove_btn = document.createElement('button');
	remove_btn.classList.add('remove_btn');
	remove_btn.innerHTML = 'Delete';
	new_book.appendChild(remove_btn);
	
	/* Add button check */
	let check_btn = document.createElement('button');
	check_btn.classList.add('check_btn');
	check_btn.innerHTML = 'Check';
	new_book.appendChild(check_btn);
	
	
	/* Remove book */
	remove_btn.addEventListener('click', function(event) {
	new_book.parentElement.removeChild(new_book);
	event.preventDefault();
	});
	
	
	/* Check book */
	check_btn.addEventListener('click',function(event){
		book_description.classList.toggle('check_book');
	});
	
	

	
}	




/* function load */
function load(){
	let mybooks = JSON.parse(books);
	for(let book of mybooks){
	 	createBook(book, book.id, book.title, book.description)
}

/* Show and close modal */;
let modal= document.getElementById('modal');
let close_modal = document.querySelector('.close_modal');
let add_new_book = document.getElementById('add_new_book');
add_new_book.addEventListener('click', showModal);
function showModal(){
	modal.style.display = "block";
}
close_modal.addEventListener('click', closeModal);
function closeModal(){
	modal.style.display = "none";
}



/* Form validation */
let form_book = document.querySelector('form');
let title =  document.querySelector('.title');
let description =  document.querySelector('.description');


function validationTitle(data){
	return data.length >= 5;
}

function validationDescription(data){
	return data.length >= 50;
}

title.addEventListener('input', function(event){
	const elem = event.target;
	if (!validationTitle(elem.value)){
		elem.classList.add('error');
	}else {
		elem.classList.remove('error');
	}
});


description.addEventListener('input', function(event){
	const elem = event.target;
	if (!validationDescription(elem.value)){
		elem.classList.add('error');
	}else{
		elem.classList.remove('error');
	}
});



form_book.addEventListener('submit', function(event){
	event.preventDefault();
	
	let titleData = title.value;
	let descriptionData = description.value;
	let isTitleValid = validationTitle(titleData);
	let isDescriptionValid = validationDescription(descriptionData);
	let bookData = 0;
	let book_id = document.querySelectorAll('.book_id');
	for(let elem of book_id){
		bookData = +elem.innerHTML;
	}
	if ( isTitleValid && isDescriptionValid){
		bookData++;
		createBook(form_book, bookData, titleData, descriptionData);
		setTimeout(() => {title.value = '';
		description.value = ''},
		1000);
	}else{
		alert('Title must contains minimum 5 symbols, description must contains minimum 50 symbols');
	}
	
	});
}