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



const barra_pesquisa = document.querySelector('#f_pesquisar')
const btn_pesq = document.querySelector('#btn_add')

btn_pesq.addEventListener("click", (evt)=>{
    if(barra_pesquisa.value == ""){
        barra_pesquisa.focus()
        return erro()
    }
    let dados = document.querySelector('#dados')
    const valorpesq = document.querySelector("input[name=f_radius]:checked").value
    const entpoint = `http://127.0.0.1:1880/pesqcontatos/${valorpesq}/${barra_pesquisa.value}`;
    fetch(entpoint)
    .then(res=>res.json())
    .then((res)=>{
        dados.innerHTML = ""
        console.log(res)
        res.forEach((element) => {
            const tablebody = document.querySelector('.conteinertablebody')
            const rowtable = document.createElement("tr")
            // const tablebody = document.querySelector('#elementRef')

            const c1 = document.createElement("td")
            c1.className = 'itensrowtd'
            c1.setAttribute("id", "itensrowtd1")
            c1.innerHTML = res[0].n_id_contatos
            rowtable.appendChild(c1)

            const c2 = document.createElement("td")
            c2.className = 'itensrowtd'
            c2.setAttribute("id", "itensrowtd2")
            c2.innerHTML = res[1].s_nome_contatos
            rowtable.appendChild(c2)

            const c3 = document.createElement("td")
            c3.className = 'itensrowtd'
            c3.setAttribute("id", "itensrowtd3")
            c3.innerHTML = res[2].n_telefone_contatos
            rowtable.appendChild(c3)

            const c4 = document.createElement("td")
            c4.className = 'itensrowtd'
            c4.setAttribute("id", "itensrowtd4")
            c4.innerHTML = res[3].s_email_contatos
            rowtable.appendChild(c4)

            const c5 = document.createElement("td")
            c5.className = 'itensrowtd'
            c5.setAttribute("id", "itensrowtd5")
            c5.innerHTML = res[4].dt_dtnasc_contatos
            rowtable.appendChild(c5)

            
            tablebody.appendChild(rowtable)
        }, 0);
      
    })
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





