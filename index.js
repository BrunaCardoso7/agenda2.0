const btn_closerModal = document.querySelector('#iconxhi');
const fade = document.querySelector('#fade');
const modal = document.querySelector('.modal_addcontato');

const btn_add = document.querySelector('#text_add')

const btn_cad = document.querySelector('#btn_cad')

const nome = document.getElementById('f_nome')
const email = document.getElementById('f_email')
const telefone = document.getElementById('f_tel')
const dtnasc = document.getElementById('f_dt')
const id = document.getElementById('f_id')
const labelid = document.getElementById('labelid')

const dados = document.querySelector('#dados')



btn_closerModal.addEventListener("click", function(){
    modal.style.display = 'none'
    fade.style.display = 'none'
})
btn_add.addEventListener("click", function(){
    const editartext = document.querySelector(".textmodal")
    editartext.innerHTML = "Novo contato"

    const btn = document.querySelector("#btn_cad")
    btn.innerHTML = "cadastrar"

    modal.style.display = 'block'
    fade.style.display = 'block'

    id.style.display = "none"
    labelid.style.display = "none"
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
    const up = document.querySelector("#up")
    const valorpesq = document.querySelector("input[name=f_radius]:checked").value
    const entpoint = `http://127.0.0.1:1880/pesqcontatos/${valorpesq}/${barra_pesquisa.value}`;
    fetch(entpoint)
    .then(res=>res.json())
    .then((res)=>{
        up.style.display = "none"
        dados.innerHTML = ""
        
        res.forEach((element) => {
            const rowtable = document.createElement("tr")
            rowtable.setAttribute("class", "conteinertablebody")

            for (let key in element){
                const itemtable = document.createElement("td")
                itemtable.className = 'itensrowtd'
                itemtable.setAttribute("id", `itensrowtd[key]`)
                itemtable.innerHTML = element[key]

                rowtable.appendChild(itemtable)
            }

            dados.appendChild(rowtable)
        });
      
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
function reseterror(erroelement){
    erroelement.innerHTML = ""
}
const preencherdatareview = ()=>{
    const enqpoint = `http://127.0.0.1:1880/contatos`;
    fetch(enqpoint)
    .then(res=>res.json())
        .then((res)=>{
            dados.innerHTML = ""

            res.forEach((element) => {
                const rowtable = document.createElement("tr")
                rowtable.setAttribute("class", "conteinertablebody")

                for (let key in element){
                    const itemtable = document.createElement("td")
                    itemtable.className = 'itensrowtd'
                    itemtable.setAttribute("id", `itensrowtd[key]`)
                    itemtable.innerHTML = element[key]

                    rowtable.appendChild(itemtable)
                }
                const updates = document.createElement("td")
                updates.setAttribute("class", "itensrowtdedt")
                const img = document.createElement("i")
                img.className =  "fa-solid fa-trash-can "
                
                img.addEventListener("click", (evt)=>{
                    
                    
                    deletecontato(id)
                })
                
                const img2 = document.createElement("i")
                img2.className =  "fa-solid fa-pen-to-square"
                img2.addEventListener("click", ()=>{
                    const editartext = document.querySelector(".textmodal")
                    editartext.innerHTML = "Editar contato"

                    const btn = document.querySelector("#btn_cad")
                    btn.innerHTML = "Editar"

                    id.style.display = "block"
                    labelid.style.display = "block"

                    modal.style.display = 'block'
                    fade.style.display = 'block'
                    btn.addEventListener("click", ()=>{
                        
                        location.reload()
                    })

                })
                updates.appendChild(img)
                updates.appendChild(img2)
                
                rowtable.appendChild(updates)
                
                dados.appendChild(rowtable)
                
            })
        })
}
preencherdatareview()


function deletecontato(id){
    let endpoint = `http://127.0.0.1:1880/deletecontatos/${id}`
    fetch(endpoint)
    .then((res)=>{
        console.log('bundA')
        if(res == 200){
            preencherdatareview()
        }
    })
}
