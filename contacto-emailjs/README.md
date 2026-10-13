# Envío de Correos con EmailJS

Página estática (HTML5, CSS3 y JavaScript) que envía un mensaje por correo
electrónico usando [EmailJS](https://www.emailjs.com/), con validación de datos
y mensajes de confirmación/error.

## Archivos

- `index.html` — formulario (Nombre, Correo, Destinatario, Asunto, Mensaje).
- `style.css` — estilos.
- `config.js` — credenciales de EmailJS (completar).
- `main.js` — validación y envío.

## 1. Configurar EmailJS

1. Crea una cuenta en https://dashboard.emailjs.com/ y conecta un servicio de
   correo (**Email Services**). Copia el **Service ID**.
2. Crea una plantilla (**Email Templates**) y copia el **Template ID**.
3. En **Account → General** copia tu **Public Key**.
4. Pega los tres valores en `config.js`:

   ```js
   window.EMAILJS_CONFIG = {
     serviceId: 'service_xxxxxxx',
     templateId: 'template_xxxxxxx',
     publicKey: 'xxxxxxxxxxxxxxxx',
   }
   ```

## 2. Configurar la plantilla

En la plantilla de EmailJS usa estos parámetros (deben coincidir con los `name`
del formulario):

| Campo de la plantilla | Valor        |
| --------------------- | ------------ |
| To Email              | `{{to_email}}` |
| Subject               | `{{subject}}`  |
| Reply To              | `{{reply_to}}` |

Cuerpo sugerido:

```
Nombre: {{from_name}}
Correo: {{reply_to}}
Mensaje: {{message}}
```

> Si prefieres un destinatario fijo, escribe tu correo directamente en
> **To Email** en lugar de `{{to_email}}`.

## 3. Abrir y probar

Se recomienda un servidor local (por ejemplo **Live Server** en VS Code), ya que
abrir el archivo con `file://` puede bloquear la petición a EmailJS.

- Si todo está bien: alerta verde "¡Mensaje enviado con éxito!".
- Si algo falla: alerta roja con el detalle del error.
- Si faltan credenciales: aviso indicando que edites `config.js`.

## Notas

- La **Public Key** está diseñada para ser pública; aun así, no expongas tu
  **Private Key**.
- Verifica la llegada del correo en el **Email History** del panel de EmailJS
  (un estado `200 OK` significa que se envió). Revisa también la carpeta de Spam.
