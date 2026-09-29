import { useState } from 'react'
import insignia from './assets/undcinsignia.png'
import campus from './assets/campus.jpg'
import docentesImg from './assets/docentesundc.jpeg'
import administrativosImg from './assets/administrativos.jpg'
import './App.css'

const DOCENTES_INICIALES = [
  {
    codigo: 'DOC-20261',
    nombre: 'Dr. Carlos Mendoza',
    grado: 'Doctor en Cs. de la Computación',
    asignatura: 'Algoritmos y Programación',
    condicion: 'Nombrado',
  },
  {
    codigo: 'DOC-20262',
    nombre: 'Mg. María Fernández',
    grado: 'Magíster en Ing. de Software',
    asignatura: 'Base de Datos I',
    condicion: 'Contratado',
  },
  {
    codigo: 'DOC-20263',
    nombre: 'Ing. Roberto Gómez',
    grado: 'Licenciado en Sistemas',
    asignatura: 'Sistemas Operativos',
    condicion: 'Contratado',
  },
]

const ADMINISTRATIVOS_INICIALES = [
  {
    codigo: 'ADM-101',
    nombre: 'Lucía Salazar',
    oficina: 'Secretaría Académica',
    cargo: 'Encargada de Tramites',
    turno: 'Mañana',
  },
  {
    codigo: 'ADM-102',
    nombre: 'Jorge Ramírez',
    oficina: 'Unidad de Tesorería',
    cargo: 'Especialista Financiero',
    turno: 'Mañana',
  },
  {
    codigo: 'ADM-103',
    nombre: 'Elena Gutiérrez',
    oficina: 'Oficina de TI y Sistemas',
    cargo: 'Soporte Técnico Campus',
    turno: 'Tarde',
  },
]

const SECCIONES = [
  {
    id: 'inicio',
    titulo: 'Inicio',
    icono: 'bi-house-door',
    descripcion: 'Campus Universitario | Portal Académico',
  },
  {
    id: 'docente',
    titulo: 'Módulo Docente',
    icono: 'bi-mortarboard-fill',
    descripcion: 'Padrón de catedráticos y asignación de asignaturas.',
  },
  {
    id: 'administrativo',
    titulo: 'Módulo Administrativo',
    icono: 'bi-building-fill-gear',
    descripcion: 'Directorio de dependencias y unidades operativas.',
  },
]

const GRADOS_ACADEMICOS = ['Doctorado', 'Maestría', 'Licenciatura / Titulado']
const CONDICIONES = ['Nombrado', 'Contratado', 'Invitado']
const OFICINAS = [
  'Secretaría Académica',
  'Mesa de Partes',
  'Unidad de Posgrado',
  'Oficina de TI y Sistemas',
]
const TURNOS = ['Turno Mañana (08:00 - 16:00)', 'Turno Tarde (14:00 - 22:00)']

function Icono({ clase }) {
  return <i className={`bi ${clase}`} aria-hidden="true" />
}

function BarraLateral({ vistaActual, onNavegar, abierta, onCerrar }) {
  return (
    <aside className={`barra-lateral ${abierta ? 'abierta' : ''}`}>
      <div className="marca">
        <img
          src={insignia}
          alt="Insignia de la Universidad Nacional de Cañete"
          className="insignia"
        />
        <div className="marca-texto">
          <strong>Universidad Nacional de Cañete</strong>
          <span>Plataforma Universitaria</span>
        </div>
        <button
          type="button"
          className="cerrar-menu"
          onClick={onCerrar}
          aria-label="Cerrar el menú"
        >
          <Icono clase="bi-x-lg" />
        </button>
      </div>

      <nav className="menu-lateral">
        <span className="menu-titulo">Módulos institucionales</span>
        <ul>
          {SECCIONES.map((seccion) => (
            <li key={seccion.id}>
              <button
                type="button"
                className={`menu-enlace ${
                  vistaActual === seccion.id ? 'activo' : ''
                }`}
                onClick={() => onNavegar(seccion.id)}
              >
                <span className="menu-icono">
                  <Icono clase={seccion.icono} />
                </span>
                <span className="menu-etiquetas">
                  <strong>{seccion.titulo}</strong>
                  <small>{seccion.descripcion}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="lateral-pie">
        <p>&copy; 2026 Universidad Nacional de Cañete</p>
        <small>Oficina Central de Tecnologías de la Información y Sistemas</small>
      </div>
    </aside>
  )
}

function BarraSuperior({ onAbrirMenu }) {
  return (
    <header className="barra-superior">
      <button
        type="button"
        className="abrir-menu"
        onClick={onAbrirMenu}
        aria-label="Mostrar el menú"
      >
        <Icono clase="bi-list" />
      </button>

      <div className="barra-superior-datos">
        <span>
          <Icono clase="bi-geo-alt-fill" /> Campus Universitario
        </span>
        <span className="separador" />
        <span>
          <Icono clase="bi-telephone-fill" /> Mesa de Partes Virtual
        </span>
      </div>

      <span className="semestre">
        <Icono clase="bi-calendar3" /> Semestre Académico 2026-II
      </span>
    </header>
  )
}

function Portada({ totalDocentes, totalAdministrativos }) {
  const indicadores = [
    { valor: totalDocentes, etiqueta: 'Docentes matriculados' },
    { valor: totalAdministrativos, etiqueta: 'Servidores públicos' },
    { valor: 2, etiqueta: 'Módulos institucionales' },
  ]

  return (
    <section className="portada">
      <div className="portada-fondo" style={{ backgroundImage: `url(${campus})` }} />
      <div className="portada-contenido">
        <span className="portada-antetitulo">Bienvenido a la comunidad universitaria</span>
        <h1>Plataforma Universitaria</h1>
        <p>
          Acceso centralizado para la consulta de planas docentes, asignaturas,
          trámites de personal administrativo y servicios universitarios.
        </p>
        <div className="indicadores">
          {indicadores.map((indicador) => (
            <div key={indicador.etiqueta} className="indicador">
              <strong>{indicador.valor}</strong>
              <span>{indicador.etiqueta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TarjetaModulo({ icono, iconoClase, titulo, descripcion, imagen, boton, onEntrar }) {
  return (
    <article className="tarjeta">
      <div className="tarjeta-cabecera">
        <img src={imagen} alt={titulo} className="tarjeta-imagen" />
        <span className="tarjeta-icono">
          <Icono clase={`${icono} ${iconoClase}`} />
        </span>
      </div>
      <div className="tarjeta-cuerpo">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
        <button type="button" className="boton" onClick={onEntrar}>
          {boton} <Icono clase="bi-arrow-right" />
        </button>
      </div>
    </article>
  )
}

function VistaInicio({ onEntrar, totalDocentes, totalAdministrativos }) {
  return (
    <>
      <Portada
        totalDocentes={totalDocentes}
        totalAdministrativos={totalAdministrativos}
      />

      <section className="bloque">
        <div className="bloque-encabezado">
          <span className="antetitulo">Acceso por rol</span>
          <h2>Módulos institucionales</h2>
          <p>
            Selecciona el módulo correspondiente para registrar información o
            consultar el padrón vigente.
          </p>
        </div>

        <div className="rejilla-modulos">
          <TarjetaModulo
            icono="bi-mortarboard-fill"
            iconoClase="dorado"
            titulo="Plana Docente & Cursos"
            descripcion="Consulta el registro de catedráticos, especialidades docentes, carga horaria y asignación de asignaturas de la facultad."
            imagen={docentesImg}
            boton="Acceder a Docentes"
            onEntrar={() => onEntrar('docente')}
          />
          <TarjetaModulo
            icono="bi-briefcase-fill"
            iconoClase="esmeralda"
            titulo="Cuerpo Administrativo"
            descripcion="Directorio de secretaría académica, tesorería, jefaturas de laboratorio, soporte de TI y jefes de área."
            imagen={administrativosImg}
            boton="Acceder a Administrativos"
            onEntrar={() => onEntrar('administrativo')}
          />
        </div>
      </section>
    </>
  )
}

function TituloModulo({ icono, iconoClase, titulo, descripcion, onVolver }) {
  return (
    <div className="titulo-modulo">
      <button type="button" className="volver" onClick={onVolver}>
        <Icono clase="bi-arrow-left" /> Volver al inicio
      </button>
      <div className="titulo-modulo-encabezado">
        <span className={`titulo-icono ${iconoClase}`}>
          <Icono clase={icono} />
        </span>
        <div>
          <span className="antetitulo">Módulo activo</span>
          <h1>{titulo}</h1>
          <p>{descripcion}</p>
        </div>
      </div>
    </div>
  )
}

function EtiquetaCondicion({ condicion }) {
  const clases = {
    Nombrado: 'esmeralda',
    Contratado: 'celeste',
    Invitado: 'ambar',
  }
  return <span className={`etiqueta ${clases[condicion] ?? 'gris'}`}>{condicion}</span>
}

function VistaDocente({ docentes, onAgregar, onVolver }) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    grado: '',
    asignatura: '',
    condicion: 'Nombrado',
  })

  const actualizar = (evento) => {
    const { name, value } = evento.target
    setFormulario((actual) => ({ ...actual, [name]: value }))
  }

  const registrar = (evento) => {
    evento.preventDefault()
    if (!formulario.nombre || !formulario.grado || !formulario.asignatura) return

    onAgregar({
      codigo: `DOC-${20261 + docentes.length}`,
      ...formulario,
    })
    setFormulario({ nombre: '', grado: '', asignatura: '', condicion: 'Nombrado' })
  }

  return (
    <>
      <TituloModulo
        icono="bi-mortarboard-fill"
        iconoClase="dorado"
        titulo="Gestión de Plana Docente"
        descripcion="Registro y padrón oficial de catedráticos ordinarios y contratados."
        onVolver={onVolver}
      />

      <section className="bloque">
        <div className="rejilla-modulo">
          <div className="panel">
            <div className="panel-cabecera">
              <h3>Padrón de Catedráticos</h3>
              <span className="distintivo">Facultad de Ingeniería</span>
            </div>

            <div className="tabla-envoltura">
              <table className="tabla">
                <thead>
                  <tr>
                    <th>Cód. Docente</th>
                    <th>Catedrático</th>
                    <th>Grado Académico</th>
                    <th>Asignatura Principal</th>
                    <th>Condición</th>
                  </tr>
                </thead>
                <tbody>
                  {docentes.map((docente) => (
                    <tr key={docente.codigo}>
                      <td>
                        <span className="codigo">{docente.codigo}</span>
                      </td>
                      <td className="destacado">{docente.nombre}</td>
                      <td>{docente.grado}</td>
                      <td>{docente.asignatura}</td>
                      <td>
                        <EtiquetaCondicion condicion={docente.condicion} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <form className="panel formulario" onSubmit={registrar}>
            <div className="panel-cabecera">
              <h3>Registro de Docente</h3>
            </div>

            <div className="panel-cuerpo">
              <label className="campo">
                <span>Nombres y Apellidos</span>
                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={actualizar}
                  placeholder="Ej. Dr. Juan Pérez"
                />
              </label>

              <label className="campo">
                <span>Grado Académico</span>
                <select name="grado" value={formulario.grado} onChange={actualizar}>
                  <option value="">Seleccione grado...</option>
                  {GRADOS_ACADEMICOS.map((grado) => (
                    <option key={grado} value={grado}>
                      {grado}
                    </option>
                  ))}
                </select>
              </label>

              <label className="campo">
                <span>Asignatura a Cargo</span>
                <input
                  type="text"
                  name="asignatura"
                  value={formulario.asignatura}
                  onChange={actualizar}
                  placeholder="Ej. Redes de Datos"
                />
              </label>

              <label className="campo">
                <span>Condición</span>
                <select
                  name="condicion"
                  value={formulario.condicion}
                  onChange={actualizar}
                >
                  {CONDICIONES.map((condicion) => (
                    <option key={condicion} value={condicion}>
                      {condicion}
                    </option>
                  ))}
                </select>
              </label>

              <button type="submit" className="boton boton-dorado">
                Registrar en Padrón
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

function VistaAdministrativo({ administrativos, onAgregar, onVolver }) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    oficina: '',
    cargo: '',
    turno: TURNOS[0],
  })

  const actualizar = (evento) => {
    const { name, value } = evento.target
    setFormulario((actual) => ({ ...actual, [name]: value }))
  }

  const registrar = (evento) => {
    evento.preventDefault()
    if (!formulario.nombre || !formulario.oficina || !formulario.cargo) return

    onAgregar({
      codigo: `ADM-${101 + administrativos.length}`,
      nombre: formulario.nombre,
      oficina: formulario.oficina,
      cargo: formulario.cargo,
      turno: formulario.turno.startsWith('Turno Tarde') ? 'Tarde' : 'Mañana',
    })
    setFormulario({
      nombre: '',
      oficina: '',
      cargo: '',
      turno: TURNOS[0],
    })
  }

  return (
    <>
      <TituloModulo
        icono="bi-building-fill-gear"
        iconoClase="esmeralda"
        titulo="Gestión de Personal Administrativo"
        descripcion="Directorio de dependencias, oficinas de soporte y unidades operativas."
        onVolver={onVolver}
      />

      <section className="bloque">
        <div className="rejilla-modulo">
          <div className="panel">
            <div className="panel-cabecera">
              <h3>Directorio de Dependencias</h3>
              <span className="distintivo esmeralda">Sede Central</span>
            </div>

            <div className="tabla-envoltura">
              <table className="tabla">
                <thead>
                  <tr>
                    <th>ID Servidor</th>
                    <th>Personal</th>
                    <th>Oficina / Dependencia</th>
                    <th>Cargo Institucional</th>
                    <th>Turno</th>
                  </tr>
                </thead>
                <tbody>
                  {administrativos.map((administrativo) => (
                    <tr key={administrativo.codigo}>
                      <td>
                        <span className="codigo">{administrativo.codigo}</span>
                      </td>
                      <td className="destacado">{administrativo.nombre}</td>
                      <td>{administrativo.oficina}</td>
                      <td>{administrativo.cargo}</td>
                      <td>
                        <span
                          className={`etiqueta ${
                            administrativo.turno === 'Tarde' ? 'pizarra' : 'gris'
                          }`}
                        >
                          {administrativo.turno}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <form className="panel formulario" onSubmit={registrar}>
            <div className="panel-cabecera">
              <h3>Registro de Personal</h3>
            </div>

            <div className="panel-cuerpo">
              <label className="campo">
                <span>Nombre Completo</span>
                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={actualizar}
                  placeholder="Ej. Lic. Pedro Castro"
                />
              </label>

              <label className="campo">
                <span>Cargo Institucional</span>
                <input
                  type="text"
                  name="cargo"
                  value={formulario.cargo}
                  onChange={actualizar}
                  placeholder="Ej. Analista de Sistemas"
                />
              </label>

              <label className="campo">
                <span>Oficina Asignada</span>
                <select
                  name="oficina"
                  value={formulario.oficina}
                  onChange={actualizar}
                >
                  <option value="">Seleccionar dependencia...</option>
                  {OFICINAS.map((oficina) => (
                    <option key={oficina} value={oficina}>
                      {oficina}
                    </option>
                  ))}
                </select>
              </label>

              <label className="campo">
                <span>Turno de Atención</span>
                <select name="turno" value={formulario.turno} onChange={actualizar}>
                  {TURNOS.map((turno) => (
                    <option key={turno} value={turno}>
                      {turno}
                    </option>
                  ))}
                </select>
              </label>

              <button type="submit" className="boton boton-esmeralda">
                Registrar Servidor
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

function App() {
  const [vista, setVista] = useState('inicio')
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [docentes, setDocentes] = useState(DOCENTES_INICIALES)
  const [administrativos, setAdministrativos] = useState(ADMINISTRATIVOS_INICIALES)

  const navegar = (destino) => {
    setVista(destino)
    setMenuAbierto(false)
  }

  return (
    <div className="aplicacion">
      <BarraLateral
        vistaActual={vista}
        onNavegar={navegar}
        abierta={menuAbierto}
        onCerrar={() => setMenuAbierto(false)}
      />
      {menuAbierto && (
        <div className="velo" onClick={() => setMenuAbierto(false)} aria-hidden="true" />
      )}

      <div className="contenido-principal">
        <BarraSuperior onAbrirMenu={() => setMenuAbierto(true)} />

        <main className="principal">
          {vista === 'inicio' && (
            <VistaInicio
              onEntrar={navegar}
              totalDocentes={docentes.length}
              totalAdministrativos={administrativos.length}
            />
          )}

          {vista === 'docente' && (
            <VistaDocente
              docentes={docentes}
              onAgregar={(docente) =>
                setDocentes((lista) => [...lista, docente])
              }
              onVolver={() => navegar('inicio')}
            />
          )}

          {vista === 'administrativo' && (
            <VistaAdministrativo
              administrativos={administrativos}
              onAgregar={(administrativo) =>
                setAdministrativos((lista) => [...lista, administrativo])
              }
              onVolver={() => navegar('inicio')}
            />
          )}
        </main>

        <footer className="pie">
          <p>&copy; 2026 Universidad Nacional de Cañete - Todos los derechos reservados</p>
          <small>Mesa de Partes Virtual &middot; Atención de lunes a viernes, 08:00 - 17:00</small>
        </footer>
      </div>
    </div>
  )
}

export default App
