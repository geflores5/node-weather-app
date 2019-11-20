const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const topMessage = document.querySelector('#topMessage')
const bottomMessage = document.querySelector('#bottomMessage')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    topMessage.textContent = 'Loading...'
    bottomMessage.textContent = ''
    if (address.value === ';') {
        address.value = '!'
    }

    fetch(`http://localhost:3000/weather?address=${address.value}`).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                topMessage.textContent = data.error
            } else {
                topMessage.textContent = data.location
                bottomMessage.textContent = data.forecast
            }
        })
    })
    document.querySelector('input').value = ''
})