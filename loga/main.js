var list_items = [];

function Create_items(number){
	for (var i=1;i<=number;i++){
  	let item = "Item " + i;
    list_items.push(item);
  }
}

const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = 5;//numeros de elementos por pagina
let limit = 5;//numero de paginas
let number_of_items = 75;//numero de items para serem listados


Create_items(number_of_items);

function DisplayList(items, wrapper, rows_per_page, page){
    wrapper.innerHTML = "";
    page--;
    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start,end);
    
    for( let i = 0; i < paginatedItems.length;i++){
        let item = paginatedItems[i];

        let item_element = document.createElement('div');
        item_element.classList.add('item');
        item_element.innerText = item;

        wrapper.appendChild(item_element);
    }
    
    
}

function SetupPagination(items,wrapper,rows_per_page){
    wrapper.innerHTML = "";
		
    var maxLeft = (current_page - Math.floor(limit/2));
    var maxRight = (current_page + Math.floor(limit/2));
    let page_count = Math.ceil(items.length / rows_per_page);

		if(maxLeft < 1 ){
      maxLeft = 1;
			maxRight = limit;
    }
  	
    if(maxRight > page_count){
			maxLeft = page_count-(limit-1);
			if(maxLeft<1) maxLeft = 1;
      
      maxRight = page_count;
    }
    
    if(page_count>limit){
    	let btn = PaginationButton('First');
      wrapper.appendChild(btn);
    }
    
    if(page_count>limit){
    	let btn = PaginationButton('>');
      wrapper.appendChild(btn);
    }
    
    for (let i=maxLeft;i < maxRight + 1 ;i++){
        let btn = PaginationButton(i);
        wrapper.appendChild(btn);
    }

    if(page_count>limit){
    	let btn = PaginationButton('<');
      wrapper.appendChild(btn);
    }

    if(page_count>limit){
    	let btn = PaginationButton('Last');
      wrapper.appendChild(btn);
    }

}

function PaginationButton(page){
    let button = document.createElement('button');
    button.innerText = page;
    if ( current_page == page ) button.classList.add('active');
    if(page=='First') page=1;
    if(page=='>') page = (current_page < Math.ceil(number_of_items / rows) ? current_page+1 : Math.ceil(number_of_items / rows));;
    if(page=='Last') page=Math.ceil(number_of_items / rows);
		if(page=='<') page = (current_page > 1 ? current_page-1 : 1);
    button.value = page;
    

    button.addEventListener('click',function(){
        current_page = page;
        DisplayList(list_items,list_element,rows,current_page);
        let current_btn = document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove('active');

        this.classList.add('active');
        SetupPagination(list_items, pagination_element,rows);
    })

    return button;
}

DisplayList(list_items,list_element,rows,current_page);
SetupPagination(list_items, pagination_element,rows);