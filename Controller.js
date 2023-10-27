const express = require("express");
const cors = require("cors");
const models = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

let user = models.Usuario;
let client = models.Cliente;
let func = models.Funcionario;
let equip = models.Equipamento;
let tpO = models.tipoObra;

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
        .json({ message: "Cliente já cadastrado no sistema! " });
    } else {
      const clientCreated = await client.create({
        nome: req.body.nome,
        cpfcnpj: req.body.cpfcnpj,
        telefone: req.body.telefone,
        email: req.body.email,
        endereco: req.body.endereco,
      });

      if (clientCreated) {
        return res.status(200).json({ message: "Cliente cadastrado com sucesso." });
      } else {
        return res.status(400).send({ message: "Falha ao cadastrar o cliente." });
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
      res.status(422).json({ message: "Cliente não encontrado!" });
    }
  } catch (error) {
    //console.log("Erro ao buscar cliente: ", error);
    res.status(500).json({ message: "Erro de requisição ao buscar cliente!" });
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
      return res.status(200).json({ message: "Cliente alterado com sucesso!" });
    } else {
      return res.status(400).json({ message: "Erro ao alterar cliente!" });
    }
  } catch (error) {
    //console.log("Erro ao atualizar cliente: ", error);
    res.status(500).json({ message: "Erro de requisição ao alterar cliente." });
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
      res.status(200).json({ message: "Cliente deletado com sucesso!" });
    } else {
      res.status(400).json({ message: "Erro ao deletar cliente!" });
    }
  } catch (error) {
    console.log("Erro ao atualizar cliente: ", error);
    res.status(500).json({ message: "Erro de requisição ao deletar cliente!" });
  }
});

//----------------------------------------------------endpoint para cadastros de funcionario----------------------------------------
//CREATE
app.post("/cadastraFuncionario", async (req, res) => {
  try {

    const findFunc = await func.findOne({
      where: {
        cpfcnpj: req.body.cpfcnpj,
      }
    });

    if (findFunc) {
      return res.status(422).json({ message: "Funcionário já cadastrado no sistema!" });
    }
    const funcCreated = await func.create({
      nome: req.body.nome,
      cpfcnpj: req.body.cpfcnpj,
      telefone: req.body.telefone,
      email: req.body.email,
      endereco: req.body.endereco,
    });

    if (funcCreated) {
      return res.status(200).json({ message: "Funcionário criado com sucesso!" });
    } else {
      return res.status(400).json({ message: "Erro ao cadastrar funcionário!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro de requisição ao cadastrar funcionário!" });
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
      res.status(422).json({ message: "Funcionário não encontrado!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro de requisição ao buscar funcionário!" });
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
      return res.status(200).json({ message: "Fucionário alterado com sucesso!" });
    } else {
      return res.status(400).json({ message: "Erro ao alterar funcionário!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro de requisição ao alterar funcionário!" });
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
      res.status(200).json({ message: "Funcionário deletado com sucesso!" });
    } else {
      res.status(400).json({ message: "Erro ao deletar Funcionário!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro de requisição ao deletar funcionário!" });
  }
});

//----------------------------------------------------endpoint para cadastros de equipamentos---------------------------------------
//CREATE
app.post("/cadastraEquipamento", async (req, res) => {
  try {
    const findEquip = await equip.findOne({
      where: {
        codigo: req.body.codigo,
      }
    });

    if (findEquip) {
      return res.status(422).json({ message: "Equipamento já cadastrado no sistema!" });
    }

    const createdEquip = await equip.create({
      nome: req.body.nome,
      codigo: req.body.codigo,
      marca: req.body.marca,
      modelo: req.body.modelo,
      etiqueta: req.body.etiqueta
    })

    if (createdEquip) {
      return res.status(200).json({ message: "Equipamento cadastrado com sucesso!" });
    } else {
      return res.status(400).json({ message: "Erro ao cadastrar equipamento!" });
    }
  } catch (error) {
    console.log("Erro ao cadstrar equipamento" + error);
    return res.status(500).json({ message: "Erro de requisição ao cadastrar equipamento!" })
  }
});
//READ
app.get("/buscaEquipamento", async (req, res) => {
  try {
    const findedEquip = await equip.findOne({
      nome: req.query.nome,
      codigo: req.query.codigo
    })

    if (findedEquip) {
      return res.status(200).json(findedEquip);
    } else {
      return res.status(422).json({ message: "Erro ao buscar equipamento!" });
    }
  } catch (error) {
    console.log("Erro ao buscar equipamento: " + error);
    return res.status(500).json({ message: "erro de requisição ao buscar equipamento!" });
  }
});
//UPDATE
app.put("/alteraEquipamento", async (req, res) => {
  try {
    const updatedEquip = await equip.update({
      nome: req.body.nome,
      codigo: req.body.codigo,
      marca: req.body.marca,
      modelo: req.body.modelo,
      etiqueta: req.body.etiqueta
    }, {
      where: {
        id: req.body.id
      }
    });

    if (updatedEquip) {
      return res.status(200).json({ message: "Equipamento alterado com sucesso!" });
    } else {
      return res.status(422).json({ message: "Erro ao alterar equipamento!" });
    }
  } catch (error) {
    console.log("Erro ao alterar equipamento: " + error);
    return res.status(500).json({ message: "Erro de requisição ao alterar equipamento! " });
  }
});
//DELETE
app.delete("/apagaEquipamento", async (req, res) => {
  try {
    const deletedEquip = await equip.destroy({
      where: {
        id: req.body.id
      }
    });

    if (deletedEquip) {
      return res.status(200).json({ message: "Equipamento deletado com sucesso!" });
    } else {
      return res.status(422).json({ message: "Erro ao deletar equipamento!" });
    }
  } catch (error) {
    console.log("erro ao excluir equipamento: " + error);
    return res.status(500).json({ message: "Erro de requisição ao deletar equipamento! " });
  }
});
//----------------------------------------------------endpoint para cadstro de tipo de obra--------------------------------------------
//CREATE
app.post("/cadastraTpO", async (req, res) => {
  try {
    const findTpO = await tpO.findOne({
      where: {
        codigo: req.body.codigo
      }
    });

    if (findTpO)
      return res.status(422).json({ message: "Tipo de Obra já cadastrado no sistema!" });
    else {
      const createdTpO = await tpO.create({
        tipo: req.body.tipo,
        codigo: req.body.codigo
      })

      if (createdTpO)
        return res.status(200).json({ message: "Tipo de Obra cadstrado com sucesso!" });
      else {
        return res.status(400).json({ message: "Erro ao cadastrar Tipo de Obra!" });
      }
    }

  } catch (error) {
    console.log("Erro ao cadastrar tipo de obra: " + error);
    return res.status(500).json({ message: "Erro de requisição ao criar tipo de obra!" })
  }
});
//READ
app.get("/buscaTpO", async (req, res) => {
  try {
    const findedTpO = await tpO.findOne({
      where: {
        codigo: req.query.codigo,
        tipo: req.query.tipo
      }
    });

    if (findedTpO)
      return res.status(200).json(findedTpO);
    else {
      return res.status(422).json({ message: "Tipo de Obra não encontrado!" });
    }
  } catch (error) {
    console.log("Erro ao buscar tipo de obra: " + error);
    return res.status(500).json({ message: "Erro de requisição ao buscar tipo de obra!" });
  }
});
//UPDATE
app.put("/alteraTpO", async (req, res) => {
  try {
    const updatedTpO = tpO.update({
      tipo: req.body.tipo,
      codigo: req.body.codigo
    }, {
      where: {
        id: req.body.id
      }
    });

    if(updatedTpO)
      return res.status(200).json({ message: "Tipo de Obra alterado com sucesso!" });
    else{
      return res.status(400).json({ message: "Erro ao alterar o Tipo de Obra!" });
    }
  } catch (error) {
    console.log("erro ao alterar tipo de obra : " + error);
    return res.status(500).json({ message: "Erro de requisição ao alterar tipo de obra!" });
  }
});
//DELETE
app.delete("/deletaTpO", async (req, res) => {
  try {
    const deletedTpO = tpO.destroy({
      where: {
        id: req.body.id
      }
    });

    if (deletedTpO)
      return res.status(200).json({ message: "Tipo de Obra deletado com sucesso!" });
    else{
      return res.status(400).json({ message: "Erro ao deletar Tipo de Obra!" });
    }
  } catch (error) {
    console.log("erro ao deletar tipo de obra : "+ error)
    return res.status(500).json({ message: "Erro de requisição ao deletar tipo de obra!" });
  }
});
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
