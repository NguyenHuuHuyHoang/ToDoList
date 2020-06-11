var toDoList = new ToDoList();
var validate = new Validation();
getToDay('showToDay');

toDoList = GetDataFromLocalStorage(toDoList);
toDoList.RenderAll();


getEle('newTask').addEventListener('keyup', function(event){
    event.preventDefault();
    if (event.keyCode === 13) {
        getEle('addItem').click();
    }
});
getEle('addItem').addEventListener('click', function(){
    if (!validate.CheckValidation(getEle('newTask').value)){
        getEle('newTask').value = '';
        getEle('newTask').focus();
    } else {
        toDoList.AddToDo();
        toDoList.Render(0);
    }
});

getEle('one').addEventListener('click', function(){
    toDoList.CheckAllToDo();
});

getEle('two').addEventListener('click', function(){
    toDoList.Sort(1);
});
getEle('three').addEventListener('click', function(){
    toDoList.Sort(0);
});