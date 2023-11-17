const express = require("express");
const cors = require("cors");
const models = require("./models");
const fs = require("fs");
const { parseISO, format } = require("date-fns");

const nodemailer = require("nodemailer");
const { Sequelize, json } = require("sequelize");

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

/*

*/
