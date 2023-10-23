const express = require("express");
const cors = require("cors");
const models = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

let user = models.Usuario;
let client = models.Cliente;

app.post("/login", async (req, res) => {
  try {
    const usuario = req.body.usuario;
    const password = req.body.password;

    let findedUser = await user.findOne({
      where: {
        usuario: usuario,
        password: password,
      },
    });

    if (!findedUser)
      return res
        .status(422)
        .send("Usuário não encontrado ou credenciais inválidas!");

    return res.status(200).send(findedUser);
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res.status(500).send("Erro ao autenticar usuário.");
  }
});

app.post("/resetPassword", async (req, res) => {
  //console.log(req.body);
  try {
    const usuario = req.body.usuario;
    const email = req.body.email;

    const findedUser = await user.findOne({
      where: {
        usuario: usuario,
        email: email,
      },
    });

    if (!findedUser) return res.status(422).send();

    return res.status(200).send();
    //const resetPass = async () => {
    //sistema para enviar email de reset de senha;
    //}
  } catch (error) {
    console.log("Erro ao buscar usuario: ", error);
    res.status(500).send("Erro ao autenticar usuário.");
  }
});

//----------------------------------------------------endpoint para cadastros de cliente------------------------------------------
//CREATE
app.post("/cadastraCliente", async (req, res) => {
  try {
    const clientCreated = await client.create({
      nome: req.body.nome,
      cpfcnpj: req.body.cpfcnpj,
      telefone: req.body.telefone,
      email: req.body.email,
      endereco: req.body.endereco,
    });

    if (clientCreated) {
      return res.status(200).send("Cliente cadastrado com sucesso.");
    } else {
      return res.status(400).send("Falha ao cadastrar o cliente.");
    }

  } catch (error) {
    console.log("Erro ao cadastrar cliente: ", error);
    res.status(500).send();
  }
});
//READ
app.get("/buscaCliente", async (req, res) => {
  try {
    const clientFinded = await client.findOne({
      where:{
        nome: req.query.nome,
        cpfcnpj: req.query.cpfcnpj
      }
    });

    if(clientFinded){
      res.status(200).json(clientFinded);
    }
    else{
      res.status(422).send();
    }

  } catch (error) {
    console.log("Erro ao buscar cliente: ", error);
    res.status(500).send();
  }
});
//UPDATE
app.put("/alteraCliente", async (req, res) => {
  try {
    const clientUpdatedId = req.body.id;
    const clientUpdated = await client.update({
      nome: req.body.nome,
      cpfcnpj: req.body.cpfcnpj,
      telefone: req.body.telefone,
      email: req.body.email,
      endereco: req.body.endereco,
    },{
      where: {
        id: clientUpdatedId,
      }
    });

    if (clientUpdated) {
      return res.status(200).send();
    } else {
      return res.status(400).send();
    }

  } catch (error) {
    console.log("Erro ao atualizar cliente: ", error);
    res.status(500).send();
  }
});
//DELETE
app.delete("/apagaCliente");

//----------------------------------------------------endpoint para cadastros de funcionario----------------------------------------
app.post("/cadastraFuncionario");
app.get("/buscaFuncionario");
app.put("/alteraFuncionario");
app.delete("/apagaFuncionario");

//----------------------------------------------------endpoint para cadastros de equipamentos---------------------------------------
app.post("/cadastraEquipamento");
app.get("/buscaEquipamento");
app.put("/alteraEquipamento");
app.delete("/apagaEquipamento");

//----------------------------------------------------endpoint para cadastros de Obras---------------------------------------------
app.post("/cadastraObra");
app.get("/buscaObra");
app.put("/alteraObra");
app.delete("/apagaObra");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Back-end Rodando");
});

/*
if (clientFinded) {
      return res.status(200).send(clientFinded);
    } else {
      return res.status(400).send();
    }
*/
