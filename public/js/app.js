console.log('Client side java script file loaded');

fetch('http://localhost:3000/weather?address=hyderabad').then((res) => {
    res.json().then(data => {
        if(data.error){
            console.log(data.error);
        }
        else{
            console.log(data.location);
            console.log(data.forecast);
        }
    })
})

const weatherForm = document.querySelector('form');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
})
