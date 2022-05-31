//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".add-task__input");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.querySelector(".todo__list");//ul of #todo__list
var completedTasksHolder=document.querySelector(".completed__list");//completed__list


//New task list
var createNewTaskElement=function(taskString){

    var listTask=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    listTask.className='task';
    checkBox.className='task__checkbox';
    label.innerText=taskString;
    label.className='task__title';

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="input";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="button task__edit";

    deleteButton.className="button task__delete";
    deleteButtonImg.className="img-delete";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.alt='delete';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listTask.appendChild(checkBox);
    listTask.appendChild(label);
    listTask.appendChild(editInput);
    listTask.appendChild(editButton);
    listTask.appendChild(deleteButton);
    return listTask;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list task with the text from the #new-task:
    if (!taskInput.value) return;
    var listTask=createNewTaskElement(taskInput.value);

    //Append listTask to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listTask);
    bindTaskEvents(listTask, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listTask=this.parentNode;

    var editInput=listTask.querySelector('.input');
    var label=listTask.querySelector("label");
    var editBtn=listTask.querySelector(".task__edit");
    var containsClass=listTask.classList.contains("task_edit-mode");
    //If class of the parent is .task_edit-mode
    if(containsClass){

        //switch to .task_edit-mode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .task_edit-mode on the parent.
    listTask.classList.toggle("task_edit-mode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listTask=this.parentNode;
    var ul=listTask.parentNode;
    //Remove the parent list task from the ul.
    ul.removeChild(listTask);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list task to the #completed__list
    var listTask=this.parentNode;
    completedTasksHolder.appendChild(listTask);
    bindTaskEvents(listTask, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list task to the #todo__list.
    var listTask=this.parentNode;
    incompleteTaskHolder.appendChild(listTask);
    bindTaskEvents(listTask,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(listTask,checkBoxEventHandler){
    console.log("bind list task events");
//select listTasks children
    var checkBox=listTask.querySelector(".task__checkbox");
    var editButton=listTask.querySelector(".task__edit");
    var deleteButton=listTask.querySelector(".task__delete");

    console.log(editButton)

    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list tasks
//for each list task
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list tasks chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list tasks
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list tasks chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.