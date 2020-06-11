//GLOBAL UTIL

function getEle(Ele) {
    return document.getElementById(Ele);
}


//VALIDATION

function Validation() {};
Validation.prototype.CheckValidation = function (value) {
    let regexNotAllNumber = /^\d+$/;
    if (value.trim().length === 0){
        alert('Không được để trống');
        return false;
    } else if (value.match(regexNotAllNumber)) {
        alert('Không được nhập hoàn toàn bằng số');
        return false;
    }
    return true;
}


//DATE TIME


function getToDay(element){
    var now = new Date();
    document.getElementById(element).innerHTML = `${getDayVN(now.getDay())}, Ngày ${now.getDate()} Tháng ${getMonthVN(now.getMonth())} Năm ${now.getFullYear()}`;
}

function getDayVN(value) {
    switch(value) {
        case 0:
        return 'Chủ nhật';
        case 1:
        return 'Thứ hai';
        case 2:
        return 'Thứ ba';
        case 3:
        return 'Thứ tư';
        case 4:
        return 'Thứ năm';
        case 5:
        return 'Thứ sáu';
        case 6:
        return 'Thứ bảy';
    }
}

function getMonthVN(value){
    return value + 1;
}



//LOCAL STORAGE

function SaveToLocalStorage (dataObject){
    console.log(dataObject);
    localStorage.setItem('ListToDo',JSON.stringify(dataObject));
}

function GetDataFromLocalStorage(Object){
    let objSaved = JSON.parse(localStorage.getItem('ListToDo'));
    if (objSaved){
        Object.Doing = objSaved.Doing.slice();
        Object.Done = objSaved.Done.slice();
    } 
    return Object;
}