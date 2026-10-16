# Soul Experience — Despliegue en Dokploy (VPS)

Este proyecto cuenta con una arquitectura optimizada:
1. **Frontend Público (Menú)**: Desplegado en **Vercel** (ultrarrápido, CDN global).
2. **Backend API + Base de Datos + Panel Admin**: Desplegado en tu **VPS con Dokploy**.

---

## 🚀 Paso 1: Desplegar el Backend en Dokploy

En tu panel de Dokploy:
1. **Crear Aplicación**:
   * Tipo: **Application**
   * Nombre: `soul-backend`
   * Repositorio: Selecciona tu repositorio de GitHub `Liuminedes/Soul-Experience`
   * Rama: `main`
2. **Configuración de Build**:
   * Build Type: **Dockerfile**
   * Dockerfile Path: `server/Dockerfile`
   * Docker Context: `server`
3. **Variables de Entorno (Environment Variables)**:
   * `PORT`: `3000`
   * `ADMIN_PASSWORD`: `tu_clave_secreta_aqui` (ejemplo: `soul2026`)
   * `JWT_SECRET`: `cualquier_cadena_secreta_aleatoria`
   * `DATA_DIR`: `/app/data`
4. **Almacenamiento Persistente (Volumes / Mounts)**:
   * En la pestaña **Volumes** (o Mounts) de la app en Dokploy, crea un volumen para que los cambios en el menú no se borren cuando se reinicie o actualice el contenedor:
     * **Host Path** (o Volume Name): `soul-menu-data`
     * **Container Path**: `/app/data`
5. **Dominio / SSL**:
   * En la sección **Domains**, añade tu subdominio (ej: `api.soulexperience.com` o el dominio generado por Dokploy).
   * Activa el certificado **SSL / Let's Encrypt**.
6. **Desplegar**: Pulsa en **Deploy**.

---

## 🔑 Paso 2: Usar el Panel de Administración

Una vez desplegado en Dokploy:
* Entra a: `https://tu-dominio-dokploy.com/admin`
* Ingresa la contraseña configurada en `ADMIN_PASSWORD`.
* Ahora puedes crear, editar y eliminar categorías y productos.
* Al pulsar **Guardar Cambios**, se guardan directamente en el archivo persistente del VPS (`/app/data/menu.json`).

---

## 🔗 Paso 3: Conectar el Frontend de Vercel con Dokploy

Para que la web de Vercel consulte tu menú en vivo desde el VPS:

Añade antes de `js/app.js` en tu `index.html` (o mediante variable):
```html
<script>
  window.SOUL_API_URL = "https://tu-dominio-dokploy.com";
</script>
<script src="js/app.js"></script>
```

> **Nota de Resiliencia:** Si el VPS se apaga o está en mantenimiento, el menú de Vercel cargará automáticamente los productos por defecto o el caché local sin romperse.
