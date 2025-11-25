//Discionário de dados formato JSON
function dados() {
    let ds = [
                {id:1, login:"ringo", password:"1234@", nome:"Ringo Star", email:"ringo@gmail.com"},
                {id:2, login:"paul", password:"12345", nome:"Paul McCartney", email:"paul@gmail.com"},
                {id:3, login:"john", password:"123", nome:"John Lennon", email:"john@gmail.com"}
             ]

    let json = JSON.stringify(ds)

    localStorage.setItem("dados", json)
 
    //return ds    
}

//limpar
function limparCampos() {
            document.querySelector("#id").value = ""
            document.querySelector("#login").value = ""
            document.querySelector("#password").value = ""
            document.querySelector("#nome").value = ""
            document.querySelector("#email").value = ""
}

//CRUD

//Selecionar - Simulação SELECT (SQL)
function selecionarId(){
    //const ds = dados()
    let ds = JSON.parse(localStorage.getItem("dados"))

    let ids = parseInt(document.querySelector("#id").value)

    for(let i=0;i<ds.length;i++){
        if(ids == ds[i].id) {
            document.querySelector("#id").value = ds[i].id
            document.querySelector("#login").value = ds[i].login
            document.querySelector("#password").value = ds[i].password
            document.querySelector("#nome").value = ds[i].nome
            document.querySelector("#email").value = ds[i].email
        }
    }
}

//Inserir - simular INSERT(SQL)
function inserirDS(){
   // const ds = dados()

   let ds = JSON.parse(localStorage.getItem("dados"))

    //let ids //= parseInt(document.querySelector("#id").value)
    let lg =  document.querySelector("#login").value
    let ps =  document.querySelector("#password").value 
    let nm =  document.querySelector("#nome").value 
    let ma =  document.querySelector("#email").value 


    let dado = {id:Date.now(), login:lg, password:ps, nome:nm, email:ma}

    ds.push(dado)

    let json = JSON.stringify(ds)

    localStorage.setItem("dados", json)

    limparCampos()

}

//Bucar - simular SELECT


//Atualizar - simular UPDATE
function atualizar() {
    let ds = JSON.parse(localStorage.getItem("dados"))

    localStorage.removeItem("dados")

        let ids = parseInt(document.querySelector("#id").value)

    for(let i=0;i<ds.length;i++){
        if(ids == ds[i].id) {

            
            let lg =  document.querySelector("#login").value
            let ps =  document.querySelector("#password").value 
            let nm =  document.querySelector("#nome").value 
            let ma =  document.querySelector("#email").value 

    

           let dado = {id:ids, login:lg, password:ps, nome:nm, email:ma}

           ds[i] = dado

           let json = JSON.stringify(ds)

           localStorage.setItem("dados", json)

        }
    }
}

//Apagar - Delete
function apagar() {
    let ds = JSON.parse(localStorage.getItem("dados"))

    let id = parseInt(document.querySelector("#id").value)

    ds.splice(id, 1)

    let json = JSON.stringify(ds)

    localStorage.setItem("dados", json)

}

//Apagar tudo
function apagaTudo() {
    localStorage.removeItem("dados")
}











function apagarTeste() {
    let ds = JSON.parse(localStorage.getItem("dados"))

    let ids = parseInt(document.querySelector("#id").value)

   // ds.splice(id, 1)

      for(let i=0;i<ds.length;i++){
        if(ids == ds[i].id) {

            let index = ds[i].value

            console.log(index)

          //   alert(ds[i])

          //   alert("teste")
	
	        ds.splice(index, 1)

            let json = JSON.stringify(ds)

           localStorage.setItem("dados", json)

        }
     }

}



