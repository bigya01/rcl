const xhr = new XMLHttpRequest()


xhr.addEventListener('load',  ()=> {
    console.log("xhr response",xhr.response)
})


xhr.open('GET', 'https://supersimplebackend.dev/')
xhr.send()
console.log("xhr response",xhr.response)
// response ko lai time lagxa so undefined 