# Sonido Vivo

Guía simple para iniciar la tienda en tu computador. No necesitas instalar Java ni Node.js para usarla; Docker ejecuta todo.

## Antes de empezar

En Windows, instala **Docker Desktop** y ábrelo. Espera a que indique que Docker está funcionando.

## Iniciar la tienda

Abre PowerShell y copia estos pasos. Si ya tienes la carpeta del proyecto, empieza en el paso 2.

### 1. Descargar el proyecto

```powershell
git clone https://github.com/Malaaya/sonidovivo.git
Set-Location .\sonidovivo
```

### 2. Preparar la configuración

Crea tu archivo de configuración:

```powershell
Copy-Item .env.example .env
```

Ahora crea una clave para la aplicación. Copia y pega este bloque completo en PowerShell:

```powershell
$bytes = [byte[]]::new(32)
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
[Convert]::ToBase64String($bytes)
$rng.Dispose()
```

PowerShell mostrará una clave larga. Cópiala, abre el archivo `.env` y pégala después de `JWT_SECRET=`:

```powershell
notepad .env
```

Guarda y cierra el archivo.

### 3. Iniciar Docker

En la misma ventana de PowerShell, ejecuta:

```powershell
docker compose up -d --build
```

La primera vez puede tardar varios minutos mientras descarga lo necesario. Cuando termine, abre la tienda:

- **Tienda:** http://localhost
- **Documentación de la API:** http://localhost:8081/swagger-ui.html

## Cuentas para probar

Si copiaste `.env.example` y no cambiaste estas contraseñas, puedes iniciar sesión con:

| Tipo de cuenta | Correo | Contraseña inicial |
| --- | --- | --- |
| Administrador | `admin@sonidovivo.cl` | `demo_admin123` |
| Vendedor | `vendedor@sonidovivo.cl` | `demo_vendedor123` |
| Cliente | `cliente@sonidovivo.cl` | `demo_cliente123` |

Son cuentas solo para pruebas locales; no las uses en un sitio público. En el Compose local, al iniciar el backend estas contraseñas se aplican a las cuentas demo, incluso si ya existían. Si cambias los valores en `.env`, se volverán a aplicar al siguiente inicio. En el Compose de producción, la carga de cuentas está apagada por defecto.

## Qué puede hacer cada cuenta

- **Administrador:** administrar productos y categorías, consultar usuarios y boletas.
- **Vendedor:** ver productos y boletas; no puede modificarlos.
- **Cliente:** ver la tienda, comprar y revisar su historial de compras.
- **Sin iniciar sesión:** recorrer la tienda y registrarse; para comprar hay que iniciar sesión como cliente.

## Detener la tienda

Para apagar los servicios:

```powershell
docker compose down
```

Esto conserva la base de datos. No uses `docker compose down -v` si quieres conservar tus datos: ese comando también borra la base de datos guardada.

## Si algo falla

Para ver por qué el backend no inició, ejecuta:

```powershell
docker compose logs --tail 80 backend
```

Si aparece un error de contraseña de MySQL (`Access denied`), puede deberse a que la base de datos ya existía con otra configuración. No borres los datos; guarda el mensaje y pide ayuda para revisar esa base.

## Para desarrollar

Si quieres modificar el código o ejecutar las pruebas, consulta la guía del [frontend](./front/README.md). El proyecto también incluye el backend en `back/`.
