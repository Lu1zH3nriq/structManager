const express = require("express");
const cors = require("cors");
const models = require("./models");

const nodemailer = require("nodemailer");
const { Sequelize } = require("sequelize");
const { QueryTypes } = require("sequelize");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Back-end Rodando");
});

let user = models.Usuario;
let client = models.Cliente;
let func = models.Funcionario;
let equip = models.Equipamento;
let tpO = models.TipoObra;
let obra = models.Obra;
let mat = models.Material;
let ObraMaterial = models.ObraMaterial;

//LOGIN DO USUARIO
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

// REDEFINIR SENHA DO USUARIO
function generateRandomPassword(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}
// Configurar o transporte de email com Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // Por exemplo, "Gmail", "Outlook", etc.
  auth: {
    user: "struct.engenharias@gmail.com",
    pass: "structEngenharia21",
  },
});
// Função para enviar o email
const sendEmail = (recipient, newPassword) => {
  const mailOptions = {
    from: "struct.engenharias@gmail.com",
    to: recipient,
    subject: "Redefinição de senha",
    text: `Sua nova senha temporária é: ${newPassword}, use ela para logar no aplicativo e depois redefina para uma nova senha!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar o email: ", error);
    } else {
      console.log("Email enviado: " + info.response);
    }
  });
};
app.post("/resetPassword", async (req, res) => {
  try {
    const { usuario, email } = req.body;

    const foundUser = await user.findOne({
      where: {
        usuario: usuario,
        email: email,
      },
    });

    if (!foundUser) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    const newPassword = generateRandomPassword(6);

    const updatedUser = await user.update(
      { password: newPassword },
      {
        where: {
          id: foundUser.id,
        },
      }
    );

    if (updatedUser) {
      // Envie um email com a nova senha para o endereço de email
      sendEmail(email, newPassword);

      return res.status(200).json({
        message:
          "Nova senha enviada para o email. Faça login com a nova senha.",
      });
    } else {
      return res.status(400).json({ message: "Erro ao redefinir a senha." });
    }
  } catch (error) {
    console.error("Erro na redefinição de senha: ", error);
    return res.status(500).json({ message: "Erro na redefinição de senha." });
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
      return res.status(422).json({
        message: "Cliente com este CPF/CNPJ já cadastrado no sistema! ",
      });
    } else {
      const clientCreated = await client.create({
        nome: req.body.nome,
        cpfcnpj: req.body.cpfcnpj,
        telefone: req.body.telefone,
        email: req.body.email,
        endereco: req.body.endereco,
      });

      if (clientCreated) {
        return res
          .status(200)
          .json({ message: "Cliente cadastrado com sucesso." });
      } else {
        return res
          .status(400)
          .send({ message: "Falha ao cadastrar o cliente." });
      }
    }
  } catch (error) {
    //console.log("Erro ao cadastrar cliente: ", error);
    res
      .status(500)
      .json({ message: "Erro de requisição ao cadastrar cliente." });
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

app.get("/buscaCliente/Id", async (req, res) => {
  try {
    const clientFinded = await client.findOne({
      where: {
        id: req.query.id,
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

app.get("/buscaAllClientes", async (req, res) => {
  try {
    const clientFinded = await client.findAll();

    if (clientFinded) {
      res.status(200).json(clientFinded);
    } else {
      res.status(422).json({ message: "Clientes não encontrados!" });
    }
  } catch (error) {
    //console.log("Erro ao buscar cliente: ", error);
    res.status(500).json({ message: "Erro de requisição ao buscar clientes!" });
  }
});

app.get("/pesquisaCliente", async (req, res) => {
  try {
    const clientFinded = await client.findOne({
      where: {
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
      },
    });

    if (findFunc) {
      return res.status(422).json({
        message: "Funcionário com este CPF/CNPJ já cadastrado no sistema!",
      });
    }
    const funcCreated = await func.create({
      nome: req.body.nome,
      cpfcnpj: req.body.cpfcnpj,
      telefone: req.body.telefone,
      email: req.body.email,
      endereco: req.body.endereco,
    });

    if (funcCreated) {
      return res
        .status(200)
        .json({ message: "Funcionário criado com sucesso!" });
    } else {
      return res
        .status(400)
        .json({ message: "Erro ao cadastrar funcionário!" });
    }
  } catch (error) {
    console.log("ERRO AO CADSTRAR FUNCIONARIO :  " + error);
    res
      .status(500)
      .json({ message: "Erro de requisição ao cadastrar funcionário!" });
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
    res
      .status(500)
      .json({ message: "Erro de requisição ao buscar funcionário!" });
  }
});

app.get("/buscaFuncObra", async (req, res) => {
  try {
    const funcFinded = await func.findOne({
      where: {
        nome: req.query.nome,
        cpfcnpj: req.query.cpfcnpj,
        obraId: req.query.obraId,
      },
    });

    if (funcFinded) {
      res.status(200).json(funcFinded);
    } else {
      res
        .status(422)
        .json({ message: "Funcionário não vinculado a esta obra!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro de requisição ao buscar funcionário!" });
  }
});

app.get("/buscaFuncionarios", async (req, res) => {
  try {
    const funcsFinded = await func.findAll({
      where: {
        obraId: req.query.obraId,
      },
    });

    if (funcsFinded) {
      res.status(200).json(funcsFinded);
    } else {
      res.status(404).json({ message: "Funcionário não encontrado!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro de requisição ao buscar funcionário!" });
  }
});

app.get("/buscaAllFuncionarios", async (req, res) => {
  try {
    const funcFinded = await func.findAll();

    if (funcFinded) {
      res.status(200).json(funcFinded);
    } else {
      res.status(422).json({ message: "Funcionários não encontrados!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro de requisição ao buscar funcionários!" });
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
      return res
        .status(200)
        .json({ message: "Fucionário alterado com sucesso!" });
    } else {
      return res.status(400).json({ message: "Erro ao alterar funcionário!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro de requisição ao alterar funcionário!" });
  }
});

app.put("/addFunc", async (req, res) => {
  try {
    const funcFinded = await func.findOne({
      where: {
        nome: req.body.funcName,
        cpfcnpj: req.body.funcCpf,
      },
    });

    if (funcFinded) {
      let funcId = funcFinded.id;
      const [affectedRows] = await func.update(
        {
          obraId: req.body.obraId,
        },
        {
          where: {
            id: funcId,
          },
        }
      );

      if (affectedRows > 0) {
        const updatedFuncs = await func.findAll({
          where: {
            obraId: req.body.obraId,
          },
        });
        return res.status(200).json({
          message: "Funcionário adicionado com sucesso!",
          funcionarios: updatedFuncs,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Erro ao adicionar o funcionário à obra!" });
      }
    } else {
      return res.status(404).json({ message: "Funcionário não encontrado!" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro de requisição ao adicionar funcionário!" });
  }
});

app.put("/removeFunc", async (req, res) => {
  try {
    const funcFinded = await func.findOne({
      where: {
        id: req.body.funcId,
        obraId: req.body.obraId,
      },
    });

    const [affectedRows] = await func.update(
      {
        obraId: null,
      },
      {
        where: {
          id: funcFinded.id,
        },
      }
    );

    if (affectedRows > 0) {
      const updatedFuncs = await func.findAll({
        where: {
          obraId: req.body.obraId,
        },
      });
      return res.status(200).json({
        message: "Funcionário removido com sucesso!",
        funcionarios: updatedFuncs,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Erro ao remover o funcionário da obra!" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro de requisição ao remover funcionário!" });
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
    res
      .status(500)
      .json({ message: "Erro de requisição ao deletar funcionário!" });
  }
});

//----------------------------------------------------endpoint para cadastros de equipamentos---------------------------------------
//CREATE
app.post("/cadastraEquipamento", async (req, res) => {
  try {
    const findEquip = await equip.findOne({
      where: {
        codigo: req.body.codigo,
      },
    });

    if (findEquip) {
      return res
        .status(422)
        .json({ message: "Equipamento já cadastrado no sistema!" });
    }

    const createdEquip = await equip.create({
      nome: req.body.nome,
      codigo: req.body.codigo,
      marca: req.body.marca,
      modelo: req.body.modelo,
      etiqueta: req.body.etiqueta,
    });

    if (createdEquip) {
      return res
        .status(200)
        .json({ message: "Equipamento cadastrado com sucesso!" });
    } else {
      return res
        .status(400)
        .json({ message: "Erro ao cadastrar equipamento!" });
    }
  } catch (error) {
    console.log("Erro ao cadstrar equipamento" + error);
    return res
      .status(500)
      .json({ message: "Erro de requisição ao cadastrar equipamento!" });
  }
});
//READ
app.get("/buscaEquipamento", async (req, res) => {
  try {
    const findedEquip = await equip.findOne({
      where: {
        nome: req.query.nome,
        codigo: req.query.codigo,
      },
    });

    if (findedEquip) {
      return res.status(200).json(findedEquip);
    } else {
      return res.status(422).json({ message: "Erro ao buscar equipamento!" });
    }
  } catch (error) {
    console.log("Erro ao buscar equipamento: " + error);
    return res
      .status(500)
      .json({ message: "erro de requisição ao buscar equipamento!" });
  }
});

app.get("/buscaEquipObra", async (req, res) => {
  try {
    const findedEquip = await equip.findOne({
      where: {
        nome: req.query.nome,
        codigo: req.query.codigo,
        obraId: req.query.obraId,
      },
    });

    if (findedEquip) {
      return res.status(200).json(findedEquip);
    } else {
      return res
        .status(422)
        .json({ message: "Equipamento não vinculado a esta obra!" });
    }
  } catch (error) {
    console.log("Erro ao buscar equipamento: " + error);
    return res
      .status(500)
      .json({ message: "erro de requisição ao buscar equipamento!" });
  }
});

app.get("/buscaEquipamentos", async (req, res) => {
  try {
    const findedEquips = await equip.findAll({
      where: {
        obraId: req.query.obraId,
      },
    });

    if (findedEquips) {
      return res.status(200).json(findedEquips);
    } else {
      return res.status(422).json({ message: "Erro ao buscar equipamentos!" });
    }
  } catch (error) {
    console.log("Erro ao buscar equipamentos: " + error);
    return res
      .status(500)
      .json({ message: "Erro de requisição ao buscar equipamento!" });
  }
});
//UPDATE
app.put("/alteraEquipamento", async (req, res) => {
  try {
    const updatedEquip = await equip.update(
      {
        nome: req.body.nome,
        codigo: req.body.codigo,
        marca: req.body.marca,
        modelo: req.body.modelo,
        etiqueta: req.body.etiqueta,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    if (updatedEquip) {
      return res
        .status(200)
        .json({ message: "Equipamento alterado com sucesso!" });
    } else {
      return res.status(422).json({ message: "Erro ao alterar equipamento!" });
    }
  } catch (error) {
    console.log("Erro ao alterar equipamento: " + error);
    return res
      .status(500)
      .json({ message: "Erro de requisição ao alterar equipamento! " });
  }
});

app.put("/removeEquip", async (req, res) => {
  try {
    const equipFinded = await equip.findOne({
      where: {
        id: req.body.equipId,
        obraId: req.body.obraId,
      },
    });

    const [affectedRows] = await equip.update(
      {
        obraId: null,
      },
      {
        where: {
          id: equipFinded.id,
        },
      }
    );

    if (affectedRows > 0) {
      const updatedEquip = await equip.findAll({
        where: {
          obraId: req.body.obraId,
        },
      });
      return res.status(200).json({
        message: "Equipamento removido com sucesso!",
        funcionarios: updatedEquip,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Erro ao remover o equipamento da obra!" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro de requisição ao remover equipamento!" });
  }
});

app.put("/addEquip", async (req, res) => {
  try {
    const equipFinded = await equip.findOne({
      where: {
        nome: req.body.equipName,
        codigo: req.body.equipCodigo,
      },
    });

    if (equipFinded) {
      let equipId = equipFinded.id;
      const [affectedRows] = await equip.update(
        {
          obraId: req.body.obraId,
        },
        {
          where: {
            id: equipId,
          },
        }
      );

      if (affectedRows > 0) {
        const updatedEquips = await equip.findAll({
          where: {
            obraId: req.body.obraId,
          },
        });
        return res.status(200).json({
          message: "Equipamento adicionado com sucesso!",
          equipamentos: updatedEquips,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Erro ao adicionar o equipamento à obra!" });
      }
    } else {
      return res.status(404).json({ message: "Equipamento não encontrado!" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro de requisição ao adicionar equipamento!" });
  }
});

//DELETE
app.delete("/apagaEquipamento", async (req, res) => {
  try {
    const deletedEquip = await equip.destroy({
      where: {
        id: req.body.id,
      },
    });

    if (deletedEquip) {
      return res
        .status(200)
        .json({ message: "Equipamento deletado com sucesso!" });
    } else {
      return res.status(422).json({ message: "Erro ao deletar equipamento!" });
    }
  } catch (error) {
    console.log("erro ao excluir equipamento: " + error);
    return res
      .status(500)
      .json({ message: "Erro de requisição ao deletar equipamento! " });
  }
});
//----------------------------------------------------endpoint para cadstro de tipo de obra--------------------------------------------
//CREATE
app.post("/cadastraTpO", async (req, res) => {
  try {
    const findTpO = await tpO.findOne({
      where: {
        tipo: req.body.tipo,
        codigo: req.body.codigo,
      },
    });

    if (findTpO)
      return res
        .status(422)
        .json({ message: "Tipo de Obra já cadastrado no sistema!" });
    else {
      const createdTpO = await tpO.create({
        tipo: req.body.tipo,
        codigo: req.body.codigo,
      });

      if (createdTpO)
        return res
          .status(200)
          .json({ message: "Tipo de Obra cadstrado com sucesso!" });
      else {
        return res
          .status(400)
          .json({ message: "Erro ao cadastrar Tipo de Obra!" });
      }
    }
  } catch (error) {
    console.log("Erro ao cadastrar tipo de obra: " + error);
    return res
      .status(500)
      .json({ message: "Erro de requisição ao criar tipo de obra!" });
  }
});
//READ
app.get("/buscaTpO", async (req, res) => {
  try {
    const findedTpO = await tpO.findOne({
      where: {
        codigo: req.query.codigo,
        tipo: req.query.tipo,
      },
    });

    if (findedTpO) return res.status(200).json(findedTpO);
    else {
      return res.status(422).json({ message: "Tipo de Obra não encontrado!" });
    }
  } catch (error) {
    console.log("Erro ao buscar tipo de obra: " + error);
    return res
      .status(500)
      .json({ message: "Erro de requisição ao buscar tipo de obra!" });
  }
});

app.get("/tiposObras", async (req, res) => {
  try {
    const tiposObras = await tpO.findAll();
    const data = tiposObras.map(({ id, tipo }) => ({ id, tipo }));
    //const tipos = tiposObras.map((obra) => obra.tipo);

    return res.status(200).json(data);
  } catch (error) {
    console.log("Erro ao buscar tipo de obra: " + error);
    return res
      .status(500)
      .json({ message: "Erro de requisição ao buscar tipo de obra!" });
  }
});
//UPDATE
app.put("/alteraTpO", async (req, res) => {
  try {
    const updatedTpO = tpO.update(
      {
        tipo: req.body.tipo,
        codigo: req.body.codigo,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    if (updatedTpO)
      return res
        .status(200)
        .json({ message: "Tipo de Obra alterado com sucesso!" });
    else {
      return res
        .status(400)
        .json({ message: "Erro ao alterar o Tipo de Obra!" });
    }
  } catch (error) {
    console.log("erro ao alterar tipo de obra : " + error);
    return res
      .status(500)
      .json({ message: "Erro de requisição ao alterar tipo de obra!" });
  }
});
//DELETE
app.delete("/deletaTpO", async (req, res) => {
  try {
    const deletedTpO = tpO.destroy({
      where: {
        id: req.body.id,
      },
    });

    if (deletedTpO)
      return res
        .status(200)
        .json({ message: "Tipo de Obra deletado com sucesso!" });
    else {
      return res.status(400).json({ message: "Erro ao deletar Tipo de Obra!" });
    }
  } catch (error) {
    console.log("erro ao deletar tipo de obra : " + error);
    return res
      .status(500)
      .json({ message: "Erro de requisição ao deletar tipo de obra!" });
  }
});
//----------------------------------------------------endpoint para cadastros de Obras---------------------------------------------
app.post("/cadastraObra", async (req, res) => {
  try {
    const obraFinded = await obra.findOne({
      where: {
        codigo: req.body.codigo,
        numContrato: req.body.numContrato,
      },
    });

    if (obraFinded)
      return res.status(422).json({
        message:
          "Obra ja cadastrada no sistema com este código e/ou numero de contrato! ",
      });

    const createObra = {
      codigo: req.body.codigo,
      nome: req.body.nome,
      endereco: req.body.endereco,
      numContrato: req.body.numContrato,
      numAlvara: req.body.numAlvara,
      rtProjeto: req.body.rtProjeto,
      rtExec: req.body.rtExec,
      dataInicio: req.body.dataInicio,
      dataFim: req.body.dataFim,
      orcamento: req.body.orcamento,
      clienteId: req.body.clienteId,
      tipoObraId: req.body.tipoObraId,
    };

    console.log(createObra);

    let response = await obra.create(createObra);

    if (response) {
      return res.status(200).json({ message: "Obra cadastrada com sucesso!" });
    } else {
      return res.status(400).json({ message: "Falha ao cadastrar obra!" });
    }
  } catch (error) {
    console.log("Erro ao cadastrar Obra: ", error);
    res.status(500).json({ message: "Erro de requisição ao cadastrar Obra." });
  }
});
app.get("/buscaObra", async (req, res) => {
  try {
    // Obtenha os parâmetros da consulta da URL
    const { nomeCliente, cpfCliente, numContrato } = req.query;

    // Busque o clienteId correspondente ao nome do cliente
    const cliente = await client.findOne({
      where: { nome: nomeCliente, cpfcnpj: cpfCliente },
    });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente não cadastrado!" });
    }

    const response = await obra.findAll({
      where: {
        clienteId: cliente.id,
        numContrato: numContrato,
      },
      include: [
        {
          model: tpO,
          attributes: ["tipo"],
          where: {
            id: Sequelize.col("Obra.tipoObraId"),
          },
        },
      ],
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log("Erro ao buscar obra: " + error);
    return res.status(500).json({
      message: "Erro de requisição ao buscar obra.",
    });
  }
});
app.get("/allObras", async (req, res) => {
  try {
    let response = await obra.findAll({
      include: [
        {
          model: tpO,
          attributes: ["tipo"],
          where: {
            id: Sequelize.col("Obra.tipoObraId"),
          },
        },
      ],
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log("Erro ao buscar tipo de obra: " + error);
    return res
      .status(500)
      .json({ message: "Erro de requisição ao buscar tipo de obra!" });
  }
});
app.put("/alteraObra", async (req, res) => {
  try {
    const _obraAlterada = {
      codigo: req.body.codigo,
      nome: req.body.nomeObra,
      endereco: req.body.endereco,
      numContrato: req.body.numContrato,
      numAlvara: req.body.numAlvara,
      rtProjeto: req.body.RTProjeto,
      rtExec: req.body.RTExec,
      dataInicio: req.body.dataInicio,
      dataFim: req.body.dataTermino,
      orcamento: req.body.orcamento,
      clienteId: req.body.clientIdBuscado,
      tipoObraId: req.body.selectedValue,
    };

    const updatedObra = await obra.update(_obraAlterada, {
      where: {
        id: req.body.id,
      },
    });

    if (updatedObra) {
      return res.status(200).json({ message: "Obra alterada com sucesso!" });
    } else {
      return res.status(400).json({ message: "Falha ao alterar Obra!" });
    }
  } catch (error) {
    console.log("erro ao alterar obra : " + error);
    return res
      .status(500)
      .json({ message: "Erro de requisição ao alterar obra!" });
  }
});

app.post("/addMaterial", async (req, res) => {
  try {
    console.log(req.body);

    const obraId = req.body.obraId;
    const materialName = req.body.materialName;
    const materialCod = req.body.materialCod;
    const materialQuant = req.body.materialQuant;

    const findMat = await mat.findOne({
      where: {
        nome: materialName,
        codigo: materialCod,
      },
    });

    let material;

    if (findMat) {
      material = findMat;
    } else {
      let createMat = await mat.create({
        nome: materialName,
        codigo: materialCod,
      });

      material = createMat;
    }

    const obraMaterialAdd = await ObraMaterial.create({
      obraId: obraId,
      materialId: material.id,
      quantidade: materialQuant,
    });

    if (obraMaterialAdd) {
      // Atualizar a lista de materiais da obra
      const materiais_da_obra = await obra.findByPk(obraId, {
        include: [
          {
            model: mat,
            as: "materiais",
            through: { model: ObraMaterial, as: "obraMateriais" },
          },
        ],
      });

      if (materiais_da_obra) {
        return res.status(200).json({
          message: "Material adicionado com sucesso!",
          materiais: materiais_da_obra.materiais,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Erro ao buscar todos os materiais desta obra!" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Erro ao adicionar o material a obra!" });
    }
  } catch (error) {
    console.log("Erro ao adicionar material à obra: " + error);
    return res.status(500).json({
      message: "Erro de requisição ao adicionar material à obra!",
    });
  }
});


app.get("/buscaMateriais", async (req, res) => {
  try {
    const obraId = req.query.obraId;

    const materiais_da_obra = await obra.findByPk(obraId, {
      include: [
        {
          model: mat,
          as: "materiais",
          through: { model: ObraMaterial, as: "obraMateriais" },
        },
      ],
    });

    if (materiais_da_obra) {
      return res.status(200).json(materiais_da_obra.materiais);
    } else {
      return res
        .status(400)
        .json({ message: "Erro ao buscar todos os materiais desta obra!" });
    }
  } catch (error) {
    console.log("Erro ao buscar todos os materiais: " + error);
    return res.status(500).json({
      message: "Erro de requisição ao buscar todos os materiais da obra!",
    });
  }
});

app.delete("/removeMaterial", async (req, res) => {
  try {
    const id = req.body.id;
    const obraId = req.body.obraId;
    const materialId = req.body.materialId;

    // Remover o material da tabela de relacionamento
    const result = await ObraMaterial.destroy({
      where: {
        id: id,
        obraId: obraId,
        materialId: materialId,
      },
    });

    if (result) {
      // Buscar novamente os materiais da obra após a remoção
      const materiais_da_obra = await obra.findByPk(obraId, {
        include: [
          {
            model: mat,
            as: "materiais",
            through: { model: ObraMaterial, as: "obraMateriais" },
          },
        ],
      });

      if (materiais_da_obra) {

        return res.status(200).json({
          message: "Material removido com sucesso!",
          materiais: materiais_da_obra.materiais,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Erro ao buscar todos os materiais desta obra!" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Erro ao remover o material da obra!" });
    }
  } catch (error) {
    console.log("Erro ao remover material da obra: " + error);
    return res.status(500).json({
      message: "Erro de requisição ao remover material da obra!",
    });
  }
});

app.delete("/deletaObra", async (req, res) => {
  try {
    const deletedObra = obra.destroy({
      where: {
        id: req.body.id,
      },
    });

    if (deletedObra)
      return res.status(200).json({ message: "Obra deletada com sucesso!" });
    else {
      return res.status(400).json({ message: "Erro ao deletar Obra!" });
    }
  } catch (error) {
    console.log("erro ao deletar obra : " + error);
    return res
      .status(500)
      .json({ message: "Erro de requisição ao deletar obra!" });
  }
});

//-----------------------------------------------------------USUARIO CONTROLLER -------------------------------------------------

// ALTERAR FOTO DO USUARIO
app.put("/uploadFoto", async (req, res) => {
  try {
    const uri = req.body.fotoPerfil;
    //const imageBuffer = fs.readFileSync(uri);
    //const imageBase64 = imageBuffer.toString("base64");

    const userId = req.body.id;
    const updatedFoto = user.update(
      {
        fotoPerfil: uri,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    if (updatedFoto)
      return res.status(200).json({ message: "Imagem alterada com sucesso!" });
    else {
      return res
        .status(400)
        .json({ message: "Erro ao alterar imagem do usuário!" });
    }
  } catch (error) {
    //console.log("erro ao alterar imagem de usuario : " + error);
    return res
      .status(500)
      .json({ message: "Erro de requisição ao alterar imagem de usuario!" });
  }
});

//ALTERAR A SENHA DO USUÁRIO
app.put("/updateSenha", async (req, res) => {
  try {
    const _user = {
      id: req.body.id,
      password: req.body.password,
    };

    const updatedPass = user.update(
      {
        password: _user.password,
      },
      {
        where: {
          id: _user.id,
        },
      }
    );

    if (updatedPass)
      return res.status(200).json({ message: "Senha alterada com sucesso!" });
    else {
      return res.status(400).json({ message: "Erro ao alterar a senha !" });
    }
  } catch (error) {
    console.log("erro ao alterar senha: " + error);
    return res.status(500).json({ message: "Erro ao alterar senha! " });
  }
});

// ALTERAR O EMAIL DO USUÁRIO
app.put("/updateEmail", async (req, res) => {
  try {
    const _user = {
      id: req.body.id,
      email: req.body.email,
    };

    const updatedEmail = user.update(
      {
        email: _user.email,
      },
      {
        where: {
          id: _user.id,
        },
      }
    );

    if (updatedEmail)
      return res.status(200).json({ message: "Email alterado com sucesso!" });
    else {
      return res.status(400).json({ message: "Erro ao alterar email !" });
    }
  } catch (error) {
    console.log("erro ao alterar email: " + error);
    return res.status(500).json({ message: "Erro ao alterar email! " });
  }
});

//CREATE
app.post("/cadastraMat", async (req, res) => {
  try {
    const findMat = await mat.findOne({
      where: {
        nome: req.body.nome,
        codigo: req.body.codigo,
      },
    });

    if (findMat)
      return res
        .status(422)
        .json({ message: "Material já cadastrado no sistema!" });
    else {
      const createdMat = await mat.create({
        nome: req.body.nome,
        codigo: req.body.codigo,
      });

      if (createdMat)
        return res
          .status(200)
          .json({ message: "Material cadstrado com sucesso!" });
      else {
        return res.status(400).json({ message: "Erro ao cadastrar Material" });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro de requisição ao criar Material!" });
  }
});
//READ
app.get("/buscaMat", async (req, res) => {
  try {
    const findMat = await mat.findOne({
      where: {
        codigo: req.query.codigo,
        nome: req.query.nome,
      },
    });

    if (findMat) return res.status(200).json(findMat);
    else {
      return res.status(422).json({ message: "Material  não encontrado!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro de requisição ao buscar material!" });
  }
});

//UPDATE
app.put("/alteraMat", async (req, res) => {
  try {
    const updateMat = mat.update(
      {
        nome: req.body.nome,
        codigo: req.body.codigo,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    if (updateMat)
      return res
        .status(200)
        .json({ message: "Material alterado com sucesso!" });
    else {
      return res.status(400).json({ message: "Erro ao alterar material!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro de requisição ao alterar material!" });
  }
});
//DELETE
app.delete("/deletaMat", async (req, res) => {
  try {
    const deleteMat = mat.destroy({
      where: {
        id: req.body.id,
      },
    });

    if (deleteMat)
      return res
        .status(200)
        .json({ message: "Material deletado com sucesso!" });
    else {
      return res.status(400).json({ message: "Erro ao deletar material!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro de requisição ao deletar material!" });
  }
});

/*

*/
