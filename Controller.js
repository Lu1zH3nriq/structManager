const express = require("express");
const cors = require("cors");
const models = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

let user = models.Usuario;
let client = models.Cliente;
let func = models.Funcionario;

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
        .json({ message: "Usuário não encontrado ou credenciais inválidas!" });

    return res.status(200).send(findedUser);
  } catch (error) {
    //console.error("Erro ao autenticar usuário:", error);
    res
      .status(500)
      .json({ message: "Erro ao autenticar usuário. Erro de requisição. " });
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

    if (!findedUser)
      return res
        .status(422)
        .json({
          message: "Usuário não encontrado com este email ou nome de usuário!",
        });

    //const resetPass = async () => {
    //sistema para enviar email de reset de senha;
    //}

    return res
      .status(200)
      .json({
        message:
          "Sua senha foi redefinida com sucesso! Faça login novamente com a nova senha enviada para seu email. ",
      });
  } catch (error) {
    //console.log("Erro ao buscar usuario: ", error);
    res.status(500).json({ message: "Erro ao redefinir senha do usuário." });
  }
});

//----------------------------------------------------endpoint para cadastros de cliente------------------------------------------
//CREATE
app.post("/cadastraCliente", async (req, res) => {
  try {
    const clientFind = await client.findOne({
      where: {
        cpfcnpj: req.body.cpfcnpj,
      },
    });

    if (clientFind) {
      return res
        .status(422)
        .json({ message: "Cliente já cadastrado no sistema! " }).send();
    } else {
      const clientCreated = await client.create({
        nome: req.body.nome,
        cpfcnpj: req.body.cpfcnpj,
        telefone: req.body.telefone,
        email: req.body.email,
        endereco: req.body.endereco,
      });

      if (clientCreated) {
        return res.status(200).json({ message: "Cliente cadastrado com sucesso." }).send();
      } else {
        return res.status(400).send({ message: "Falha ao cadastrar o cliente." }).send();
      }
    }
  } catch (error) {
    //console.log("Erro ao cadastrar cliente: ", error);
    res.status(500).json({ message: "Erro de requisição ao cadastrar cliente." });
  }
});
//READ
app.get("/buscaCliente", async (req, res) => {
  try {
    const clientFinded = await client.findOne({
      where: {
        nome: req.query.nome,
        cpfcnpj: req.query.cpfcnpj,
      },
    });

    if (clientFinded) {
      res.status(200).json(clientFinded);
    } else {
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
    const clientId = req.body.id;
    const clientUpdated = await client.update(
      {
        nome: req.body.nome,
        cpfcnpj: req.body.cpfcnpj,
        telefone: req.body.telefone,
        email: req.body.email,
        endereco: req.body.endereco,
      },
      {
        where: {
          id: clientId,
        },
      }
    );

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
app.delete("/deletaCliente", async (req, res) => {
  try {
    const clientDeleted = await client.destroy({
      where: {
        id: req.body.id,
      },
    });

    if (clientDeleted) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  } catch (error) {
    console.log("Erro ao atualizar cliente: ", error);
    res.status(500).send();
  }
});

//----------------------------------------------------endpoint para cadastros de funcionario----------------------------------------
app.post("/cadastraFuncionario", async (req, res) => {
  try {
    const funcCreated = await func.create({
      nome: req.body.nome,
      cpfcnpj: req.body.cpfcnpj,
      telefone: req.body.telefone,
      email: req.body.email,
      endereco: req.body.endereco,
    });

    if (funcCreated) {
      return res.status(200).send();
    } else {
      return res.status(400).send();
    }
  } catch (error) {
    res.status(500).send();
  }
});
//READ
app.get("/buscaFuncionario", async (req, res) => {
  try {
    const funcFinded = await func.findOne({
      where: {
        nome: req.query.nome,
        cpfcnpj: req.query.cpfcnpj,
      },
    });

    if (funcFinded) {
      res.status(200).json(funcFinded);
    } else {
      res.status(422).send();
    }
  } catch (error) {
    res.status(500).send();
  }
});
//UPDATE
app.put("/alteraFuncionario", async (req, res) => {
  try {
    const funcId = req.body.id;
    const funcUpdated = await func.update(
      {
        nome: req.body.nome,
        cpfcnpj: req.body.cpfcnpj,
        telefone: req.body.telefone,
        email: req.body.email,
        endereco: req.body.endereco,
      },
      {
        where: {
          id: funcId,
        },
      }
    );

    if (funcUpdated) {
      return res.status(200).send();
    } else {
      return res.status(400).send();
    }
  } catch (error) {
    res.status(500).send();
  }
});
//DELETE
app.delete("/deletaFuncionario", async (req, res) => {
  try {
    const funcDeleted = await func.destroy({
      where: {
        id: req.body.id,
      },
    });

    if (funcDeleted) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  } catch (error) {
    res.status(500).send();
  }
});

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

*/
