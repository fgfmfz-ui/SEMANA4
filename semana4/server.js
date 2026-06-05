const express = require('express');
const fs = require('fs').promises;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

app.post('/guardar', async (req, res) => {
  const { archivo = 'datos.txt', contenido } = req.body;

  if (!contenido) {
    return res.status(400).send('Falta el campo "contenido" en el cuerpo de la petición');
  }

  try {
    await fs.writeFile(archivo, contenido, 'utf8');
    res.send(`Información guardada en ${archivo}`);
  } catch (error) {
    console.error('Error guardando archivo:', error);
    res.status(500).send('Error al guardar la información en el archivo');
  }
});

app.listen(3000, () => {
  console.log('Servidor ejecutándose en puerto 3000');
});