const btn_closerModal = document.querySelector('#iconxhi');
const fade = document.querySelector('#fade');
const modal = document.querySelector('.modal_addcontato');

const btn_add = document.querySelector('#text_add')

const btn_cad = document.querySelector('#btn_cad')

const nome = document.getElementById('f_nome')
const email = document.getElementById('f_email')
const telefone = document.getElementById('f_tel')
const dtnasc = document.getElementById('f_dt')

btn_closerModal.addEventListener("click", function(){
    modal.style.display = 'none'
    fade.style.display = 'none'
})
btn_add.addEventListener("click", function(){
    modal.style.display = 'block'
    fade.style.display = 'block'

})


window.addEventListener("DOMContentLoaded", function () {
    const btn_cad = document.getElementById("btn_cad");

    btn_cad.addEventListener("click", function (evt) {
        evt.preventDefault(); // Evita o envio do formulário

        const f_nome = document.getElementById("f_nome").value;
        const f_tel = document.getElementById("f_tel").value;
        const f_email = document.getElementById("f_email").value;
        const f_dt = document.getElementById("f_dt").value;

        const dados = {
        nome: f_nome,
        telefone: f_tel,
        email: f_email,
        dataNascimento: f_dt
        };

        console.log(dados);

        const cabecalho = {
            method: 'POST',
            body: JSON.stringify((dados))
        }


        const endpoint = "http://127.0.0.1:1880/addcontatos";
        fetch(endpoint, cabecalho)
        // .then(res=> res.json())
        .then(res=>{
            if(res.status == 200){
                console.log('bunda')
                return reset()
            
            }else{
                for (let i = 0; i<3; i++){
                    alert('FEROOU O SISTEMAAAA PREPARE-SE PARA  THE SHUTDOWN!!!!! UMA AMEAÇA FOI DETECTADA PREPARE PRA O SHUTDOWN')
                }

            }
        })
    });
});

function reset(){
    nome.value = ''
    email.value = ''
    telefone.value = ''
    dtnasc.value = ''
}


// window.addEventListener("DOMContentLoaded", function() {
const barra_pesquisa = document.querySelector('#f_pesquisar')
const btn_pesq = document.querySelector('#btn_add')

btn_pesq.addEventListener("click", (evt)=>{
    if(barra_pesquisa.value == ""){
        barra_pesquisa.focus()
        return erro()
    }

    const valorpesq = document.querySelector("input[name=f_radius]:checked").value
    const entpoint = `http://127.0.0.1:1880/pesqcontatos/${valorpesq}/${barra_pesquisa.value}`;
    fetch(entpoint)
    .then(res=>res.json())
    .then(res=>
        console.log(res)
    )
})

function erro(){
    const erroelement = document.createElement('p')
    erroelement.className = 'texterror'
    
    erroelement.textContent = "digite algo no campo!"
    
    const fatterElement = document.querySelector('#conteiner_pag')
    const elementref = document.querySelector('#table_contatos')
    fatterElement.parentElement.insertBefore(erroelement, elementref)
    
    return setTimeout(()=>reseterror(erroelement), 1000)
}
function reseterror(erroelement){
    const elemento = erroelement
    elemento.textContent = ''
}
// });




