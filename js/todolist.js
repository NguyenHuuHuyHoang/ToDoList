
function ToDoList() {
    this.Doing = [],
        this.Done = []
}

ToDoList.prototype.AddToDo = function () {
    let task = new ToDo();
    task.id = this['Doing'].length + this['Done'].length + 1;
    task.toDo = getEle('newTask').value;
    this['Doing'].push(task);
    getEle('newTask').value = '';
    SaveToLocalStorage(toDoList);
}

ToDoList.prototype.FindItemInArray = function(idTask) {
   let indexItem = this.Doing.findIndex(function(item){
       return item.id === idTask;
   });
   switch (indexItem) {
       case -1:
            return this.Done[this.Done.findIndex(function(item){
                return item.id == idTask;
            })];
       default:
           return this.Doing[indexItem];
   }
}

ToDoList.prototype.RemoveToDo = function (idToDo) {
    let objFound = this.FindItemInArray(idToDo);
    switch (objFound.isDone) {
        case false:
            {
                RemoveItemArray(idToDo, this.Doing);
                this.Render(0);
            }
            break;
        case true:
            {
                RemoveItemArray(idToDo, this.Done);
                this.Render(1);
            }
            break;
    }
    SaveToLocalStorage(toDoList);
}

ToDoList.prototype.CheckToDo = function (idToDo) {
    let objFound = this.FindItemInArray(idToDo);
    objFound.isDone = true;
    this.Done.push(objFound);
    RemoveItemArray(objFound, this.Doing);
    this.Render(0);
    this.Render(1);
    SaveToLocalStorage(toDoList);
}

ToDoList.prototype.CheckAllToDo = function () {
    for (var task of this.Doing) {
        task.isDone = true;
        this.Done.push(task);
    }
    this.Doing = [];
    this.RenderAll();
    SaveToLocalStorage(toDoList);
}

ToDoList.prototype.Sort = function (number) {
    if (number === 1){
        this.Doing = this.Doing.sort(compare);
        this.Done = this.Done.sort(compare)
        this.RenderAll();
    } else {
        this.Doing = this.Doing.sort(compareRev);
        this.Done = this.Done.sort(compareRev)
        this.RenderAll();
    }
    
}

function compare(a, b) {
    if (a.toDo < b.toDo) {
        return -1;
    }
    if (a.toDo > b.toDo){
        return 1;
    } 
    return 0;
}

function compareRev(a, b) {
    if (a.toDo < b.toDo) {
        return 1;
    }
    if (a.toDo > b.toDo){
        return -1;
    } 
    return 0;
}


ToDoList.prototype.Render = function (indexData) {
    let arrData = indexData === 0 ? this.Doing : this.Done;
    let newArrData = arrData.map(function (data) {
        return `<li><span>${data.toDo}</span>
        <div class="buttons">
        <button class="remove" onclick="toDoList.RemoveToDo(${data.id})"><i class="fa fa-trash-alt"></i></button>
        <button class="complete" onclick="toDoList.CheckToDo(${data.id})"><i class="fas fa-check-circle"></i><i class="far fa-check-circle"></i></button>  
        </div>       
        </li>`
    })

    if (indexData !== 0) {
        getEle('completed').innerHTML = newArrData.join('');
    } else {
        getEle('todo').innerHTML = newArrData.join('');
    }
}

ToDoList.prototype.RenderAll = function () {
    this.Render(0);
    this.Render(1);
}

function RemoveItemArray(idItem, array) {
    array.splice(array.indexOf(idItem), 1);
}



