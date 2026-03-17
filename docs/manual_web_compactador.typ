#set document(
  title: "Manual de la Web del Compactador de Basura",
  author: ("Equipo Compactador Fisica",),
)

#set page(
  paper: "a4",
  margin: (x: 2.2cm, y: 2.2cm),
  numbering: "1",
)

#set text(
  font: "Liberation Sans",
  size: 10.5pt,
)

#set par(justify: true, leading: 0.65em)

= Manual de la Web del Compactador de Basura

Este documento explica como funciona la plataforma web del compactador, como usar el simulador fisico y como replicar el proyecto para desarrollo o despliegue.

#v(0.8em)
*Version del manual:* 1.0  
*Proyecto:* Compactador Fisica (Next.js + Three.js + Recharts)  
*Objetivo:* uso educativo, tecnico y de demostracion

#pagebreak()

= Tabla de contenido
#outline()

#pagebreak()

= 1. Vision general de la plataforma

La web se disena para que el usuario *sienta la fisica* del compactador. En lugar de mostrar solo datos fijos, la plataforma conecta:

- un panel de entradas fisicas editables,
- un motor de calculo (ventaja mecanica, fuerzas, trabajo, eficiencia),
- graficas dinamicas en tiempo real,
- visualizacion 3D reactiva del compactador,
- secciones teoricas para contextualizar resultados.

== 1.1 Objetivos funcionales

+ Enseñar el principio de palanca de segundo genero.
+ Demostrar como cambian fuerza y energia al variar parametros.
+ Comparar materiales de compactacion (papel, plastico, metal).
+ Simular escenarios de uso real (educativo, comercial, municipal).
+ Servir como base replicable para proyectos academicos.

== 1.2 Flujo de datos (resumen)

`Inputs del usuario -> Motor fisico -> Estado compartido -> UI (cards, graficas, 3D, contenido tecnico)`

Todo se actualiza en el mismo ciclo de render para mantener coherencia entre numeros, curvas y animaciones.

= 2. Arquitectura tecnica

== 2.1 Componentes principales

#table(
  columns: (28%, 72%),
  stroke: 0.4pt + luma(180),
  align: (left, left),
  [*Modulo / Archivo*], [*Responsabilidad*],

  [`app/page.tsx`], [Orquesta las secciones y provee estado global al arbol de componentes.],
  [`store/simulationStore.tsx`], [Estado global de simulacion: parametros, presets, reproduccion, curvas y resultados derivados.],
  [`lib/physics/engine.ts`], [Funciones puras del modelo fisico y generacion de datasets para graficas.],
  [`lib/physics/materials.ts`], [Modelos de materiales y propiedades mecanicas base.],
  [`components/simulation/SimulationSlider.tsx`], [Panel interactivo de control, calculadora VM y simulador de escenarios.],
  [`components/algodoo/AlgodooSection.tsx`], [Dashboard de graficas dinamicas y exportacion CSV.],
  [`components/hero/CompactorCanvas.tsx`], [Vista 3D reactiva (palanca, piston, color por material).],
  [`components/content/PhysicsContentSection.tsx`], [Explicacion teorica y lectura guiada de resultados.],
  [`public/data/materials.json`], [Dataset de referencia para contenido y configuraciones de materiales.],
)

== 2.2 Modelo fisico base

Las relaciones principales del simulador son:

- $VM = L_1 / L_2$
- $F_s(ideal) = F_e * VM$
- $F_s(real) = F_s(ideal) - (m * g) - F_f$
- $W = F_util * d$
- $eta = F_util / F_s(ideal)$

Donde:

- $L_1$: brazo largo de la palanca.
- $L_2$: brazo corto de la palanca.
- $F_e$: fuerza de entrada del usuario.
- $m$: masa de la placa.
- $F_f$: fuerza total de friccion.
- $d$: desplazamiento del piston.
- $eta$: eficiencia del ciclo.

= 3. Manual de uso para usuario final

== 3.1 Inicio rapido

+ Abre la pagina principal.
+ Ve a "Simulador interactivo".
+ Elige un preset o configura tus parametros manualmente.
+ Observa cards, graficas y vista 3D mientras cambias valores.
+ Interpreta resultados con la seccion "Como funciona la fisica del compactador".

== 3.2 Controles del simulador

#table(
  columns: (30%, 70%),
  stroke: 0.4pt + luma(180),
  align: (left, left),
  [*Control*], [*Uso y efecto*],

  [Posicion de palanca], [Ajusta el estado instantaneo del ciclo; afecta fuerza efectiva y animacion.],
  [L1 y L2], [Definen la ventaja mecanica. Subir L1 o bajar L2 aumenta VM.],
  [Fuerza de entrada], [Incrementa la fuerza ideal disponible para compactar.],
  [Friccion], [A mayor friccion, menor fuerza util y eficiencia.],
  [Masa de placa], [Afecta perdidas por peso y la fuerza real transmitida.],
  [Desplazamiento], [Afecta trabajo mecanico por ciclo y curvas temporales.],
  [Material], [Cambia umbral de resistencia, compactabilidad y color tematico del sistema.],
  [Play/Pause], [Reproduce ciclo automatico para demostraciones dinamicas.],
  [Presets], [Carga configuraciones predefinidas para comparacion rapida.],
)

== 3.3 Lectura de resultados

=== Cards de metricas
- *Ventaja mecanica:* factor de multiplicacion de fuerza.
- *Fs ideal:* fuerza teorica sin perdidas.
- *Fs real util:* fuerza disponible para deformar el residuo.
- *Trabajo por ciclo:* energia mecanica estimada.
- *Eficiencia:* proporcion util frente a fuerza ideal.

=== Graficas
- *Fuerza vs desplazamiento:* muestra respuesta del material durante compactacion.
- *Trabajo acumulado vs tiempo:* energia transferida durante el ciclo.
- *Eficiencia vs friccion:* sensibilidad del sistema a perdidas por roce.
- *Comparativa por material:* contraste papel/plastico/metal en misma condicion base.

=== Simulador de escenarios
- *Educativo:* dinamica de uso en instituciones.
- *Comercial:* carga variable por horarios y temporadas.
- *Municipal:* optimizacion de rutas de recoleccion.

= 4. Guia de replicacion del proyecto

== 4.1 Requisitos

- Node.js 18+ recomendado.
- npm 9+.
- Git.
- Navegador moderno (Chrome/Edge/Firefox).

== 4.2 Instalacion local

```bash
git clone <url-del-repositorio>
cd compactador-fisica
npm install
npm run dev
```

Luego abre:
`http://localhost:3000`

== 4.3 Build de produccion

```bash
npm run build
npm run start
```

== 4.4 Exportar este manual Typst a PDF

Si tienes Typst CLI instalado:

```bash
typst compile docs/manual_web_compactador.typ docs/manual_web_compactador.pdf
```

== 4.5 Despliegue recomendado (Vercel)

+ Conecta el repositorio a Vercel.
+ Configura framework: Next.js (deteccion automatica).
+ Comando de build: `npm run build`.
+ Directorio de salida: default de Next.js.
+ Publica la app y valida que el render 3D cargue correctamente.

== 4.6 Estructura sugerida para escalar

```txt
app/
components/
  simulation/
  algodoo/
  hero/
  content/
lib/
  physics/
store/
public/
  data/
  models/
docs/
```

= 5. Guia de personalizacion

== 5.1 Agregar nuevos materiales

1. Edita `lib/physics/materials.ts`.
2. Opcional: sincroniza `public/data/materials.json`.
3. Define `yieldForce`, `stiffness`, `efficiencyFactor`, `color`.
4. Verifica impacto en cards, graficas y visual 3D.

== 5.2 Ajustar formulas fisicas

1. Abre `lib/physics/engine.ts`.
2. Modifica funciones puras sin acoplar UI.
3. Mantiene contratos de tipos (`SimulationParams`, `SimulationResults`).
4. Valida el caso base del informe: VM=4 y fuerza ideal ~480 N.

== 5.3 Extender panel o simuladores

- Nuevos inputs: agregar en `SimulationSlider.tsx` y estado en `simulationStore.tsx`.
- Nuevas curvas: crear generador en `engine.ts` y graficar en `AlgodooSection.tsx`.
- Nuevos escenarios: extender enum y catalogo de escenarios.

= 6. QA y checklist de validacion

Antes de publicar cambios, validar:

- [ ] Los controles actualizan todas las vistas en tiempo real.
- [ ] La comparativa de materiales cambia fuerza y curvas de forma visible.
- [ ] La calculadora VM responde correctamente a L1 y L2.
- [ ] La animacion 3D refleja posicion de palanca/compactabilidad.
- [ ] La web funciona en mobile y desktop.
- [ ] `npm run build` termina sin errores.

= 7. Preguntas frecuentes

== No cambia la grafica cuando muevo controles

Verifica que la seccion use `useSimulationStore()` y no datos hardcodeados.

== La fuerza real sale muy baja

Revisa friccion y masa de placa; valores altos reducen fuerza util.

== Quiero mostrar mas teoria

Amplia `PhysicsContentSection.tsx` con nuevos bloques o tabs de contenido.

= 8. Cierre

Esta web combina visualizacion, simulacion y narrativa tecnica para explicar el compactador de forma clara y demostrable. El mismo patron (store global + motor fisico + UI reactiva) permite escalar a nuevos materiales, sensores IoT o modelos fisicos mas avanzados sin rehacer toda la arquitectura.
