const btn_closerModal = document.querySelector('#iconxhi');
const fade = document.querySelector('#fade');
const modal = document.querySelector('.modal_addcontato');

const btn_add = document.querySelector('#text_add')

const btn_cad = document.querySelector('#btn_cad')

const nome = document.querySelector('#f_nome')
const email = document.querySelector('#f_email')
const telefone = document.querySelector('#f_telefone')
const dtnasc = document.querySelector('#f_dt')

btn_closerModal.addEventListener("click", function(){
    modal.style.display = 'none'
    fade.style.display = 'none'
})
btn_add.addEventListener("click", function(){
    modal.style.display = 'block'
    fade.style.display = 'block'
    const endpoint = "http://127.0.0.1:1880/id"
    fetch(endpoint)
    .then(res=> res.json())
    .then(res=>{
        console.log(res)
    })
})

btn_cad.addEventListener("click", (evt)=>{
    nome.textContent
})
