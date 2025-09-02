API REST con Node.js y SQLite3 en AWS EC2
==========================================

Este proyecto implementa un API REST básico usando Node.js + Express y SQLite3.
La API permite listar, consultar y registrar productos en una base de datos SQLite.

------------------------------------------
REQUISITOS PREVIOS
------------------------------------------
- Instancia AWS EC2 corriendo Ubuntu (probado en Ubuntu 22.04 LTS).
- Node.js y npm instalados.
- SQLite3 instalado.
- Puerto 3000 habilitado en el Security Group de la instancia.

------------------------------------------
INSTALACIÓN
------------------------------------------
1. Conectar a la instancia EC2.

2. Clonar el repositorio:
   git clone https://github.com/BrunoGarcia55531/API-REST.git
   cd API-REST

3. Inicializar package.json (si no existe en el repo):
   npm init -y

4. Instalar dependencias:
   npm install express sqlite3

5. Crear la base de datos a partir del schema:
   sqlite3 products.db < schema.sql

------------------------------------------
CONFIGURACIÓN DE RED EN AWS
------------------------------------------
1. En la consola de AWS, ir a EC2 → Security Groups.
2. Seleccionar el grupo de seguridad de tu instancia.
3. Agregar una Inbound Rule:
   - Tipo: Custom TCP Rule
   - Puerto: 3000
   - Source: 0.0.0.0/0 (o tu IP pública para mayor seguridad)
4. Guardar cambios.
   
------------------------------------------
EJECUCIÓN DEL SERVIDOR
------------------------------------------
Levantar el API con:
   node index.js

Salida esperada:
   Servidor corriendo en http://0.0.0.0:3000

------------------------------------------
PRUEBAS CON POSTMAN
------------------------------------------
Con la IP pública de tu instancia EC2, probar:

- GET → http://<IP_PUBLICA>:3000/products
  Devuelve la lista de productos.

- POST → http://<IP_PUBLICA>:3000/products
  Body (JSON):
  {
    "name": "Celular",
    "price": 999.99
  }

- GET → http://<IP_PUBLICA>:3000/products/1
  Devuelve el producto creado.

