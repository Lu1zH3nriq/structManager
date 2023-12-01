const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Back-end Rodando na porta ${port}`);
});

https.createServer({
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key')
}, app).listen(3001,()=> console.log("Rodando em https."));


app.get("/teste", (req, res)=>{
    res.status(200).json({message: "Teste https local "})
})