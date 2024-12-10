const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database("Banco_de_dados.sqlite");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))



//_______________________________________________________________________________



//Fornece a pagina de login
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/inicio.html"))
})


app.post("/validar_login", (req, res) => {

    console.log(req.body);

    var usuario = req.body.usuario;
    var senha = req.body.senha;

    var check = false;

    db.all("SELECT * FROM CADASTROS", (err, rows) => {

        for (var i = 0; i < rows.length; i++) {

            console.log(rows[i].NOME + "   " + rows[i].SENHA)
            if (usuario == rows[i].NOME && senha == rows[i].SENHA) check = true;

        }


        if (check == true) res.send("/inicio.html");
        else res.send("/");

    })


})



// _________________________________________________________________________________


/*
app.get("/criartabela", (req, res) => {

    var sql = 'CREATE TABLE CADASTROS (ID INTEGER PRIMARY KEY AUTOINCREMENT, NOME VARCHAR, EMAIL VARCHAR, SENHA VARCHAR, CPF VARCHAR, NUMERO VARCHAR, CEP VARCHAR);'

    db.run(sql, err =>{
        if(err) res.send("err")
        else res.send("tabela criada com sucesso!")
    })

});


app.get("/registrar_produto", (req, res) => {

    var sql = 'CREATE TABLE PRODUTOS (ID INTEGER PRIMARY KEY AUTOINCREMENT, NOME VARCHAR, PRECO VARCHAR, CODIGO VARCHAR, MARCA VARCHAR, QUANTIDADE VARCHAR, CATEGORTIA VARCHAR, PESO VARCHAR);'

    db.run(sql, err =>{
        if(err) res.send("err")
        else res.send("tabela criada com sucesso!")
    })

});

*/


app.post("/cadastrar_usuario", (req, res) => {



    console.log(req.body);

    var nome = req.body.nome;
    var email = req.body.email;
    var usuario = req.body.usuario;
    var senha = req.body.senha;
    var cpf = req.body.cpf;
    var numero = req.body.numero;
    var cep = req.body.cep;


    var sql = 'INSERT INTO CADASTROS (NOME, EMAIL, USUARIO, SENHA, CPF, NUMERO, CEP) VALUES ( ?, ?, ?, ?, ?, ?, ? );';

    db.run(sql, [nome, email, usuario, senha, cpf, numero, cep], (err) => {
        if (err) res.send(err);
        else res.send("Cadastro feito com Sucesso!");
    })
});





//--------------------------------------------------------------


//Fornece a pagina de cadastro de itens
app.get("/cadastrar_itens", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/cadastro_itens.html"))
})


app.post("/addproduto", function (req, res) {

    console.log(req.body);

    var nome = req.body.nome;
    var preco = req.body.preco;
    var codigo = req.body.codigo;
    var marca = req.body.marca;
    var quantidade = req.body.quantidade;
    var categoria = req.body.categoria;270100
    var peso = req.body.peso;

    var sql = "INSERT INTO PRODUTOS ( NOME, PRECO, CODIGO, MARCA, QUANTIDADE, CATEGORTIA, PESO ) VALUES ( ?, ?, ?, ?, ?, ?, ? )";

    db.run(sql, [nome, preco, codigo, marca, quantidade, categoria, peso], (err) => {
        if (err) res.send(err);
        else res.send("Dados Inseridos");
    });
});


//--------------------------------------------------------------

app.listen(3000, console.log("rodando..."));
