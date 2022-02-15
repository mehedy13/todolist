
//Caching the DOm Elements
const todoList= document.querySelector(".todo-list");
const inputBtn=document.querySelector(".todo-button")
const formInput= document.querySelector(".todo-input");
const form=document.querySelector("form");
const checkBtn=document.querySelector(".check");
const delBtn=document.querySelector(".trash");
//event listener

form.addEventListener('submit', function(event){
	event.preventDefault();
	//capturing the user input
	let userInp = formInput.value;
	renderTodo(userInp);
	

	//save item to loacl storage

	saveIntoStorage(userInp);
	//Emptying the input filed

	formInput.value="";

});

// checkBtn.addEventListener("click", function(){
// 	const todoDiv=checkBtn.parentNode;
// 	todoDiv.classList.add("completed");
	
// });

// delBtn.addEventListener("click", function(){

// 	const todoDiv=delBtn.parentNode;
// 	todoDiv.classList.add("drop-effect");
// 	// setTimeout(function(){
// 	// 	todoDiv.remove();
// 	// },2000);
// 	todoDiv.addEventListener("transitionend",function(){
// 		todoDiv.remove();
// 	});

// });

todoList.addEventListener("click", function(event){

	const targetEl=event.target;

	if(targetEl.className==="check"){
		const todoDiv=targetEl.parentNode;
		todoDiv.classList.add("completed");
		targetEl.remove();

} else if(targetEl.className==="trash"){

		const todoDiv=targetEl.parentNode;
		const todo=todoDiv.children.innerText;
		deleteFromStorage(todo);
		todoDiv.classList.add("drop-effect");
		todoDiv.addEventListener("transitionend", function(){
 		todoDiv.remove();
 	 
	});
}

});

//render fuction

function renderTodo(todo){
	//creating the todo div element
	const todoDiv=document.createElement('div');
	todoDiv.className="todo";
	//creating the li element
	const todoLi=document.createElement('li');
	todoLi.className="todo-item";
	todoLi.innerText=todo;
	todoDiv.append(todoLi);
	//creating the check button
	const checkBtn=document.createElement('button');
	checkBtn.className="check";
	checkBtn.innerHTML='<i class="fas fa-check"></i>';
	todoDiv.append(checkBtn);
	//creating the delete button
	const delBtn=document.createElement('button');
	delBtn.className="trash";
	delBtn.innerHTML='<i class="fas fa-trash"></i>';
	todoDiv.append(delBtn);
	console.log("event working");
	console.log(todoDiv);

	//appending the child  element to the parent element 
	todoList.append(todoDiv);
}

//IMPLEMENTING LOCAL STORAGE FUNCTIONALITY

function checkStorage(){
	let todoArray;
	if (localStorage.getItem("todos")) {
		const todoList=localStorage.getItem("todos");
		todoArray=JSON.parse(todoList);
	}
	else{
		todoArray=[];
	}
	return todoArray;
}
//Set item to the local storage
function saveIntoStorage(todo){
	let arr=checkStorage();
	arr.push(todo);
	localStorage.setItem("todos",JSON.stringify(arr));
	arr=[];

}
//get the item from the local storage

function renderFromStorage(){
	const arr=checkStorage();
	

	//render the todo element 
	if(arr){
		for(let i=0;i < arr.length; i++){
			renderTodo(arr[i]);
		}
	}
}

//delete item from locastorage
function deleteFromStorage(todo){
	const arr=checkStorage();
	const index=arr.indexOf(todo);
	arr.splice(index, 1);
	localStorage.setItem("todos", JSON.stringify(arr));
}

renderFromStorage();

//JSON Data- Javascript object notation
//1.Convert the data into JSON
//2.Save the data into local storage

