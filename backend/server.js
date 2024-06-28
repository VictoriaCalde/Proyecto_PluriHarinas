
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const sql = require("mssql/msnodesqlv8");
const sequelize = require("../pluriharinas/src/components/sequelize.js");
const { Sequelize } = require("sequelize");
const crypto = require("crypto");

const app = express();
const port = process.env.PORT || 4000;

// Configuración de la base de datos
const config = {
  user: "PluHa_User",
  password: "wxpm123#!",
  server: "LAPTOP-1P50TQ8M",
  database: "PluriHarinas",
  options: {
    trustServerCertificate: true, // Permitir certificados de servidor confiables
    encrypt: false, // No usar encriptación
  },
};
const SECRET_KEY = 'tu_secreto_jwt';
const pool = new sql.ConnectionPool(config);

// Middleware
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json()); // Parsear solicitudes JSON entrantes

// Configuración de multer para manejo de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nombre de archivo único basado en la fecha
  },
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));


// Funciones criptográficas

const algorithm = "aes-256-cbc";
const key = crypto.createHash("sha256")
  .update("H4r1n4s_D3_Mu1t1pl3s_Gr4n0s_2024!")
  .digest();

// Función para encriptar utilizando IV persistente
function encrypt(text) {
  const iv = crypto.randomBytes(16).toString("hex"); // Generar IV aleatorio
  const cipher = crypto.createCipheriv(algorithm, key, Buffer.from(iv, "hex"));
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv + ":" + encrypted; // Devolver IV y texto cifrado concatenados
}

// Función para desencriptar utilizando IV persistente
function decrypt(encryptedText, ivHex) {
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = {
  encrypt,
  decrypt
};

// Rutas API

// Ruta para iniciar sesión de administradores
app.post("/loginAdministrador", async (req, res) => {
  console.log("Recibida solicitud de inicio de sesión de administrador");
  try {
      const { correo, clave } = req.body;
      console.log("Datos recibidos:", { correo, clave: '***' });

      if (!correo || !clave) {
          return res.status(400).json({ success: false, message: "Campos incompletos" });
      }

      await sql.connect(config);
      const request = new sql.Request();
      request.input("correo", sql.VarChar(100), correo);
      request.input("clave", sql.VarChar(255), clave);

      const result = await request.execute("IniciarSesionAdministrador");
      console.log("Resultado de la ejecución:", result);

      if (result.recordset && result.recordset.length > 0) {
          const admin = result.recordset[0];
          console.log("Administrador encontrado:", admin);
          const token = jwt.sign({ userId: admin.id }, "tu_secreto_jwt", { expiresIn: "1h" });
          res.json({ success: true, message: "Inicio de sesión exitoso", token });
      } else {
          res.json({ success: false, message: "Credenciales inválidas" });
      }
  } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).json({
          success: false,
          message: "Error en el servidor",
          error: error.message,
      });
  } finally {
      await sql.close();
  }
});

app.post('/verifyAdminToken', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ valid: false, message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ valid: false, message: 'Invalid token' });
    }

    res.json({ valid: true });
  });
});
// Ruta para registrar usuarios
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post("/Registro", async (req, res) => {
  const { nombre, correo, telefono, contrasenna } = req.body;

  if (!nombre || !correo || !contrasenna) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  try {
    await sql.connect(config);

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasenna, saltRounds);

    const request = new sql.Request();
    request.input("Nombre", sql.VarChar(100), nombre);
    request.input("Contrasenna", sql.VarChar(60), hashedPassword);
    request.input("Telefono", sql.VarChar(15), telefono || null);
    request.input("Correo", sql.VarChar(200), correo);

    const result = await request.execute("RegistrarCliente");

  
    if (result && result.recordset && result.recordset.length > 0) {
      const status = result.recordset[0].Status;
      if (status === "Cliente registrado correctamente") {
        res
          .status(200)
          .json({ success: true, message: "Cliente registrado correctamente" });
      } else if (status === "Correo electrónico ya registrado") {
        res.status(400).json({
          success: false,
          message: "El correo electrónico ya está registrado",
        });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Error al registrar el cliente" });
      }
    } else {
      res
        .status(500)
        .json({ success: false, message: "Error al registrar el cliente" });
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: error.message,
    });
  } finally {
    await sql.close(); // Cerrar conexión a la base de datos
  }
})
// Servidor Node.js / Express

app.post('/verifyUserToken', (req, res) => {
  const { token } = req.body;

  if (!token) {
      return res.status(400).json({ valid: false, message: 'Token no proporcionado' });
  }

  try {
      jwt.verify(token, 'tu_secreto_para_jwt');
      res.json({ valid: true });
  } catch (error) {
      console.error('Error al verificar el token del usuario:', error);
      res.status(401).json({ valid: false, message: 'Token no válido' });
  }
});

app.post("/Login", async (req, res) => {
  try {
      const { correo, contrasenna } = req.body;

      if (!correo || !contrasenna) {
          return res.status(400).json({ success: false, message: "Campos incompletos" });
      }

      await sql.connect(config);
      const request = new sql.Request();
      request.input("Correo", sql.VarChar(200), correo);
      request.input("Contrasenna", sql.VarChar(60), contrasenna);

      const result = await request.execute("IniciarSesion");

      if (result.recordset && result.recordset.length > 0) {
          const record = result.recordset[0];
          if (record.Status === 'success') {
              const isMatch = await bcrypt.compare(contrasenna, record.HashedPassword);
              if (isMatch) {
                  const token = jwt.sign({ userId: record.Id_cliente }, "tu_secreto_para_jwt", { expiresIn: "1h" });
                  res.json({ success: true, message: "Inicio de sesión exitoso", token });
              } else {
                  res.json({ success: false, message: "Credenciales inválidas" });
              }
          } else {
              res.json({ success: false, message: record.Message });
          }
      } else {
          res.status(500).json({ success: false, message: "Error al iniciar sesión" });
      }
  } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).json({
          success: false,
          message: "Error en el servidor",
          error: error.message,
      });
  } finally {
      await sql.close();
  }
});

/*
app.post('/verifyUserToken', (req, res) => {
  const { token } = req.body;

  if (!token) {
      return res.status(400).json({ valid: false, message: 'Token no proporcionado' });
  }

  try {
      jwt.verify(token, 'tu_secreto_jwt');
      res.json({ valid: true });
  } catch (error) {
      console.error('Error al verificar el token del usuario:', error);
      res.status(401).json({ valid: false, message: 'Token no válido' });
  }
});
app.post("/Login", async (req, res) => {
  try {
    const { correo, contrasenna } = req.body;

    if (!correo || !contrasenna) {
      return res.status(400).json({ success: false, message: "Campos incompletos" });
    }

    await sql.connect(config);
    const request = new sql.Request();
    request.input("Correo", sql.VarChar(200), correo);
    request.input("Contrasenna", sql.VarChar(60), contrasenna);

    const result = await request.execute("IniciarSesion");

    if (result.recordset && result.recordset.length > 0) {
      const record = result.recordset[0];
      if (record.Status === 'success') {
        const isMatch = await bcrypt.compare(contrasenna, record.HashedPassword);
        if (isMatch) {
          const token = jwt.sign({ userId: record.Id_cliente }, "tu_secreto_para_jwt", { expiresIn: "1h" });
          res.json({ success: true, message: "Inicio de sesión exitoso", token });
        } else {
          res.json({ success: false, message: "Credenciales inválidas" });
        }
      } else {
        res.json({ success: false, message: record.Message });
      }
    } else {
      res.status(500).json({ success: false, message: "Error al iniciar sesión" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: error.message,
    });
  } finally {
    await sql.close();
  }
});*/


// Ruta para obtener productos
app.get("/ObtenerProductos", async (req, res) => {
  try {
    const poolConnect = await pool.connect();
    const result = await pool.request().execute("ObtenerProductos");

    if (result.recordset.length > 0) {
      return res.status(200).json({
        success: true,
        productos: result.recordset,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No se encontraron productos",
      });
    }
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).json({
      success: false,
      message: "Error en el servidor al obtener productos",
      error: error.message,
    });
  } finally {
    pool.close(); // Asegúrate de cerrar la conexión del pool correctamente
  }
});

app.get("/ObtenerProducto/:id", async (req, res) => {
  try {
    const poolConnect = await pool.connect();
    const result = await pool.request()
      .input('id', req.params.id)
      .execute("ObtenerProductoPorID");

    if (result.recordset.length > 0) {
      return res.status(200).json({
        success: true,
        producto: result.recordset[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return res.status(500).json({
      success: false,
      message: "Error en el servidor al obtener producto",
      error: error.message,
    });
  } finally {
    pool.close(); // Asegúrate de cerrar la conexión del pool correctamente
  }
});


// Ruta para ingresar productos comprados
app.post("/IngresarProductoComprado", async (req, res) => {
  try {
    await pool.connect(); // Conectar al pool de conexiones

    const { precio, detalle, cantidad, fecha_Retiro } = req.body;

    const result = await pool
      .request()
      .input("Precio", sql.Float, precio)
      .input("Detalle", sql.VarChar(300), detalle)
      .input("Cantidad", sql.Int, cantidad)
      .input("Fecha_Retiro", sql.Date, fecha_Retiro)
      .execute("IngresarProductoComprado");

    if (result.rowsAffected && result.rowsAffected[0] > 0) {
      return res.status(200).json({
        success: true,
        message: "Producto comprado guardado exitosamente",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error al guardar el producto comprado",
      });
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return res.status(500).json({
      success: false,
      message: "Error en el servidor al procesar la solicitud",
      error: error.message,
    });
  } finally {
    await pool.close(); // Cerrar conexión del pool de conexiones
  }
});

// Rutas adicionales si es necesario, como actualizar y eliminar productos
// Ruta para insertar un nuevo producto
app.post('/cargarproductos', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, peso, precio, descripcion } = req.body;
    const imagenRuta = req.file ? req.file.path : null;

    const nuevoProducto = await sequelize.query(
      'EXEC InsertarProducto @Nombre=:nombre, @Peso=:peso, @Precio=:precio, @Descripcion=:descripcion, @ImagenRuta=:imagenRuta',
      {
        replacements: { nombre, peso, precio, descripcion, imagenRuta },
        type: Sequelize.QueryTypes.INSERT
      }
    );

    res.status(201).json({ success: true, message: "Producto insertado correctamente", data: nuevoProducto });
  } catch (error) {
    console.error("Error al insertar producto:", error);
    res.status(500).json({ success: false, message: "Error al insertar producto", error: error.message });
  }
});

// Ruta para actualizar un producto existente
app.put('/actualizarproductos/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, peso, precio, descripcion } = req.body;
    const imagenRuta = req.file ? req.file.path : null;

    await sequelize.query(
      'EXEC ActualizarProducto @Id=:id, @Nombre=:nombre, @Peso=:peso, @Precio=:precio, @Descripcion=:descripcion, @ImagenRuta=:imagenRuta',
      {
        replacements: { id, nombre, peso, precio, descripcion, imagenRuta },
        type: Sequelize.QueryTypes.UPDATE
      }
    );

    res.status(200).json({ success: true, message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ success: false, message: "Error al actualizar producto", error: error.message });
  }
});

// Ruta para eliminar un producto existente
app.delete('/eliminarproductos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await sequelize.query(
      'EXEC EliminarProducto @Id=:id',
      {
        replacements: { id },
        type: Sequelize.QueryTypes.DELETE
      }
    );

    res.status(200).json({ success: true, message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ success: false, message: "Error al eliminar producto", error: error.message });
  }
});

// Manejo de eventos antes de cerrar la aplicación
process.on("beforeExit", async () => {
  await pool.close(); // Cerrar conexión del pool de conexiones
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
