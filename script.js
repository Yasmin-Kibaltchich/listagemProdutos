const produtosArray = [];
class Produto {
    constructor(CdProduto,nomeProduto,cdStatus,descricaoProduto,valorProduto){
        this.CdProduto = CdProduto == null ? 0 : CdProduto
        this.NomeProduto = nomeProduto ,
        this.CdStatus  =  cdStatus == "sim" ? 1 : 0
        this.DescricaoProduto = descricaoProduto ,
        this.ValorProduto = parseFloat(valorProduto)
    }
    
};


const formulario = document.getElementById('formProduto');

 formulario.addEventListener('submit', function (event)   {
    (event).preventDefault(); 
    const formData = new FormData(formulario);
    const nome = formData.get('nomeProduto');
    const descricao = formData.get('descricaoProduto');
    const valor = formData.get('valorProduto');
    const disponivel = formData.get('disponivelProduto');
 

    const produtoNovo = new Produto(CdProduto = null, NomeProduto = nome, CdStatus = disponivel, DescricaoProduto = descricao, ValorProduto = valor)
      
    fetch("http://localhost:8000/PostProdutos",{
    method: "POST",      
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(produtoNovo)
    }).then((response) => console.log('Resposta json',response.json()));
       
        ListarProdutos()
}  );

 
   
function GetProdutos(url) {
   
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET',url,false);
    xhttp.send();
                
    return JSON.parse(xhttp.responseText);
     
}   

function  ListarProdutos(){
    const lista = document.getElementById('lista-produtos');
    lista.innerHTML = '';

    const jsonData = GetProdutos('http://127.0.0.1:8000/GetProdutos') 
    console.log (jsonData)
    for (let chave in jsonData) {
    const produto = new Produto
        (CdProduto = jsonData[chave].CdProduto,
        NomeProduto = jsonData[chave].NomeProduto,
        CdStatus = jsonData[chave].CdStatus == 1 ? "sim" : 0,
        DescricaoProduto = jsonData[chave].DescricaoProduto, 
        ValorProduto = jsonData[chave].ValorProduto            
        )
        produtosArray.push(produto);  
    
    } 
    
    const produtoList = produtosArray;
    
    for (const produto in produtoList){
    
         const linha = document.createElement('tr');
         const id = document.createElement('td');
         const nomeCelula = document.createElement('td');
         const descricaoCelula = document.createElement('td');
         const valorCelula = document.createElement('td');
         const disponivelCelula = document.createElement('td');
         const botaoCelula = document.createElement('input');
         id.textContent = produtoList[produto].CdProduto;
         nomeCelula.textContent = produtoList[produto].NomeProduto;
         descricaoCelula.textContent = produtoList[produto].DescricaoProduto;
         valorCelula.textContent = produtoList[produto].ValorProduto;
        
                 
         id.innerText = produtoList[produto].CdProduto;
         nomeCelula.innerText = produtoList[produto].NomeProduto;
         descricaoCelula.innerText = produtoList[produto].DescricaoProduto;
         valorCelula.innerText = produtoList[produto].ValorProduto;
         disponivelCelula.innerText = produtoList[produto].CdStatus == "1" ? "Sim" : "Não" ;  
         
        botaoCelula.type = "button";
        botaoCelula.value = "Novo a partir deste";
        botaoCelula.className = "btn btn-outline-primary";
        botaoCelula.addEventListener('click', function () {
            document.getElementById('nomeProduto').value = produtoList[produto].NomeProduto;
            document.getElementById('descricaoProduto').value = produtoList[produto].DescricaoProduto;
            document.getElementById('valorProduto').value = produtoList[produto].ValorProduto;
            document.getElementById('disponivelProduto').value = produtoList[produto].CdStatus == "1" ? "Sim" : "Não";
        })

         linha.appendChild(id);
         linha.appendChild(nomeCelula);
         linha.appendChild(descricaoCelula);
         linha.appendChild(valorCelula);
         linha.appendChild(disponivelCelula);  
         linha.appendChild(botaoCelula); 
         lista.appendChild(linha);
    
    }
    
}