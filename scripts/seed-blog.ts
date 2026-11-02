/**
 * Seed: Artículos de Blog Premium.
 *
 * Crea 4 artículos de blog con contenido premium B2B optimizado para SEO.
 * - Autor por defecto: "Star Grow Studio"
 * - Categorías: Branding, Diseño UX/UI, Marketing Digital
 *
 * Idempotente: usa createOrReplace con _ids deterministas.
 *
 * Uso:
 *   node --env-file=.env.local --import tsx scripts/seed-blog.ts
 *   npm run seed:blog
 *
 * Requiere en .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * SANITY_API_WRITE_TOKEN.
 */
import { createClient } from "@sanity/client";
import { COMO_HACER_UNA_PAGINA_WEB_POST } from "../src/sanity/data/comoHacerUnaPaginaWeb";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    `Faltan variables de entorno: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN.\n`
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

/* ───────────────────────── Helpers ───────────────────────── */

type BlockContentItem = {
  style?: string;
  listItem?: string;
  level?: number;
  children: { text: string; marks?: string[] }[];
};

const portableText = (blocks: BlockContentItem[]) =>
  blocks.map((b, i) => ({
    _type: "block",
    _key: `blk-${i.toString().padStart(3, "0")}`,
    style: b.style ?? "normal",
    markDefs: [],
    listItem: b.listItem,
    level: b.level,
    children: b.children.map((c, j) => ({
      _type: "span",
      _key: `spn-${i.toString().padStart(3, "0")}-${j}`,
      text: c.text,
      marks: c.marks ?? [],
    })),
  }));

const p = (text: string) => ({ children: [{ text }] });
const h2 = (text: string) => ({ style: "h2", children: [{ text }] });
const h3 = (text: string) => ({ style: "h3", children: [{ text }] });
const strong = (text: string) => ({ children: [{ text, marks: ["strong"] }] });
const li = (text: string) => ({ listItem: "bullet", children: [{ text }] });
const blockquote = (text: string) => ({ style: "blockquote", children: [{ text }] });

/* ───────────────────────── Aseguramiento de entidades base ───────────────────────── */

async function ensureAuthor() {
  const id = "author.star-grow-studio";
  const existing = await client.fetch<{ _id: string } | null>(`*[_id == $id][0]{ _id }`, { id });
  if (existing) { console.log(`  - Autor ya existe`); return id; }

  await client.create({
    _id: id,
    _type: "author",
    name: "Star Grow Studio",
    slug: { _type: "slug", current: "star-grow-studio" },
    role: "Agencia de Transformacion Digital",
    bio: `En Star Grow Studio transformamos negocios a traves del diseno, la tecnologia y la estrategia digital. Ayudamos a empresas a crecer con soluciones de software a medida, diseno UX/UI, branding, desarrollo web y automatizacion.`,
  });
  console.log(`  V Autor creado`);
  return id;
}

async function ensureCategory(title: string, slug: string, description: string) {
  const id = `category.${slug}`;
  const existing = await client.fetch<{ _id: string } | null>(`*[_id == $id][0]{ _id }`, { id });
  if (existing) { console.log(`  - Categoria "${title}" ya existe`); return id; }

  await client.create({
    _id: id,
    _type: "category",
    title,
    slug: { _type: "slug", current: slug },
    description,
  });
  console.log(`  V Categoria "${title}" creada`);
  return id;
}

/* ───────────────────────── Artículo 1: Logos minimalistas ───────────────────────── */

function buildArticle1(authorId: string, categoryIds: string[]) {
  const slug = `por-que-las-grandes-marcas-usan-logos-sencillos`;
  const id = `post.${slug}`;

  return {
    _id: id,
    _type: "post",
    title: `Por que las grandes marcas usan logos sencillos? La ciencia detras del minimalismo en branding corporativo`,
    slug: { _type: "slug", current: slug },
    excerpt: `Nike, Apple, Google y McDonald's comparten un patron: logos cada vez mas simples. Descubre la estrategia y el retorno detras del minimalismo en branding empresarial.`,
    publishedAt: "2026-07-15T12:00:00Z",
    instagramUrl: "https://www.instagram.com/p/DSTx5ETjt8V/?vrfl=MTBsdW44bXAzbWh5cQ==",
    author: { _type: "reference", _ref: authorId },
    categories: categoryIds.map((c) => ({ _type: "reference", _ref: c })),
    body: portableText([
      h2(`El patron que une a las empresas mas valiosas del planeta`),
      p(`En 1972, Carolyn Davidson cobro 35 dolares por disenar el logo de una empresa de zapatos llamada Nike. El resultado fue un simple swoosh que, medio siglo despues, vale mas de 30 mil millones de dolares. Nike no es la excepcion: es la regla.`),
      p(`Apple paso de un detallado grabado de Isaac Newton a una manzana mordida. Google evoluciono de un logotipo con sombras y texturas a una composicion plana con cuatro colores. Mastercard elimino su nombre del logo y dejo solo dos circulos. Starbucks prescindio del texto. Y la lista continua.`),
      p(`Cuando observamos este patron, surge una pregunta inevitable para cualquier lider empresarial: por que las marcas mas exitosas del mundo invierten millones en simplificar sus logos? Es una moda pasajera del diseno o responde a una logica estrategica profunda?`),
      p(`La respuesta, respaldada por estudios de neuromarketing, psicologia cognitiva y decadas de datos de mercado, es contundente: un logo simple no es una concesion estetica. Es una decision estrategica que impacta directamente en el reconocimiento de marca, la confianza del consumidor y, en ultima instancia, en los resultados del negocio.`),
      p(`En este articulo analizaremos por que el minimalismo en branding no es una tendencia, sino una ventaja competitiva medible, y que lecciones pueden aplicar las empresas B2B -sin importar su tamano- para fortalecer su identidad de marca.`),

      h2(`El costo oculto de un logo complejo`),
      p(`Imaginemos que un cliente potencial ve el logo de tu empresa por primera vez en un anuncio de LinkedIn. Tiene tres segundos para procesar la informacion antes de decidir si hace clic o sigue desplazandose. Si tu logo tiene multiples colores, tipografias decorativas, iconos abstractos y detalles que no se distinguen en un tamano pequeno, ya perdiste esa batalla.`),
      p(`La psicologia cognitiva explica que el cerebro humano procesa imagenes de manera holistica primero y recien luego analiza los detalles. Si la primera impresion visual es confusa, el cerebro etiqueta esa experiencia como "demanda cognitiva alta" y, por instinto de eficiencia, la evita.`),
      strong(`Las empresas con logos complejos enfrentan problemas concretos:`),
      li(`Menor recordacion: un estudio de la Universidad de Vanderbilt encontro que las personas recuerdan formas simples hasta un 40% mas que las complejas.`),
      li(`Mayor costo de impresion y reproduccion: cada color adicional incrementa costos de produccion en merchandising, uniformes y empaques.`),
      li(`Dificultad de escalamiento: un logo detallado se vuelve ilegible en tamanos pequenos como favicons, perfiles de redes sociales o notificaciones push.`),
      li(`Inconsistencia de marca: cuando el logo es complejo, las adaptaciones a diferentes formatos generan versiones inconsistentes que diluyen la identidad.`),
      p(`El costo no es solo de produccion: es de oportunidad. Cada vez que un cliente potencial no logra procesar tu marca por su complejidad visual, estas perdiendo una oportunidad de conexion.`),

      h2(`Lo que realmente comunica un logo minimalista`),
      h3(`1. Confianza y madurez corporativa`),
      p(`Un estudio publicado en el Journal of Brand Management analizo la percepcion de consumidores frente a logos minimalistas versus detallados. Los resultados mostraron que los logos simples se asocian automaticamente con atributos como profesionalismo, confiabilidad y liderazgo en el mercado. En contraste, los logos complejos tendian a percibirse como propios de empresas pequenas o en etapa temprana.`),
      p(`La razon? Asociamos la complejidad visual con inseguridad. Una marca establecida no necesita explicar quien es a traves de multiples elementos decorativos. Su reputacion habla por si sola.`),

      h3(`2. Versatilidad para el ecosistema digital actual`),
      p(`La empresa promedio tiene presencia en al menos 12 canales digitales: sitio web, LinkedIn, Instagram, X/Twitter, YouTube, Google Business, newsletters, apps, plataformas de eventos, marketplaces... Cada canal tiene requisitos de tamano, formato y resolucion distintos.`),
      p(`Un logo simple funciona en todos ellos sin necesidad de adaptaciones forzadas. El swoosh de Nike es reconocible en un billboard de 20 metros y en el costado de una zapatilla. La manzana de Apple funciona igual en una pantalla de 6 pulgadas que en el frontal de una tienda de 500 metros cuadrados.`),

      h3(`3. Facilidad de procesamiento cognitivo`),
      p(`El principio de fluidez perceptual, ampliamente estudiado en neuromarketing, sostiene que las personas prefieren aquello que es facil de procesar mentalmente. Un logo simple se procesa en milisegundos. Esa fluidez genera una sensacion positiva que se transfiere a la percepcion de la marca.`),
      p(`El logo de Google, con sus cuatro colores planos sobre fondo blanco, es un ejemplo perfecto. No hay sombras, no hay degradados, no hay texturas. Solo tipografia y color. Y sin embargo, es uno de los logos mas reconocibles del mundo.`),

      h2(`Los 5 principios del minimalismo estrategico en branding`),
      p(`Simplificar un logo no es quitar elementos al azar. Es un proceso estrategico que requiere comprender que es esencial y que es ruido. Estos son los principios que aplicamos en Star Grow Studio cuando trabajamos en identidad de marca:`),

      h3(`1. Identifica el nucleo irreducible`),
      p(`Todo logo tiene un elemento central que comunica la esencia de la marca. Para Nike es el movimiento. Para Apple es la innovacion (y la referencia biblica al conocimiento). Para Target es la precision. Identifica ese nucleo y preguntate: podemos comunicarlo con menos elementos?`),

      h3(`2. Elimina todo lo decorativo que no comunique`),
      p(`Cada linea, cada color, cada curva debe tener una razon de ser. Si un elemento esta ahi "porque se ve bien" pero no comunica un atributo de la marca, es ruido visual. Los grandes disenadores graficos saben que el verdadero talento no esta en agregar, sino en saber que quitar.`),

      h3(`3. Piensa en blanco y negro primero`),
      p(`Un logo debe funcionar en una sola tinta antes de agregar color. Si tu logo pierde significado sin color, depende del color para comunicar, y eso es una debilidad. Los logos mas iconicos del mundo son perfectamente legibles en escala de grises.`),

      h3(`4. Prueba en el tamano mas pequeno posible`),
      p(`Si tu logo no es reconocible en 32x32 pixeles -el tamano de un favicon-, es demasiado complejo. El 100% de los logos de las empresas Fortune 500 pasan esta prueba.`),

      h3(`5. Disena para la deslealtad de atencion`),
      p(`En 2025, la capacidad de atencion promedio es de 8 segundos. Tu logo no solo compite con otras marcas: compite con notificaciones, correos, mensajes y distracciones constantes. Un logo simple captura la atencion en el instante en que el usuario decide si detenerse o seguir.`),

      h2(`Errores comunes al redisenar un logo corporativo`),
      p(`Muchas empresas caen en la tentacion de redisenar su logo sin una estrategia clara. Estos son los errores mas frecuentes:`),

      h3(`Error #1: Redisenar por moda, no por estrategia`),
      p(`El minimalismo es efectivo cuando responde a una necesidad de comunicacion, no porque "esta de moda". Si tu logo actual comunica efectivamente los valores de tu marca y funciona bien en todos los canales, no necesitas cambiarlo solo por seguir tendencias.`),

      h3(`Error #2: Perder el reconocimiento acumulado`),
      p(`El capital de marca (brand equity) no se construye en un dia. Cuando Gap rediseno su logo en 2010, la reaccion negativa fue tan intensa que volvieron al original en solo una semana. El costo estimado de ese error fue de 100 millones de dolares en valor de marca perdido.`),

      h3(`Error #3: Simplificar sin un sistema visual de respaldo`),
      p(`Un logo minimalista no es una marca minimalista. Si simplificas el logo pero no construyes un sistema visual completo que lo acompanie -tipografia, paleta de colores, iconografia, fotografia-, tu marca se vera generica en lugar de sofisticada.`),

      h3(`Error #4: Ignorar a tu audiencia real`),
      p(`El rediseno de un logo debe considerar a tus clientes actuales, no solo a los potenciales. Un cambio demasiado radical puede alienar a tu base de clientes mas leales. La evolucion gradual -como la de Mastercard o Shell- suele ser mas efectiva que la revolucion.`),

      h2(`El retorno de inversion de un logo bien disenado`),
      p(`Un logo minimalista bien ejecutado genera retornos tangibles:`),
      li(`Reduccion de costos de produccion: menos tintas, menos versiones, menos adaptaciones.`),
      li(`Mayor velocidad de reconocimiento: estudios de eye-tracking muestran que los logos simples se reconocen 2.5 veces mas rapido que los complejos.`),
      li(`Mejor rendimiento en digital: un logo simple pesa menos, carga mas rapido y se ve mejor en cualquier resolucion.`),
      li(`Mayor consistencia de marca: cuando el logo es simple, es mas facil mantener la coherencia visual en todos los puntos de contacto.`),
      p(`El logo de Nike le costo 35 dolares en 1972. Hoy, solo el valor de la marca Nike supera los 30 mil millones de dolares. Por supuesto, el logo no es el unico factor, pero es un recordatorio poderoso de que la simpleza bien ejecutada es una de las inversiones mas rentables que una empresa puede hacer.`),

      h2(`Conclusion: menos diseno, mas estrategia`),
      p(`El minimalismo en branding no es una limitacion creativa. Es una disciplina estrategica que obliga a las empresas a definir con claridad quienes son, que comunican y a quien le hablan. Un logo simple no es facil de disenar: es dificil. Requiere valentia para eliminar, rigor para justificar cada elemento y vision para pensar en como se vera esa marca en los proximos 20 anos, no solo en la proxima campania.`),
      p(`En Star Grow Studio ayudamos a empresas a construir identidades de marca que no solo se ven bien, sino que funcionan estrategicamente: comunican, generan confianza y se adaptan a un ecosistema digital en constante evolucion.`),
      p(`Tu logo probablemente necesita una evolucion. La pregunta no es si debes simplificarlo, sino si estas listo para tomar una decision estrategica que impactara tu marca durante la proxima decada.`),
      blockquote(`"Un logo no necesita decir lo que la empresa hace. Necesita comunicar quien es." - Paul Rand, disenador de los logos de IBM, UPS y ABC.`),
      p(`Si estas considerando fortalecer tu identidad de marca, podemos ayudarte a disenar una estrategia visual que impulse tu posicionamiento. Agenda un diagnostico gratuito con nuestro equipo.`),
    ]),
    seo: {
      metaTitle: `Por que las grandes marcas usan logos minimalistas | Branding Estrategico`,
      metaDescription: `El minimalismo en branding corporativo no es una moda: es estrategia. Descubre la psicologia, el ROI y los principios del diseno de logos que posicionan a las empresas mas valiosas del mundo.`,
      ogTitle: `Por que Nike, Apple y Google usan logos minimalistas? La estrategia detras del branding simple`,
      ogDescription: `Analisis profundo sobre por que las marcas mas valiosas del mundo simplifican sus logos. Psicologia cognitiva, neuromarketing y principios de diseno aplicados al branding empresarial.`,
    },
  };
}

/* ───────────────────────── Artículo 2: Diseño que no convence ───────────────────────── */

function buildArticle2(authorId: string, categoryIds: string[]) {
  const slug = `mi-diseno-no-convence-a-nadie-como-solucionarlo`;
  const id = `post.${slug}`;

  return {
    _id: id,
    _type: "post",
    title: `Mi diseno no convence a nadie: las 5 razones ocultas por las que tu producto digital no conecta con los usuarios`,
    slug: { _type: "slug", current: slug },
    excerpt: `Inviertes en diseno pero los resultados no llegan. Analizamos las causas reales -basadas en datos- por las que tu producto digital no conecta con los usuarios y como resolverlo.`,
    publishedAt: "2026-07-10T12:00:00Z",
    instagramUrl: "https://www.instagram.com/p/DTOLE5TEpH-/?obrf=dm5pejJwOWNxdng4",
    author: { _type: "reference", _ref: authorId },
    categories: categoryIds.map((c) => ({ _type: "reference", _ref: c })),
    body: portableText([
      h2(`El diagnostico que nadie quiere hacer`),
      p(`Tu equipo de diseno entrega interfaces impecables. Los stakeholders las aprueban. El desarrollo las implementa con precision. Pero los usuarios no responden. Las tasas de conversion se estancan, el tiempo en pagina disminuye y los reportes de soporte se acumulan con preguntas que el diseno deberia responder.`),
      p(`Suena familiar? No estas solo. Segun un estudio de Forrester Research, el 70% de los proyectos de transformacion digital fracasan, y una de las causas principales es la falta de adopcion por parte de los usuarios. El problema no es que el diseno sea feo: es que no esta resolviendo el problema correcto.`),
      p(`En mas de una decada trabajando con empresas de todos los tamanos, hemos identificado cinco razones recurrentes por las que un diseno bien ejecutado no logra conectar con los usuarios. Y lo mas importante: como solucionarlas.`),

      h2(`Razon #1: Estas disenando para stakeholders, no para usuarios`),
      h3(`El sesgo de la aprobacion interna`),
      p(`Es el error mas comun y mas costoso. El diseno se presenta ante comites internos que lo aprueban basandose en criterios esteticos, politicos o emocionales. "Me gusta mas este color", "el logo deberia ser mas grande", "ponlo mas moderno". Pero ninguno de esos comentarios proviene de la persona que realmente usara el producto.`),
      p(`Cuando el diseno se valida solo con stakeholders, el resultado es un producto que encanta a los directivos pero frustra a los usuarios. El sindrome del "diseno por comite" genera interfaces recargadas, inconsistentes y alejadas de las necesidades reales.`),

      h3(`La solucion: investigacion empirica antes de disenar`),
      p(`El diseno basado en evidencia comienza con investigacion de usuarios reales. No con suposiciones. No con "personas" inventadas en un taller de dos horas. Con entrevistas, observacion y datos de comportamiento.`),
      li(`Entrevistas contextuales: observa a tus usuarios en su entorno real. No preguntes que hacen, miralos hacerlo.`),
      li(`Analisis de datos existentes: tu producto ya genera datos. Analiza donde abandonan los usuarios, donde se pierden, donde dudan.`),
      li(`Pruebas de usabilidad tempranas: prueba prototipos de baja fidelidad con usuarios reales antes de invertir en diseno visual.`),
      p(`Cuando la investigacion precede al diseno, las decisiones dejan de ser opiniones y se convierten en datos. El error se detecta en un prototipo de papel, no en produccion.`),

      h2(`Razon #2: Ignoras la carga cognitiva de tus usuarios`),
      h3(`El costo invisible de la complejidad`),
      p(`Cada elemento en una interfaz -un boton, un campo de formulario, una opcion de menu- impone una demanda cognitiva en el usuario. Cuando esa demanda supera la capacidad de procesamiento, el usuario se siente abrumado y abandona.`),
      p(`La teoria de la carga cognitiva, formulada por John Sweller en los anos 80, distingue tres tipos: intrinseca (complejidad inherente de la tarea), relevante (esfuerzo para construir modelos mentales) y extrana (esfuerzo desperdiciado por un mal diseno). El diseno UX de calidad minimiza la carga extrana.`),

      h3(`Ejemplo real: el poder de la reduccion`),
      p(`Cuando Expedia elimino un solo campo innecesario de su formulario de reserva -"Company Name"-, la compania reporto un incremento de 12 millones de dolares en ganancias anuales. Un campo que no aportaba valor generaba friccion suficiente para que miles de usuarios abandonaran la compra.`),
      p(`La leccion es clara: cada elemento adicional en tu interfaz tiene un costo. Preguntate: este elemento ayuda al usuario a completar su tarea o solo satisface una necesidad interna?`),

      h2(`Razon #3: No hay consistencia ni sistema de diseno`),
      h3(`El costo de la improvisacion visual`),
      p(`Cuando no existe un sistema de diseno, cada pantalla se disena como un caso aislado. El resultado es una experiencia inconexa donde los botones cambian de color segun la seccion, los formularios tienen estilos diferentes y la navegacion se comporta de manera impredecible.`),
      p(`La inconsistencia genera desconfianza. El usuario que aprende a usar una funcionalidad y descubre que la misma funcionalidad se comporta diferente en otra seccion del producto pierde la confianza en el sistema completo.`),

      h3(`La solucion: implementar un Design System`),
      p(`Un sistema de diseno no es una guia de estilos. Es una biblioteca viva de componentes, patrones y principios que garantizan consistencia, aceleran el desarrollo y facilitan el mantenimiento.`),
      li(`Componentes reutilizables con todas sus variantes documentadas.`),
      li(`Principios de diseno claros que guian las decisiones del equipo.`),
      li(`Documentacion accesible para disenadores y desarrolladores.`),
      li(`Versionamiento y actualizacion continua.`),
      p(`Empresas como Airbnb, Uber y Shopify invirtieron millones en sus sistemas de diseno. Pero no necesitas el presupuesto de un unicornio para empezar. Un sistema de diseno modular, bien documentado y adoptado por tu equipo ya genera beneficios desde el primer sprint.`),

      h2(`Razon #4: No mides el impacto del diseno en el negocio`),
      h3(`El diseno sin metricas es arte, no estrategia`),
      p(`Si no puedes medir el impacto de tus decisiones de diseno, no sabes si estan funcionando. Y si no sabes si estan funcionando, cualquier resultado -bueno o malo- es producto del azar.`),
      p(`Las metricas de UX no son solo vanity metrics como "me gusta" o "tiempo en pagina". Son indicadores que conectan directamente con resultados de negocio:`),
      li(`Tasa de finalizacion de tareas: que porcentaje de usuarios completa exitosamente la tarea principal?`),
      li(`Tasa de error: cuantos usuarios cometen errores al usar tu interfaz?`),
      li(`Tiempo de tarea: cuanto tiempo tardan los usuarios en completar una accion clave?`),
      li(`Satisfaccion (SUPR-Q, NPS): como califican los usuarios su experiencia?`),
      li(`Tasa de abandono en formularios: donde pierdes usuarios en tus flujos de conversion?`),
      p(`Cuando estas metricas mejoran, tu negocio mejora. Un estudio de McKinsey encontro que las empresas con culturas de diseno solidas superan a sus competidores en un 2:1 en crecimiento de ingresos.`),

      h2(`Razon #5: El diseno y la estrategia de negocio no hablan el mismo idioma`),
      h3(`El divorcio entre UX y objetivos comerciales`),
      p(`Con demasiada frecuencia, el equipo de diseno trabaja en un silo, entregando soluciones que resuelven problemas de usabilidad pero no avanzan los objetivos de negocio. Y el equipo de negocio define estrategias que ignoran las necesidades del usuario.`),
      p(`El diseno que convence no es el que se ve mejor. Es el que logra el balance entre tres variables: deseabilidad (el usuario lo quiere?), viabilidad (el negocio lo puede sostener?) y factibilidad (la tecnologia lo puede construir?).`),

      h3(`El framework Jobs to Be Done como puente`),
      p(`El framework JTBD (Trabajos por Hacer) ayuda a alinear diseno y negocio alrededor de una pregunta comun: que trabajo esta tratando de completar el usuario cuando usa tu producto? No importa si es una app de banca movil o un panel de analisis: el usuario esta "contratando" tu producto para hacer un trabajo.`),
      p(`Cuando diseno y negocio comparten esta perspectiva, las decisiones se toman en funcion de resolver ese trabajo de la manera mas efectiva, no de imponer una vision estetica o cumplir un objetivo numerico arbitrario.`),

      h2(`Como empezar a disenar experiencias que realmente convencen`),
      p(`Si reconociste tu producto en alguna de estas cinco razones, el camino hacia adelante es claro:`),
      li(`Paso 1: Deten el diseno basado en opiniones. Empieza con investigacion de usuarios.`),
      li(`Paso 2: Reduce la carga cognitiva. Elimina todo lo que no aporte valor directo al usuario.`),
      li(`Paso 3: Construye un sistema de diseno. La consistencia genera confianza.`),
      li(`Paso 4: Define metricas de UX que se conecten con objetivos de negocio.`),
      li(`Paso 5: Alinea diseno y estrategia alrededor del usuario real.`),
      p(`No necesitas redisenar todo desde cero. Muchas veces, los mayores impactos vienen de cambios pequenos pero estrategicos: eliminar un campo de formulario, reorganizar una navegacion, mejorar el contraste de un boton.`),

      h2(`Conclusion: el diseno que convence nace de la evidencia, no de la intuicion`),
      p(`El diseno efectivo no es cuestion de talento creativo. Es cuestion de metodo. Cuando entiendes a tus usuarios, reduces la complejidad, mantienes consistencia, mides resultados y alineas diseno con negocio, el diseno no solo convence: transforma.`),
      p(`En Star Grow Studio aplicamos este enfoque metodico en cada proyecto. No disenamos para impresionar comites internos. Disenamos para que los usuarios encuentren valor, los negocios crezcan y la tecnologia funcione.`),
      p(`Si tu producto digital no esta generando los resultados que esperas, probablemente el problema no es tu diseno. Es como lo estas abordando. Conversemos sobre como podemos ayudarte a diagnosticar y resolverlo.`),
    ]),
    seo: {
      metaTitle: `Tu diseno no convence? 5 razones y soluciones basadas en UX | Star Grow Studio`,
      metaDescription: `El 70% de los proyectos digitales fracasan por falta de adopcion. Descubre las causas reales por las que tu diseno no conecta con los usuarios y como resolverlas con metodologia UX.`,
      ogTitle: `Mi diseno no convence a nadie: diagnostico UX para empresas que quieren resultados reales`,
      ogDescription: `Analisis basado en investigacion y datos sobre por que los productos digitales fallan en conectar con usuarios. Carga cognitiva, sistemas de diseno y metricas de UX explicadas para tomadores de decisiones.`,
    },
  };
}

/* ───────────────────────── Artículo 3: Estrategia de contenidos ───────────────────────── */

function buildArticle3(authorId: string, categoryIds: string[]) {
  const slug = `que-contenido-subir-para-atraer-mas-publico-b2b`;
  const id = `post.${slug}`;

  return {
    _id: id,
    _type: "post",
    title: `Que contenido publicar para atraer mas clientes B2B? Los 5 pilares de una estrategia de contenidos que genera leads cualificados`,
    slug: { _type: "slug", current: slug },
    excerpt: `Publicas contenido pero no generas leads. Descubre los cinco pilares del content marketing B2B para atraer, educar y convertir clientes de alto valor.`,
    publishedAt: "2026-07-05T12:00:00Z",
    instagramUrl: "https://www.instagram.com/p/DST6QesDq_C/?mdxt=MWluODk0Zzg4Zngxbw==",
    author: { _type: "reference", _ref: authorId },
    categories: categoryIds.map((c) => ({ _type: "reference", _ref: c })),
    body: portableText([
      h2(`El contenido no es el rey: la estrategia es el rey`),
      p(`Si hay una frase que ha causado mas dano que beneficio en el marketing digital, es "el contenido es el rey". Porque el contenido sin estrategia no es contenido: es ruido.`),
      p(`Cada dia se publican mas de 7 millones de articulos de blog. Millones de videos, podcasts, infografias y posts en redes sociales. En ese oceano de informacion, tu contenido compite no solo con tu competencia directa, sino con Netflix, con las noticias, con los memes y con todo lo que capta la atencion de tu audiencia.`),
      p(`El resultado inevitable: la mayoria del contenido B2B simplemente no funciona. Se publica, se comparte internamente con entusiasmo y desaparece en el abismo digital sin generar leads, sin construir autoridad y sin mover indicadores.`),
      p(`Pero hay empresas que si lo logran. HubSpot construyo un imperio de 3 mil millones de dolares basado en contenido. Shopify educa a millones de emprendedores. Stripe convirtio documentacion tecnica en una maquina de adquisicion de clientes. Que hacen diferente?`),
      p(`La respuesta esta en una estructura de cinco pilares que, bien ejecutada, transforma tu estrategia de contenidos de un centro de costos a un motor de crecimiento. Veamos cada uno en detalle.`),

      h2(`Pilar #1: Contenido educativo de valor`),
      h3(`Por que funciona el contenido educativo en B2B`),
      p(`El ciclo de compra B2B es largo, complejo e involucra a multiples tomadores de decision. Antes de que un CEO, un director de marketing o un CTO considere contratar un servicio, necesita entender el problema, evaluar soluciones y construir un caso de negocio interno.`),
      p(`El contenido educativo acelera ese proceso. Cuando tu empresa publica contenido que educa genuinamente -sin pedir nada a cambio-, construyes autoridad, generas confianza y te posicionas como la opcion logica cuando llega el momento de comprar.`),

      h3(`Como implementarlo correctamente`),
      li(`Identifica las preguntas reales de tus clientes: no las que tu crees que tienen. Habla con tu equipo de ventas y soporte para entender que dudas, objeciones y confusiones aparecen en cada etapa del ciclo de compra.`),
      li(`Crea contenido que responda esas preguntas de forma exhaustiva: guias, tutoriales, comparativas, analisis. No superficial: profundo. El contenido educativo mediocre no construye autoridad, la erosiona.`),
      li(`Usa datos y ejemplos reales: la teoria sin evidencia no convence a nadie. Incluye estudios de caso, estadisticas relevantes y ejemplos de implementacion.`),
      li(`Optimiza para la intencion de busqueda: tu contenido educativo debe aparecer cuando tu prospecto busca activamente la respuesta. Eso significa SEO bien ejecutado desde el primer parrafo.`),

      h3(`Ejemplo practico`),
      p(`Supongamos que ofreces desarrollo de software a medida. En lugar de publicar "Beneficios del software a medida" (contenido generico que nadie busca), publica "Cuando vale la pena migrar de un ERP generico a un sistema a medida? [Guia de decision para CFOs]". Eso responde una pregunta real que un tomador de decisiones esta haciendose.`),

      h2(`Pilar #2: Contenido de entretenimiento`),
      h3(`El rol del entretenimiento en el marketing B2B`),
      p(`Contenido entretenido en B2B? Suena contradictorio, pero es uno de los pilares mas infrautilizados y con mayor potencial. El cerebro humano no deja de ser humano cuando entra a la oficina. Las decisiones de compra B2B las toman personas, no organizaciones abstractas.`),
      p(`El contenido entretenido -bien ejecutado- genera un efecto poderoso: rompe la barrera de la formalidad corporativa y humaniza tu marca. Cuando una empresa demuestra que puede ser inteligente y divertida al mismo tiempo, la percepcion de confianza y cercania aumenta significativamente.`),

      h3(`Formatos que funcionan en B2B`),
      li(`Memes de nicho: un meme bien hecho sobre un dolor especifico de tu audiencia genera mas engagement que cualquier whitepaper.`),
      li(`Comparaciones y parodias: "Lo que tu equipo de desarrollo quiere decir vs. lo que dice en la reunion" - contenido que tu audiencia comparte porque se identifica.`),
      li(`Detras de escena: muestra el proceso real de tu trabajo. El "how it's made" nunca pasa de moda y humaniza tu marca.`),
      li(`Storytelling visual: historias cortas con moraleja profesional. Formato perfecto para Reels, TikTok o LinkedIn.`),

      h3(`La regla de oro`),
      p(`El contenido de entretenimiento no necesita ser gracioso. Necesita ser humano. La autenticidad y la identificacion generan conexion, y la conexion es el primer paso hacia la confianza que eventualmente se traduce en una relacion comercial.`),

      h2(`Pilar #3: Contenido inspiracional`),
      h3(`Por que las empresas necesitan inspiracion, no solo datos`),
      p(`Los datos convencen a la mente racional. La inspiracion moviliza a la accion. En el contexto B2B, el contenido inspiracional cumple una funcion estrategica: muestra lo que es posible.`),
      p(`Cuando publicas un caso de exito detallado -con desafios reales, decisiones dificiles y resultados medibles-, no solo demuestras competencia tecnica. Estas vendiendo una vision de futuro. Estas diciendo: "esto que hoy parece imposible, es alcanzable".`),

      h3(`Como estructurar contenido inspiracional efectivo`),
      li(`Elige historias reales con resultados medibles: nada inspira mas que un antes y un despues concreto.`),
      li(`Muestra el proceso, no solo el resultado: los obstaculos superados son mas poderosos que los logros finales.`),
      li(`Incluye el factor humano: como cambio la dinamica del equipo? que aprendieron? que harian diferente?`),
      li(`Conecta con aspiraciones universales: crecimiento, eficiencia, libertad, reconocimiento, impacto.`),
      p(`El contenido inspiracional bien hecho convierte a tu empresa en un referente al que tu audiencia aspira a parecerse. Y las empresas hacen negocios con quienes admiran.`),

      h2(`Pilar #4: Contenido de identidad de marca`),
      h3(`El contenido que construye una tribu`),
      p(`El contenido de identidad no trata de lo que haces, sino de quien eres. Son los valores, la cultura, el proposito y la personalidad de tu marca. Es el contenido que responde a la pregunta: "por que deberia importarme tu empresa?"`),
      p(`En un mercado donde la mayoria de las agencias de transformacion digital ofrecen servicios similares, lo que te diferencia no son tus servicios: es tu identidad. Como piensas, como trabajas, que valoras, a quien eliges como cliente.`),

      h3(`Tipos de contenido de identidad que funcionan`),
      li(`Manifiestos: declaraciones claras de principios y valores. En que crees como empresa? que practicas rechazas?`),
      li(`Cultura de trabajo: como es trabajar contigo. Procesos, herramientas, dinamicas de equipo. La cultura atrae talento y clientes alineados.`),
      li(`Seleccion de clientes: a quien eliges y por que? Un posicionamiento claro atrae a los clientes correctos y disuade a los que no encajan.`),
      li(`Detras del diseno/desarrollo: el proceso creativo y tecnico de tu trabajo. Muestra la artesania detras del resultado final.`),

      h2(`Pilar #5: Contenido de tendencias y actualidad`),
      h3(`El arte de cabalgar la ola informativa`),
      p(`El contenido de tendencias aprovecha el interes momentaneo del mercado alrededor de un tema relevante. No se trata de publicar por publicar cuando algo se vuelve viral, sino de conectar tu experiencia con conversaciones que ya estan ocurriendo.`),

      h3(`Como hacerlo bien (sin parecer oportunista)`),
      li(`Aporta una perspectiva unica: no repitas lo que todos estan diciendo. Anade tu experiencia y analisis.`),
      li(`Se rapido pero riguroso: el contenido de tendencias tiene fecha de caducidad. Pero la velocidad no debe sacrificar la calidad.`),
      li(`Conecta con tu audiencia: no todas las tendencias son relevantes para tu nicho. Elige las que realmente importan a tus clientes.`),
      li(`Usa datos y predicciones: el contenido de tendencias mas valioso es el que ayuda a tu audiencia a prepararse para el futuro.`),

      h2(`Como integrar los 5 pilares en una estrategia coherente`),
      p(`Tener cinco pilares no significa publicar cinco tipos de contenido al azar. Significa construir un calendario editorial balanceado donde cada pilar cumple un rol especifico en el journey del cliente:`),
      li(`Educativo: atraccion (top of funnel). Resuelve dudas iniciales y construye autoridad.`),
      li(`Entretenimiento: conexion (top/middle). Humaniza la marca y genera comunidad.`),
      li(`Inspiracional: consideracion (middle). Muestra el destino posible y genera deseo.`),
      li(`Identidad: diferenciacion (middle/bottom). Explica por que elegirte a ti.`),
      li(`Tendencias: relevancia (todas las etapas). Demuestra que estas al dia y que tu expertise es vigente.`),
      p(`La proporcion ideal varia segun tu industria y audiencia, pero una regla general util es: 40% educativo, 20% entretenimiento, 20% inspiracional, 10% identidad, 10% tendencias.`),

      h2(`Conclusion: de publicar contenido a construir una maquina de atraccion`),
      p(`El contenido no es un fin en si mismo. Es el vehiculo para construir autoridad, generar confianza y atraer clientes que ya estan buscando lo que tu ofreces. Pero solo si esta respaldado por una estrategia clara que responde a las necesidades reales de tu audiencia en cada etapa de su proceso de decision.`),
      p(`Los cinco pilares que hemos explorado no son teoria abstracta. Son principios probados por las empresas que han logrado convertir el contenido en su canal de crecimiento mas rentable.`),
      p(`En Star Grow Studio trabajamos con empresas B2B para disenar estrategias de contenido que no solo atraen visitas, sino que generan leads cualificados y acortan el ciclo de venta. Si tu contenido actual no esta rindiendo como deberia, probablemente el problema no es lo que dices, sino como lo estas estructurando.`),
      p(`Conversemos sobre como podemos ayudarte a transformar tu contenido en un motor de crecimiento para tu negocio.`),
    ]),
    seo: {
      metaTitle: `Estrategia de Contenidos B2B: Los 5 Pilares para Atraer Clientes | Star Grow Studio`,
      metaDescription: `Descubre los cinco pilares del content marketing B2B: educativo, entretenimiento, inspiracional, identidad y tendencias. Como implementarlos para atraer leads cualificados y acortar el ciclo de venta.`,
      ogTitle: `Que contenido publicar para atraer mas clientes B2B? Guia completa de los 5 pilares estrategicos`,
      ogDescription: `Aprende a estructurar una estrategia de contenidos B2B basada en 5 pilares probados: educativo, entretenimiento, inspiracional, identidad y tendencias. Incluye ejemplos y metricas.`,
    },
  };
}

/* ───────────────────────── Artículo 4: 4 tips UX/UI ───────────────────────── */

function buildArticle4(authorId: string, categoryIds: string[]) {
  const slug = `4-tips-de-diseno-ux-ui-que-deberias-aplicar-en-tu-producto-digital`;
  const id = `post.${slug}`;

  return {
    _id: id,
    _type: "post",
    title: `4 tips de diseno UX/UI que deberias aplicar hoy en tu producto digital (basados en ciencia y datos de conversion)`,
    slug: { _type: "slug", current: slug },
    excerpt: `Pequenos cambios en tu interfaz generan grandes impactos en conversion y retencion. Cuatro principios UX/UI respaldados por psicologia cognitiva y casos reales de negocio.`,
    publishedAt: "2026-06-28T12:00:00Z",
    instagramUrl: "https://www.instagram.com/p/DURwu4AjuCX/?dlrf=NzZ1OWUzb3U0eHdm",
    author: { _type: "reference", _ref: authorId },
    categories: categoryIds.map((c) => ({ _type: "reference", _ref: c })),
    body: portableText([
      h2(`Cuando el diseno deja de ser estetica y se convierte en estrategia`),
      p(`Hay una idea erronea que persiste en muchas empresas: que el diseno UX/UI es un costo estetico, un gasto necesario para "que se vea bonito". Quienes piensan asi suelen ser los mismos que se preguntan por que su producto digital no convierte, por que los usuarios lo abandonan o por que el equipo de soporte esta saturado de preguntas basicas.`),
      p(`La realidad es que el diseno UX/UI -bien ejecutado- es una de las inversiones con mayor retorno en el mundo digital. Cada dolar invertido en UX genera un retorno de entre 2 y 100 dolares, segun Forbes. Y no hablamos de estetica: hablamos de decisiones de diseno respaldadas por psicologia cognitiva, principios de accesibilidad y datos de comportamiento.`),
      p(`A continuacion, cuatro tips de diseno UX/UI que cualquier empresa puede aplicar hoy mismo para mejorar la experiencia de sus usuarios y, como consecuencia directa, sus resultados de negocio.`),

      h2(`Tip #1: La Ley de Fitts aplicada a tus botones y CTAs`),
      h3(`El principio`),
      p(`La Ley de Fitts, formulada por Paul Fitts en 1954, establece que el tiempo para alcanzar un objetivo esta en funcion de la distancia al objetivo y el tamano del mismo. En terminos simples: mientras mas grande y mas cerca este un elemento, mas rapido y facil sera interactuar con el.`),
      p(`En el contexto digital, esto se traduce en una regla simple pero poderosa: los elementos de accion principales deben ser grandes, estar cerca del area de interaccion natural del usuario y tener suficiente espacio alrededor para evitar errores de click.`),

      h3(`La ciencia detras`),
      p(`Estudios de eye-tracking muestran que el 80% del tiempo de visualizacion en una pagina se concentra en la mitad superior izquierda de la pantalla. Los botones de accion principales deben ubicarse en esa zona de atencion natural, no al fondo de la pagina despues de un muro de texto.`),
      p(`Ademas, el tamano minimo recomendado para objetivos tactiles en interfaces moviles es de 48x48 pixeles (Material Design) o 44x44 pixeles (Apple HIG). Por debajo de ese umbral, la tasa de error aumenta significativamente.`),

      h3(`Como aplicarlo hoy`),
      li(`Identifica la accion principal de cada pantalla. Que quieres que el usuario haga? Un solo CTA principal, no cinco.`),
      li(`Aumenta el tamano del boton principal. Si hoy mide 40px de alto, pruebalo a 56px. Mide el impacto en conversion.`),
      li(`Reduce la distancia entre el contenido que motiva la accion y el boton. No separes el argumento del CTA.`),
      li(`Anade espacio alrededor del boton para evitar clics accidentales en elementos cercanos.`),

      h2(`Tip #2: El principio de Jakob y la consistencia con los modelos mentales`),
      h3(`El principio`),
      p(`El principio de Jakob, formulado por Jakob Nielsen, establece que los usuarios pasan la mayor parte de su tiempo en otros sitios web. Eso significa que llegan a tu producto con expectativas formadas por su experiencia acumulada en otras plataformas.`),
      p(`Cuando tu diseno se desvia de esos patrones establecidos -un carrito de compras que no esta en la esquina superior derecha, un logo que no lleva al home, un menu de navegacion con un comportamiento inesperado-, estas forzando al usuario a aprender algo nuevo. Y ese esfuerzo cognitivo adicional se traduce en friction, errores y abandono.`),

      h3(`La ciencia detras`),
      p(`La psicologia cognitiva explica esto a traves de los modelos mentales: representaciones internas que construimos a partir de nuestra experiencia para predecir como funcionan las cosas. Cuando un diseno coincide con el modelo mental del usuario, la interaccion es fluida y casi inconsciente. Cuando no, el usuario debe detenerse, pensar y adaptarse.`),
      p(`Un estudio de Google encontro que los usuarios juzgan la estetica de un sitio web en 1/50 de segundo (50 milisegundos). Pero no solo juzgan la estetica: tambien forman expectativas sobre como va a funcionar. Si el diseno visual es atractivo pero el comportamiento no coincide con lo esperado, la confianza se rompe.`),

      h3(`Como aplicarlo hoy`),
      li(`Audita tu producto contra los patrones estandar de tu industria. Tu navegacion sigue convenciones? Los iconos son reconocibles?`),
      li(`Realiza pruebas de usabilidad con usuarios que nunca han visto tu producto. Observa donde dudan, donde hacen clic por instinto.`),
      li(`Documenta los modelos mentales de tu audiencia. Si tu mercado objetivo son CFOs, tus patrones deben alinearse con las herramientas financieras que usan a diario.`),
      li(`Innovacion si, pero donde importa. No innoves en la navegacion basica. Innova en la propuesta de valor.`),

      h2(`Tip #3: La jerarquia visual como guia silenciosa`),
      h3(`El principio`),
      p(`La jerarquia visual es la organizacion de los elementos en una interfaz segun su importancia. No todos los elementos deben tener el mismo peso visual. Si todo es importante, nada lo es.`),
      p(`Una jerarquia visual efectiva guia al usuario a traves del contenido de forma natural, llevando su atencion primero a lo mas importante, luego a lo secundario y finalmente a los detalles. Sin instrucciones, sin tutoriales, sin ayuda contextual.`),

      h3(`La ciencia detras`),
      p(`La psicologia de la Gestalt nos engana que el cerebro humano busca patrones y relaciones entre elementos visuales. Los principios de proximidad (elementos cercanos se perciben como relacionados), similitud (elementos similares se perciben como grupo) y figura-fondo (distinguir el elemento principal del fondo) son la base de toda jerarquia visual efectiva.`),
      p(`Un estudio del Nielsen Norman Group encontro que los usuarios escanean las paginas en patrones predecibles: el patron F (horizontal en la parte superior, luego escaneo vertical por la izquierda) es el mas comun en contenido textual. El patron Z es mas comun en paginas con poco texto y mucho contenido visual. Conocer estos patrones permite disenar jerarquias que trabajen con el comportamiento natural del usuario, no en su contra.`),

      h3(`Como aplicarlo hoy`),
      li(`Define un orden de importancia para cada pantalla: que debe ver el usuario primero, segundo y tercero? Disena en ese orden.`),
      li(`Usa el tamano, el color, el contraste y el espaciado como herramientas de jerarquia. Lo mas importante debe ser visualmente dominante.`),
      li(`Elimina elementos que compiten por atencion. Si tienes tres elementos con el mismo peso visual, ninguno esta guiando al usuario.`),
      li(`Prueba con mapas de calor (heatmaps) para verificar que los usuarios estan viendo lo que quieres que vean.`),

      h2(`Tip #4: Accesibilidad digital como motor de negocio`),
      h3(`El principio`),
      p(`La accesibilidad digital no es solo un requisito legal o una consideracion etica. Es una decision estrategica con impacto directo en los resultados del negocio. Un diseno accesible es un diseno mejor para todos los usuarios, no solo para personas con discapacidades.`),

      h3(`La ciencia detras`),
      p(`Aproximadamente el 15% de la poblacion mundial tiene alguna forma de discapacidad, segun la Organizacion Mundial de la Salud. En Estados Unidos, las demandas por incumplimiento de accesibilidad web aumentaron un 300% entre 2013 y 2023. Pero el argumento de negocio va mas alla de evitar demandas:`),
      li(`Las pautas de accesibilidad (WCAG 2.1/2.2) mejoran el SEO. Los sitios accesibles tienen mejor estructura semantica, textos alternativos y navegacion clara, todos factores que Google premia.`),
      li(`El contraste suficiente no solo ayuda a personas con baja vision: mejora la legibilidad en exteriores, con luz solar directa o en pantallas de baja calidad.`),
      li(`Los subtitulos en videos no solo ayudan a personas sordas: el 85% de los videos en redes sociales se ven sin sonido.`),
      li(`La navegacion por teclado no solo beneficia a personas con discapacidades motoras: los power users prefieren atajos de teclado y navegacion eficiente.`),

      h3(`Como aplicarlo hoy`),
      li(`Verifica el contraste de color. Usa herramientas como WebAIM Contrast Checker. El ratio minimo WCAG AA es 4.5:1 para texto normal y 3:1 para texto grande.`),
      li(`Anade texto alternativo descriptivo a todas las imagenes. No "foto-001.jpg", sino "Grafico que muestra el incremento del 40% en conversion despues de implementar el nuevo diseno UX".`),
      li(`Asegura que toda la funcionalidad sea operable por teclado. Si un usuario no puede navegar tu sitio solo con el teclado, no es accesible.`),
      li(`Usa etiquetas semanticas HTML correctas. No divs para botones. No spans para titulos. La semantica importa para lectores de pantalla.`),

      h2(`El impacto medible de estos 4 tips`),
      p(`No son teoria. Son principios que han demostrado impacto en empresas reales:`),
      li(`Booking.com aumento su tasa de conversion en 4% simplemente moviendo su CTA principal a una posicion mas prominente siguiendo la Ley de Fitts.`),
      li(`Gov.uk, el portal del gobierno britanico, rediseno su sitio siguiendo principios de accesibilidad y jerarquia visual. El resultado: 80% de satisfaccion del usuario y ahorros estimados de 400 millones de libras anuales.`),
      li(`Apple, Amazon y Google han documentado mejoras significativas en conversion tras aplicar principios de consistencia y modelos mentales.`),

      h2(`Conclusion: el diseno que transforma negocios`),
      p(`Estos cuatro tips no son trucos aislados. Son la punta del iceberg de una disciplina -el diseno UX/UI estrategico- que conecta la psicologia humana con los objetivos de negocio a traves de interfaces bien pensadas.`),
      p(`Aplicar la Ley de Fitts en tus botones, respetar los modelos mentales de tus usuarios, construir jerarquias visuales claras y disenar con accesibilidad no es "hacer diseno bonito". Es tomar decisiones informadas que reducen friction, aumentan conversion y construyen productos que los usuarios quieren usar.`),
      p(`En Star Grow Studio aplicamos estos principios -y muchos mas- en cada proyecto de diseno y desarrollo que emprendemos. Porque sabemos que el diseno no es un adorno: es la interfaz entre tu negocio y tus clientes.`),
      p(`Si quieres llevar tu producto digital al siguiente nivel, conversemos sobre como podemos ayudarte a aplicar diseno estrategico que genere resultados medibles para tu negocio.`),
    ]),
    seo: {
      metaTitle: `4 Tips de Diseno UX/UI Basados en Psicologia Cognitiva y Conversion | Star Grow Studio`,
      metaDescription: `Mejora la experiencia de usuario y las tasas de conversion con estos 4 principios UX/UI: Ley de Fitts, modelos mentales, jerarquia visual y accesibilidad. Basados en ciencia y casos reales.`,
      ogTitle: `4 tips de diseno UX/UI que deberias aplicar hoy (respaldados por ciencia y datos)`,
      ogDescription: `Ley de Fitts, consistencia perceptual, jerarquia visual y accesibilidad: cuatro principios de diseno UX/UI con respaldo cientifico que mejoran la conversion y la satisfaccion del usuario.`,
    },
  };
}

/* ───────────────────────── Imágenes ───────────────────────── */

const articleImages = [
  {
    slug: `por-que-las-grandes-marcas-usan-logos-sencillos`,
    prompt: `Una composicion visual minimalista y elegante que muestra la evolucion de logos iconicos como Nike, Apple y Google sobre un fondo blanco impoluto. Estilo editorial premium, fotografia de estudio con iluminacion suave y uniforme. Los logos flotan en el espacio como constelaciones. Blanco, negro y acentos de color. Atmosfera de sofisticacion y estrategia empresarial. Aspect ratio 16:9, 1920x1080.`,
    alt: `Evolucion de logos minimalistas de marcas iconicas como Nike, Apple y Google sobre fondo blanco, representando branding corporativo estrategico.`,
    caption: `Las marcas mas valiosas del mundo comparten un patron: logos cada vez mas simples y estrategicos.`,
    ogDescription: `Imagen de portada: evolucion de logos minimalistas de las marcas mas valiosas del mundo.`,
  },
  {
    slug: `mi-diseno-no-convence-a-nadie-como-solucionarlo`,
    prompt: `Una interfaz digital abstracta y fragmentada en una mesa de trabajo de diseno. Un disenador sostiene una lupa sobre un punto especifico de la interfaz. Estilo cinematografico, iluminacion tenue con un foco de luz calida sobre el area de analisis. Elementos de UX wireframes, mapas de calor y graficos en segundo plano. Atmosfera de introspeccion profesional, analisis y metodologia. Aspect ratio 16:9, 1920x1080.`,
    alt: `Disenador analizando una interfaz digital con lupa, wireframes y mapas de calor en segundo plano, representando diagnostico UX profesional.`,
    caption: `El diseno que convence no nace de la intuicion: nace de la investigacion, los datos y la metodologia.`,
    ogDescription: `Imagen de portada: analisis profesional de interfaz digital con herramientas de diagnostico UX.`,
  },
  {
    slug: `que-contenido-subir-para-atraer-mas-publico-b2b`,
    prompt: `Una maquina de engranajes conceptual hecha de cinco piezas modulares de colores, cada una representando uno de los cinco pilares de contenido. Sobre una superficie minimalista blanca, iluminacion limpia y profesional, estilo editorial corporativo. Cada engranaje tiene iconos sutiles: un libro (educativo), una estrella (entretenimiento), una brujula (inspiracion), un diamante (identidad) y un grafico ascendente (tendencias). Aspect ratio 16:9, 1920x1080.`,
    alt: `Cinco engranajes modulares de colores representando los pilares de una estrategia de contenidos B2B: educativo, entretenimiento, inspiracional, identidad y tendencias.`,
    caption: `Una estrategia de contenidos B2B efectiva se construye sobre cinco pilares que trabajan en sinergia.`,
    ogDescription: `Imagen de portada: representacion conceptual de los cinco pilares del content marketing B2B.`,
  },
  {
    slug: `4-tips-de-diseno-ux-ui-que-deberias-aplicar-en-tu-producto-digital`,
    prompt: `Cuatro tarjetas modulares flotando sobre un fondo degradado suave de azul a blanco. Cada tarjeta muestra visualizaciones abstractas de conceptos UX: una diana concentrica (Ley de Fitts), un cerebro con conexiones (principio de Jakob), una piramide de elementos (jerarquia visual) y un icono de accesibilidad universal. Estilo tecnologico y cientifico, iluminacion limpia. Aspect ratio 16:9, 1920x1080.`,
    alt: `Cuatro tarjetas conceptuales representando principios UX/UI: Ley de Fitts, principio de Jakob, jerarquia visual y accesibilidad digital.`,
    caption: `Cuatro principios de diseno UX/UI respaldados por psicologia cognitiva que impactan directamente en los resultados de negocio.`,
    ogDescription: `Imagen de portada: los cuatro principios fundamentales de diseno UX/UI explicados en el articulo.`,
  },
];

/* ───────────────────────── Ejecución principal ───────────────────────── */

async function run() {
  console.log(`\n- Sembrando articulos de blog...\n`);

  // 1. Crear autor
  console.log(`Autor:`);
  const authorId = await ensureAuthor();

  // 2. Crear categorias
  console.log(`\nCategorias:`);
  const brandCat = await ensureCategory(
    `Branding`,
    `branding`,
    `Identidad de marca, diseno de logos, posicionamiento visual y estrategia de marca corporativa.`
  );
  const designCat = await ensureCategory(
    `Diseno UX/UI`,
    `diseno-ux-ui`,
    `Experiencia de usuario, diseno de interfaces, usabilidad, accesibilidad y diseno de productos digitales.`
  );
  const marketingCat = await ensureCategory(
    `Marketing Digital`,
    `marketing-digital`,
    `Estrategia de contenidos, inbound marketing, SEO, redes sociales y crecimiento digital B2B.`
  );

  // 3. Crear articulos
  console.log(`\nArticulos:`);

  const articles = [
    { id: buildArticle1(authorId, [brandCat, marketingCat]), title: `Articulo 1: Logos minimalistas` },
    { id: buildArticle2(authorId, [designCat]), title: `Articulo 2: Diseno que no convence` },
    { id: buildArticle3(authorId, [marketingCat]), title: `Articulo 3: Estrategia de contenidos` },
    { id: buildArticle4(authorId, [designCat, marketingCat]), title: `Articulo 4: Tips UX/UI` },
    {
      id: {
        _id: COMO_HACER_UNA_PAGINA_WEB_POST._id,
        _type: `post` as const,
        title: COMO_HACER_UNA_PAGINA_WEB_POST.title,
        slug: { _type: `slug` as const, current: COMO_HACER_UNA_PAGINA_WEB_POST.slug },
        author: { _type: `reference` as const, _ref: authorId },
        categories: [designCat, marketingCat].map((id, i) => ({ _type: `reference` as const, _ref: id, _key: `cat_${i}` })),
        publishedAt: COMO_HACER_UNA_PAGINA_WEB_POST.publishedAt,
        instagramUrl: COMO_HACER_UNA_PAGINA_WEB_POST.instagramUrl,
        excerpt: COMO_HACER_UNA_PAGINA_WEB_POST.excerpt,
        seo: COMO_HACER_UNA_PAGINA_WEB_POST.seo,
        body: COMO_HACER_UNA_PAGINA_WEB_POST.body,
      },
      title: `Articulo 5: Como hacer una pagina web B2B`,
    },
  ];

  for (const article of articles) {
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_id == $id][0]{ _id }`, { id: article.id._id }
    );

    if (existing) {
      await client.patch(article.id._id).set({
        title: article.id.title,
        slug: article.id.slug,
        excerpt: article.id.excerpt,
        publishedAt: article.id.publishedAt,
        instagramUrl: article.id.instagramUrl,
        body: article.id.body,
        seo: article.id.seo,
        categories: article.id.categories,
      }).commit();
      console.log(`  V ${article.title} - actualizado`);
    } else {
      await client.create(article.id as Parameters<typeof client.create>[0]);
      console.log(`  V ${article.title} - creado`);
    }
  }

  // 4. Mostrar prompts de imagenes
  console.log(`\n─────────────────────────────────────────`);
  console.log(`PROMPTS PARA IMAGENES DE PORTADA`);
  console.log(`─────────────────────────────────────────\n`);

  for (const img of articleImages) {
    console.log(`--- ${img.slug} ---`);
    console.log(`Prompt: ${img.prompt}\n`);
    console.log(`Alt text: ${img.alt}\n`);
    console.log(`Caption: ${img.caption}\n`);
    console.log(`OG Image description: ${img.ogDescription}\n`);
  }

  console.log(`\nV Articulos sembrados exitosamente.\n`);

  console.log(`Para usar las imagenes:`);
  console.log(`1. Genera cada imagen con el prompt proporcionado.`);
  console.log(`2. Subela a Sanity Studio manualmente o mediante script.`);
  console.log(`3. Asignala al campo 'mainImage' de cada post.`);
  console.log(`4. Asigna la misma imagen al campo 'seo.ogImage'.\n`);
}

run().catch((err) => {
  console.error(`Error:`, err);
  process.exit(1);
});