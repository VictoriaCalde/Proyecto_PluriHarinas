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
app.post('/Registro', async (req, res) => {
  const { nombre, correo, telefono, contrasenna } = req.body;

  // Verificar que los datos no estén vacíos
  if (!nombre || !correo || !contrasenna) {
    return res.status(400).json({ success: false, message: 'Datos incompletos' });
  }

  try {
    // Conectar a la base de datos
    await sql.connect(config);

    // Ejecutar el procedimiento almacenado
    const request = new sql.Request();
    request.input('Nombre', sql.VarChar(100), nombre);
    request.input('Contrasenna', sql.VarChar(50), contrasenna);
    request.input('Telefono', sql.VarChar(15), telefono || null); // Telefono es opcional
    request.input('Correo', sql.VarChar(200), correo);

    const result = await request.execute('RegistrarCliente');

    // Verificar el resultado del procedimiento almacenado
    if (result && result.recordsets && result.recordsets.length > 0) {
      const status = result.recordsets[0][0].Status;
      if (status === 'Cliente registrado correctamente') {
        res.status(200).json({ success: true, message: 'Cliente registrado correctamente' });
      } else if (status === 'Correo electrónico ya registrado') {
        res.status(400).json({ success: false, message: 'El correo electrónico ya está registrado' });
      } else {
        res.status(500).json({ success: false, message: 'Error al registrar el cliente' });
      }
    } else {
      res.status(500).json({ success: false, message: 'Error al registrar el cliente' });
    }
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor', error: error.message });
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
    const { correo, contrasenna } = req.body;

    // Validar campos antes de continuar
    if (!correo || !contrasenna) {
      return res.status(400).json({ success: false, message: "Campos incompletos" });
    }

    await pool.connect();
    const request = new sql.Request();
    const result = await request
      .input("Correo", sql.VarChar(200), correo)
      .input("Contrasenna", sql.VarChar(50), contrasenna)
      .execute("IniciarSesion");

    console.log("Resultados de la consulta:", result);

    // Verifica si el resultado contiene registros
    if (result.recordset.length > 0) {
      const record = result.recordset[0];
      if (record.Status === "success") {
        const userId = record.Id_cliente;
        const secretKey = "tu_clave_secreta"; // Debería estar en una variable de entorno
        const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });

        return res.json({ success: true, message: "Inicio de sesión exitoso", token });
      } else {
        return res.json({ success: false, message: "Correo o contraseña incorrectos" });
      }
    } else {
      return res.json({ success: false, message: "Correo o contraseña incorrectos" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ success: false, message: "Error en el servidor", error: error.message });
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
