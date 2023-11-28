const sql = require("mssql/msnodesqlv8");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 4000;

// Configuración de la base de datos
const config = {
  user: "LAPTOP-1P50TQ8M\\Usuario",
  password: " ",
  server: "LAPTOP-1P50TQ8M",
  database: "PluriHarinas",
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
    encrypt: false,
  },
};

const pool = new sql.ConnectionPool(config);

// Middleware
app.use(cors());
app.use(express.json());

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
    pool.close();
  }
});

// Ruta para el registro de clientes
app.post("/Registro", async (req, res) => {
  try {
    await pool.connect();

    const { nombre, contrasenna, telefono, correo } = req.body;

    const usuarioExistente = await pool
      .request()
      .input("Nombre", sql.VarChar(100), nombre)
      .input("Correo", sql.VarChar(200), correo)
      .execute("VerificarExistenciaUsuario");

    const existeUsuario = usuarioExistente.recordset[0].Existe === 1;

    if (existeUsuario) {
      return res.status(400).json({
        success: false,
        message:
          "El usuario ya existe. Por favor, elija otro nombre de usuario o correo.",
      });
    }

    const resultRegistro = await pool
      .request()
      .input("Nombre", sql.VarChar(100), nombre)
      .input("Contrasenna", sql.VarChar(10), contrasenna)
      .input("Telefono", sql.VarChar(15), telefono)
      .input("Correo", sql.VarChar(200), correo)
      .execute("RegistrarCliente");

    if (resultRegistro.rowsAffected && resultRegistro.rowsAffected[0] > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Registro exitoso" });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error en el servidor al registrar el cliente",
      });
    }
  } catch (error) {
    console.error("Error en el registro:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error en el servidor" });
  } finally {
    await pool.close();
  }
});

// Ruta para ingresar productos comprados
app.post("/IngresarProductoComprado", async (req, res) => {
  try {
    await pool.connect();

    const { precio, detalle, cantidad, fecha_Retiro } = req.body;

    console.log("Datos recibidos:", {
      precio,
      detalle,
      cantidad,
      fecha_Retiro,
    });

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
    await pool.close();
  }
});

// Ruta para el inicio de sesión
app.post("/Login", async (req, res) => {
  try {
    await pool.connect();

    const { correo, contrasenna } = req.body;

    // Validar campos antes de continuar
    const erroresValidacion = validar({ correo, contrasenna });
    if (Object.keys(erroresValidacion).length > 0) {
      return res.json({
        success: false,
        message: "Error de validación",
        errors: erroresValidacion,
      });
    }

    let secretKey;

    const result = await pool
      .request()
      .input("Correo", sql.VarChar(200), correo)
      .input("Contrasenna", sql.VarChar(10), contrasenna)
      .execute("IniciarSesion");

    console.log("Resultados de la consulta:", result);

    if (
      result.recordset.length > 0 &&
      result.recordset[0].status === "success"
    ) {
      secretKey = "tu_clave_secreta";
      const userId = result.recordset[0].Id_cliente;
      const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });

      res.json({ success: true, message: "Inicio de sesión exitoso", token });
    } else {
      res.json({ success: false, message: "Correo o contraseña incorrectos" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  } finally {
    await pool.close();
  }
});

// Manejo de eventos antes de cerrar la aplicación
process.on("beforeExit", async () => {
  await pool.close();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
