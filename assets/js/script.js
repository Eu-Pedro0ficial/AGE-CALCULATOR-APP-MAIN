'use strict';
const form = document.getElementById('data-form');
const submitter = document.querySelector('#form-button');
const date = new Date();
const pattern = new RegExp('[^a-zA-Z0-9]+|[a-zA-Z]+');

function howManyDays(month, year) {
    var data = new Date(year, month, 0);
    return data.getDate();
}

let hasErrors = false;

function addErrorClass(){
    document.querySelectorAll('.input-and-label').forEach((field)=>{
        field.classList.add('invalid');
    });
}

document.querySelectorAll('.input-field').forEach((elementField)=>{

    elementField.addEventListener('input', (event)=>{
        if(pattern.test(elementField.value)){
            elementField.classList.contains('invalid') ?
            '':
            elementField.closest('.input-and-label').classList.add('invalid');
            
            hasErrors = true;
        }else{
            elementField.closest('.input-and-label').classList.remove('invalid');
            hasErrors = false;
        }
    });

});

document.querySelector('#data-form').addEventListener('submit', ( event )=>{
    event.preventDefault();

    if(hasErrors){
        window.alert('Fill in the fields correctly');
        return;
    }

    const formData = new FormData(form, submitter);

    const dataValues = new Array;
    let n = 0;
    for(const [key, value] of formData){
        dataValues[n] = new Object
        dataValues[n][key] = new Object
        dataValues[n][key].value = value;
        
        n++
    }

    dataValues.forEach((element) => {
        let key = Object.keys(element)

        if(element[key].value === ''){
            element[key].error = true;
            element[key].message = 'This field is required';

            return
        }else if(pattern.test(element[key].value)){
            element[key].error = true;
            element[key].message = 'Add a valid value';
            
            return
        }

        element[key].error = false;
    })

    dataValues.forEach((element) => {
        let key = Object.keys(element)

        if(!element[key].error){
            if(key[0] === 'day'){
                if(element[key].value > 31 || element[key].value < 0){
                    element[key].error = true;
                    element[key].message = 'Must be a valid day'
                }
            }

            if(key[0] === 'month'){
                if(element[key].value > 12 || element[key].value < 1){
                    element[key].error = true;
                    element[key].message = 'Must be a valid month'
                }
            }

            if(key[0] === 'year'){
                if(element[key].value > date.getFullYear()){
                    element[key].error = true;
                    element[key].message = 'Must be a valid month'
                }
            }
        }
    })
    const day = Number(dataValues[0]['day'].value);
    const month = Number(dataValues[1]['month'].value);
    const year = Number(dataValues[2]['year'].value);

    const daysOfTheMonth = howManyDays(month, year.value)

    if(day > daysOfTheMonth){
        window.alert('Invalid date, please enter a valid date');
        addErrorClass();
        return
    }

    dataValues.forEach((element) => {
        let key = Object.keys(element)
        let htmlElement = document.getElementById(key);

        if(htmlElement.classList.contains('invalid')){
            let dangerMessage = document.querySelector(`#${key} #paragraph`);
            htmlElement.classList.remove('invalid');
            dangerMessage.parentNode.removeChild(dangerMessage);
        }

        if(element[key].error){

            htmlElement.classList.add('invalid');
            let paragraph = document.createElement('p');
            paragraph.setAttribute('id', 'paragraph')
            paragraph.innerText = element[key].message;
            
            htmlElement.appendChild(paragraph);
        }
    })

    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    
    let livedYears = currentYear - year;
    
    if(currentMonth < month){
        livedYears -= 1;
    }
    
    let livedMonth = (12 - month) + currentMonth;
    let livedDay = currentDay - day;
    
    if(currentDay < day){
        livedMonth -= 1;
        livedDay = (day + 30) - currentDay;
    }

    document.querySelector('#days').innerText = livedDay;
    document.querySelector('#months').innerText = livedMonth;
    document.querySelector('#years').innerText = livedYears;
});