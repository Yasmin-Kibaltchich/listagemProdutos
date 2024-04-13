import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from pydantic import BaseModel, Field


app = FastAPI()

origins=['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Produtos (BaseModel):
    CdProduto:int
    NomeProduto: str
    CdStatus: bool 
    DescricaoProduto: str
    ValorProduto: float


def venda_disponivel(self) -> str:
    return "sim" if self.cdStatus == 0 else "não"

@app.get("/")
def BoasVindas():
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()
    sql = "SELECT * FROM Produto"
    response = cursor.execute(sql)
    response.fetchall()
    cursor.close()
    print (response)
    return {'Mensagem': 'Bem vindo ao API de Produtos'}

@app.get('/GetProdutos')
def GetProdutos():
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()
    sql = "SELECT CdProduto, NomeProduto, CdStatus, DescricaoProduto, ValorProduto FROM Produto order by ValorProduto asc"
    response = cursor.execute(sql)
    listaProdutos = []
    for produto in response:
        produto_dict = {
            'CdProduto': produto[0],
            'NomeProduto': produto[1],
            'CdStatus': produto[2],
            'DescricaoProduto': produto[3],
            'ValorProduto': produto[4]
        }
        listaProdutos.append(produto_dict)  
    fetchall = response.fetchall()
    
    cursor.close()
       
    return listaProdutos




@app.post('/PostProdutos')
def CreateProdutos(info: Produtos):
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()
    
    
    cursor.execute("INSERT INTO Produto( NomeProduto,CdStatus, DescricaoProduto, ValorProduto) VALUES (?, ?, ?, ?)",(info.NomeProduto ,info.CdStatus,  info.DescricaoProduto, info.ValorProduto))
     
    conn.commit()
    cursor.close()
    
    
    return {"Mensagem":"Produto criado com sucesso"}




@app.put('/UpdateProdutos/{cdProduto}')
def UpdateProdutos(cdProduto: int, info: Produtos):
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()


    cursor.execute("SELECT * FROM Produto WHERE CdProduto = ?", (cdProduto,))  
    existe_produto = cursor.fetchone()


    if not existe_produto:
        raise FastAPI.HTTPException(status_code=404, detail= 'Produto não encontrado')
   
    cursor.execute("""
                   UPDATE Produto
                   SET CdProduto = ?, CdStatus = ?, NomeProduto = ?, DescricaoProduto = ?, ValorProduto = ?
                   WHERE CdProduto = ?
                   """, (info.CdProduto, info.CdStatus, info.NomeProduto, info.DescricaoProduto, info.ValorProduto, cdProduto))
   


    conn.commit()
    cursor.close()
    return {'Mensagem':'Produto atualizado com sucesso'}


@app.delete('/DeleteProdutos/{cdProduto}')
def DeleteProdutos(cdProduto: int):
    conn = sqlite3.connect('produtos.db')
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM Produto WHERE CdProduto = ?", str(cdProduto))
        cursor.execute("DELETE FROM Produto WHERE CdProduto = {}".format(cdProduto))
    except:
        return{'Houve um erro': cdProduto}
   
    finally:
        conn.commit()


    cursor.close()    
    return {'Mensagem': 'Produto deletado com Sucesso'}