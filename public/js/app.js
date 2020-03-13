console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mo = document.querySelector('#mesage-1')
const mt = document.querySelector('#mesage-2')

// mo.textContent = 'for js'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    mo.textContent = 'loading ....'
    mt.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                mo.textContent = data.error
            } else {
                mo.textContent = data.location
                mt.textContent = data.forecast
                
            }
        })
    })
})