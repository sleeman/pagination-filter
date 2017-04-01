let studentItems = Array.from(document.querySelectorAll('.student-item'));
let studenList = document.querySelector('.student-list');
let page = document.querySelector('.page');
let pageHeader = document.querySelector('.page-header')
let numPerPage = 10;
let aLink = Math.ceil(studentItems.length / numPerPage);
let searchField = document.createElement('div');
let studentName = Array.from(document.querySelectorAll('h3'));

// Display the first 10 Items
function displayItems(items){
	items.forEach((item, i, arr) => {
		item.style.display = "none";
		let itemToShow = arr.slice(0, 10);
		itemToShow.forEach(el => el.style.display = "block")
	})
}


// Creating search field
function makinSearchField(ele) {
	ele.className = "student-search"
	 let eleInput = document.createElement('input');
	 let eleButton = document.createElement('button');
	     eleInput.className = "input-search";
	     eleInput.setAttribute('placeholder', 'Search for students...')
	     eleInput.type = "text";		
	 	 eleButton.innerHTML = "Search"	
	 ele.appendChild(eleInput)
	 ele.appendChild(eleButton)
	return ele;
}


// Creating pagination
function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');
        list.className = "pagination";
        let arrLink = [];
    for(var i = 1; i <= array; i++) {
        // Create the list item:
        var item = document.createElement('li');
        let link = document.createElement('a');
        link.setAttribute('href', '#');

        // Set its contents:
        item.appendChild(link);
        link.appendChild(document.createTextNode(i));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}


// Append pagination to the page
page.appendChild(makeUL(aLink))

// Append search field
pageHeader.appendChild(makinSearchField(searchField))

// selecting all the a href in the pagination
let linkClick = Array.from(document.querySelector('.pagination').querySelectorAll('a'));

// add class active to the first link
linkClick[0].classList.add('active')


// Function change the student when you click on the pagination link
function theItem(){
		messageClass.style.display = "none";

		event.preventDefault();

		linkClick.map((el, i, arr) => {
			el.classList.remove('active');
		})

		this.classList.add("active");

		let num = parseInt((this.innerHTML + "0") - 10);

		let itemToDisplay = studentItems.slice(num, num + 10);

		studentItems.map(el => el.style.display = "none");

		itemToDisplay.map((el, i, arr) => {
			el.style.display = "block";
		});
}

// click event trigger the theItem function
linkClick.forEach( (iLink,i, arr) => { iLink.addEventListener('click', theItem)});

// selecting the input field
let eleInput = document.querySelector('input');

// selecting the button
let eleButton = document.getElementsByTagName('button')[0];

// function creat message when no matches found when you search
function addMessage(ele) {
	let message = document.createElement('p');
	message.setAttribute('class', 'message')
	message.appendChild(document.createTextNode('sorry no matches found'));
	page.insertBefore(message, studenList)
	message.style.display = "none"	
}

addMessage();

// selecting the message element
let messageClass = document.querySelector('.message');

function loopSearch() {
	
	// selecting the input field value
	let filter = eleInput.value.toUpperCase();

	// result function to count the length of how many items return from the search 
	let result = studentName.reduce((allnames, name) => {
		if(name.innerHTML.toUpperCase().indexOf(filter) > -1){
			allnames.push(name)
		}
		return allnames
	}, [])


  // Loop through the search result and return different result based on the input value that enter	
  studentName.filter((el, i, arr) => {

  	if (result.length === 0) {
  		studentItems[i].style.display = "none";
		messageClass.style.display = "block"

		}else if(filter.length === 0){
			displayItems(studentItems)
			messageClass.style.display = "none"	
			linkClick.forEach(el => el.classList.remove('active'))
			linkClick[0].classList.add('active')

		}else if(arr[i].innerHTML.toUpperCase().indexOf(filter) > -1 ){
			studentItems[i].style.display = "block";
			messageClass.style.display = "none"	
			linkClick.forEach(el => el.classList.remove('active'))
			
		}else {
			studentItems[i].style.display = "none";
			linkClick.forEach(el => el.classList.remove('active'))
			linkClick[0].classList.add('active')
			
		}
  })
}


eleButton.addEventListener('click', loopSearch)

displayItems(studentItems);

