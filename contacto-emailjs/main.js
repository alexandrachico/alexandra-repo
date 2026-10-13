(function () {
  var config = window.EMAILJS_CONFIG || {}
  var form = document.getElementById('contact-form')
  var boton = document.getElementById('boton-enviar')
  var estado = document.getElementById('mensaje-estado')
  var PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function configurado() {
    return (
      config.serviceId &&
      config.templateId &&
      config.publicKey &&
      !/xxxxxx/.test(config.serviceId) &&
      !/xxxxxx/.test(config.templateId) &&
      !/xxxxxx/.test(config.publicKey)
    )
  }

  if (typeof emailjs !== 'undefined' && configurado()) {
    emailjs.init({ publicKey: config.publicKey })
  }

  function campo(nombre) {
    return form.querySelector('[data-campo="' + nombre + '"]')
  }

  function limpiarError(nombre) {
    var c = campo(nombre)
    c.classList.remove('invalido')
    c.querySelector('.error').textContent = ''
  }

  function marcarError(nombre, texto) {
    var c = campo(nombre)
    c.classList.add('invalido')
    c.querySelector('.error').textContent = texto
  }

  function validar() {
    var errores = 0
    var nombres = ['from_name', 'reply_to', 'to_email', 'subject', 'message']

    nombres.forEach(limpiarError)

    var nombre = form.from_name.value.trim()
    var correo = form.reply_to.value.trim()
    var destino = form.to_email.value.trim()
    var asunto = form.subject.value.trim()
    var mensaje = form.message.value.trim()

    if (!nombre) {
      marcarError('from_name', 'Ingresa tu nombre.')
      errores++
    }

    if (!correo) {
      marcarError('reply_to', 'Ingresa tu correo.')
      errores++
    } else if (!PATRON_CORREO.test(correo)) {
      marcarError('reply_to', 'Correo no válido.')
      errores++
    }

    if (!destino) {
      marcarError('to_email', 'Ingresa el destinatario.')
      errores++
    } else if (!PATRON_CORREO.test(destino)) {
      marcarError('to_email', 'Correo no válido.')
      errores++
    }

    if (!asunto) {
      marcarError('subject', 'Ingresa un asunto.')
      errores++
    }

    if (!mensaje) {
      marcarError('message', 'Escribe un mensaje.')
      errores++
    } else if (mensaje.length < 10) {
      marcarError('message', 'Mínimo 10 caracteres.')
      errores++
    }

    return errores === 0
  }

  function mostrarEstado(tipo, texto) {
    estado.className = tipo
    estado.textContent = texto
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault()
    estado.className = ''
    estado.textContent = ''

    if (!validar()) {
      mostrarEstado('error', 'Revisa los campos marcados en rojo.')
      return
    }

    if (!configurado()) {
      mostrarEstado(
        'advertencia',
        'EmailJS no está configurado. Edita config.js y coloca tu Service ID, ' +
          'Template ID y Public Key.'
      )
      return
    }

    if (typeof emailjs === 'undefined') {
      mostrarEstado('error', 'No se pudo cargar el SDK de EmailJS. Revisa tu conexión.')
      return
    }

    boton.disabled = true
    boton.textContent = 'Enviando...'

    emailjs
      .sendForm(config.serviceId, config.templateId, this)
      .then(function () {
        mostrarEstado('exito', '¡Mensaje enviado con éxito!')
        form.reset()
      })
      .catch(function (error) {
        var detalle =
          (error && (error.text || error.message)) || 'inténtalo de nuevo.'
        mostrarEstado('error', 'No se pudo enviar: ' + detalle)
        console.error('Error EmailJS:', error)
      })
      .finally(function () {
        boton.disabled = false
        boton.textContent = 'Enviar mensaje'
      })
  })
})()
