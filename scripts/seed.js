import 'dotenv/config'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-12-31',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function createRecords(schemaName, records, useIdFromSlug = true) {
  for (const record of records) {
    try {
      const doc = { _type: schemaName, ...record }

      if (useIdFromSlug && record.slug && record.slug.current) {
        doc._id = `${schemaName}-${record.slug.current}`
        await client.createIfNotExists(doc)
      } else {
        await client.create(doc)
      }

      console.log(`Creado: ${record.title}`)
    } catch (err) {
      console.error('Error creando registro:', record.title, err)
    }
  }
}

const topics = [
  { title: 'Next.js', slug: { _type: 'slug', current: 'nextjs' }, description: 'Framework de React para aplicaciones web con renderizado en servidor.' },
  { title: 'React', slug: { _type: 'slug', current: 'react' }, description: 'Librería de JavaScript para construir interfaces de usuario interactivas.' },
  { title: 'TypeScript', slug: { _type: 'slug', current: 'typescript' }, description: 'Lenguaje que añade tipado estático a JavaScript.' },
  { title: 'Matemáticas', slug: { _type: 'slug', current: 'matematicas' }, description: 'Estudio de números, cantidades y estructuras.' },
  { title: 'Historia', slug: { _type: 'slug', current: 'historia' }, description: 'Estudio de los eventos pasados y su interpretación.' },
  { title: 'Física', slug: { _type: 'slug', current: 'fisica' }, description: 'Ciencia que estudia la materia, energía y el universo.' },
  { title: 'Química', slug: { _type: 'slug', current: 'quimica' }, description: 'Estudio de la composición, estructura y propiedades de la materia.' },
  { title: 'Lenguaje', slug: { _type: 'slug', current: 'lenguaje' }, description: 'Estudio de la comunicación humana a través del lenguaje.' },
  { title: 'Idiomas', slug: { _type: 'slug', current: 'idiomas' }, description: 'Aprendizaje y estudio de diferentes lenguas.' },
  { title: 'Arte', slug: { _type: 'slug', current: 'arte' }, description: 'Expresión creativa a través de diferentes medios y técnicas.' },
  { title: 'Música', slug: { _type: 'slug', current: 'musica' }, description: 'Arte de combinar sonidos para crear armonía y ritmo.' },
  { title: 'Ciencia', slug: { _type: 'slug', current: 'ciencia' }, description: 'Conjunto de conocimientos obtenidos mediante observación y experimentación.' },
  { title: 'Nutrición', slug: { _type: 'slug', current: 'nutricion' }, description: 'Estudio de los alimentos y su efecto en el organismo.' },
  { title: 'Ejercicio', slug: { _type: 'slug', current: 'ejercicio' }, description: 'Actividad física para mejorar la salud y el bienestar.' },
  { title: 'Meditación', slug: { _type: 'slug', current: 'meditacion' }, description: 'Práctica de concentración y relajación para la mente y el cuerpo.' },
  { title: 'Salud mental', slug: { _type: 'slug', current: 'salud-mental' }, description: 'Bienestar emocional y psicológico de las personas.' },
  { title: 'Marketing Digital', slug: { _type: 'slug', current: 'marketing-digital' }, description: 'Promoción de productos o servicios en plataformas digitales.' },
  { title: 'SEO', slug: { _type: 'slug', current: 'seo' }, description: 'Optimización de contenido web para buscadores.' },
  { title: 'Branding', slug: { _type: 'slug', current: 'branding' }, description: 'Creación y gestión de la identidad de una marca.' },
  { title: 'Productividad', slug: { _type: 'slug', current: 'productividad' }, description: 'Estrategias para mejorar la eficiencia personal y profesional.' },
  { title: 'Gestión de proyectos', slug: { _type: 'slug', current: 'gestion-de-proyectos' }, description: 'Planificación y ejecución de proyectos de manera eficiente.' },
  { title: 'Emprendimiento', slug: { _type: 'slug', current: 'emprendimiento' }, description: 'Creación y desarrollo de negocios propios.' },
  { title: 'Fotografía', slug: { _type: 'slug', current: 'fotografia' }, description: 'Arte y técnica de capturar imágenes mediante una cámara.' },
  { title: 'Diseño gráfico', slug: { _type: 'slug', current: 'diseno-grafico' }, description: 'Creación de piezas visuales con fines comunicativos o artísticos.' },
  { title: 'Videojuegos', slug: { _type: 'slug', current: 'videojuegos' }, description: 'Entretenimiento interactivo mediante software lúdico.' },
  { title: 'Cine', slug: { _type: 'slug', current: 'cine' }, description: 'Arte de la creación de películas y producciones audiovisuales.' },
  { title: 'Literatura', slug: { _type: 'slug', current: 'literatura' }, description: 'Arte de la expresión escrita y creación de obras literarias.' },
  { title: 'Teatro', slug: { _type: 'slug', current: 'teatro' }, description: 'Arte escénico de representación ante un público.' },
  { title: 'Historia del arte', slug: { _type: 'slug', current: 'historia-del-arte' }, description: 'Estudio de la evolución del arte a través del tiempo.' },
  { title: 'Filosofía', slug: { _type: 'slug', current: 'filosofia' }, description: 'Estudio de cuestiones fundamentales sobre la existencia y el conocimiento.' },
  { title: 'Psicología', slug: { _type: 'slug', current: 'psicologia' }, description: 'Ciencia que estudia la mente y el comportamiento humano.' },
  { title: 'Sociología', slug: { _type: 'slug', current: 'sociologia' }, description: 'Estudio de la sociedad, sus estructuras y relaciones.' },
  { title: 'Política', slug: { _type: 'slug', current: 'politica' }, description: 'Estudio y práctica de la organización y administración de sociedades.' },
  { title: 'Cocina', slug: { _type: 'slug', current: 'cocina' }, description: 'Arte de preparar alimentos y recetas culinarias.' },
  { title: 'Viajes', slug: { _type: 'slug', current: 'viajes' }, description: 'Exploración de lugares y culturas alrededor del mundo.' },
  { title: 'Deportes', slug: { _type: 'slug', current: 'deportes' }, description: 'Actividades físicas y competencias deportivas.' },
  { title: 'Moda', slug: { _type: 'slug', current: 'moda' }, description: 'Tendencias y estilo en vestimenta y accesorios.' },
  { title: 'Belleza', slug: { _type: 'slug', current: 'belleza' }, description: 'Cuidado personal y estética.' },
  { title: 'Jardinería', slug: { _type: 'slug', current: 'jardineria' }, description: 'Arte y técnica de cultivar plantas y jardines.' },
  { title: 'Fotografía de viajes', slug: { _type: 'slug', current: 'fotografia-de-viajes' }, description: 'Captura de imágenes en entornos turísticos y culturales.' },
  { title: 'Finanzas personales', slug: { _type: 'slug', current: 'finanzas-personales' }, description: 'Gestión de dinero, ahorro e inversión individual.' },
  { title: 'Contabilidad', slug: { _type: 'slug', current: 'contabilidad' }, description: 'Registro, análisis y control de las finanzas de una empresa.' },
  { title: 'Economía', slug: { _type: 'slug', current: 'economia' }, description: 'Estudio de la producción, distribución y consumo de bienes y servicios.' },
  { title: 'Gestión empresarial', slug: { _type: 'slug', current: 'gestion-empresarial' }, description: 'Administración eficiente de recursos y personal de una empresa.' },
  { title: 'Recursos humanos', slug: { _type: 'slug', current: 'recursos-humanos' }, description: 'Gestión de personal, talento y desarrollo profesional.' },
  { title: 'Liderazgo', slug: { _type: 'slug', current: 'liderazgo' }, description: 'Habilidad de guiar y motivar a un equipo hacia objetivos comunes.' },
  { title: 'Innovación', slug: { _type: 'slug', current: 'innovacion' }, description: 'Desarrollo de ideas nuevas y mejoras en productos o servicios.' },
  { title: 'Estrategia empresarial', slug: { _type: 'slug', current: 'estrategia-empresarial' }, description: 'Planificación y toma de decisiones para alcanzar objetivos empresariales.' },
  { title: 'Marketing', slug: { _type: 'slug', current: 'marketing' }, description: 'Promoción y posicionamiento de productos o servicios en el mercado.' },
  { title: 'Ventas', slug: { _type: 'slug', current: 'ventas' }, description: 'Proceso de comercialización de productos o servicios a clientes.' },
  { title: 'Negociación', slug: { _type: 'slug', current: 'negociacion' }, description: 'Habilidad de llegar a acuerdos beneficiosos para ambas partes.' },
  { title: 'Startup', slug: { _type: 'slug', current: 'startup' }, description: 'Empresa emergente con alto potencial de crecimiento y escalabilidad.' },
  { title: 'Product Management', slug: { _type: 'slug', current: 'product-management' }, description: 'Gestión de ciclo de vida de un producto, desde la idea hasta su lanzamiento.' },
  { title: 'Análisis de datos', slug: { _type: 'slug', current: 'analisis-de-datos' }, description: 'Interpretación de información para tomar decisiones informadas.' },
  { title: 'Inteligencia artificial', slug: { _type: 'slug', current: 'inteligencia-artificial' }, description: 'Desarrollo de sistemas que simulan capacidades humanas como el aprendizaje y razonamiento.' },
  { title: 'Machine Learning', slug: { _type: 'slug', current: 'machine-learning' }, description: 'Rama de la IA que permite a los sistemas aprender y mejorar con datos.' },
  { title: 'Blockchain', slug: { _type: 'slug', current: 'blockchain' }, description: 'Tecnología de registro distribuido y seguro de transacciones digitales.' },
  { title: 'Criptomonedas', slug: { _type: 'slug', current: 'criptomonedas' }, description: 'Monedas digitales basadas en blockchain y criptografía.' },
  { title: 'E-commerce', slug: { _type: 'slug', current: 'e-commerce' }, description: 'Comercio electrónico para vender productos o servicios en línea.' },
  { title: 'Fintech', slug: { _type: 'slug', current: 'fintech' }, description: 'Tecnología aplicada a servicios financieros y bancarios.' },
  { title: 'Sostenibilidad', slug: { _type: 'slug', current: 'sostenibilidad' }, description: 'Prácticas que promueven el equilibrio ambiental, social y económico.' },
  { title: 'Responsabilidad social', slug: { _type: 'slug', current: 'responsabilidad-social' }, description: 'Compromiso de empresas y personas con la sociedad y el medio ambiente.' },
  { title: 'Educación', slug: { _type: 'slug', current: 'educacion' }, description: 'Proceso de enseñanza y aprendizaje para desarrollar conocimientos y habilidades.' },
  { title: 'Pedagogía', slug: { _type: 'slug', current: 'pedagogia' }, description: 'Ciencia que estudia la educación y los métodos de enseñanza.' },
  { title: 'Psicopedagogía', slug: { _type: 'slug', current: 'psicopedagogia' }, description: 'Disciplina que estudia los procesos de aprendizaje y desarrollo del estudiante.' },
  { title: 'E-learning', slug: { _type: 'slug', current: 'e-learning' }, description: 'Aprendizaje mediante plataformas digitales y recursos en línea.' },
  { title: 'Capacitación', slug: { _type: 'slug', current: 'capacitacion' }, description: 'Formación para mejorar competencias y habilidades profesionales.' },
  { title: 'Coaching', slug: { _type: 'slug', current: 'coaching' }, description: 'Proceso de acompañamiento para alcanzar objetivos personales o profesionales.' },
  { title: 'Mentoría', slug: { _type: 'slug', current: 'mentoria' }, description: 'Relación de guía y apoyo entre un mentor y un aprendiz.' },
  { title: 'Networking', slug: { _type: 'slug', current: 'networking' }, description: 'Creación de relaciones profesionales para intercambiar oportunidades y conocimientos.' },
  { title: 'Innovación social', slug: { _type: 'slug', current: 'innovacion-social' }, description: 'Desarrollo de soluciones creativas para problemas sociales.' },
  { title: 'Economía circular', slug: { _type: 'slug', current: 'economia-circular' }, description: 'Modelo económico basado en reutilizar y reciclar recursos.' },
  { title: 'Emprendimiento social', slug: { _type: 'slug', current: 'emprendimiento-social' }, description: 'Creación de negocios con impacto social positivo.' },
  { title: 'Gestión del cambio', slug: { _type: 'slug', current: 'gestion-del-cambio' }, description: 'Métodos para adaptarse a transformaciones organizacionales.' },
  { title: 'Ciberseguridad', slug: { _type: 'slug', current: 'ciberseguridad' }, description: 'Protección de sistemas informáticos y datos frente a ataques.' },
  { title: 'Cloud Computing', slug: { _type: 'slug', current: 'cloud-computing' }, description: 'Uso de servidores remotos para almacenar, gestionar y procesar datos.' },
  { title: 'Data Science', slug: { _type: 'slug', current: 'data-science' }, description: 'Análisis de grandes volúmenes de datos para obtener conocimiento útil.' },
  { title: 'Big Data', slug: { _type: 'slug', current: 'big-data' }, description: 'Conjunto de técnicas para procesar y analizar datos masivos.' },
  { title: 'Realidad virtual', slug: { _type: 'slug', current: 'realidad-virtual' }, description: 'Simulación de entornos digitales inmersivos para diversos usos.' },
  { title: 'Realidad aumentada', slug: { _type: 'slug', current: 'realidad-aumentada' }, description: 'Integración de elementos digitales en el mundo real.' },
  { title: 'Robótica', slug: { _type: 'slug', current: 'robotica' }, description: 'Diseño y construcción de robots para tareas específicas.' },
  { title: 'Impresión 3D', slug: { _type: 'slug', current: 'impresion-3d' }, description: 'Creación de objetos físicos mediante impresión tridimensional.' },
  { title: 'Arquitectura', slug: { _type: 'slug', current: 'arquitectura' }, description: 'Diseño y construcción de edificios y espacios habitables.' },
  { title: 'Urbanismo', slug: { _type: 'slug', current: 'urbanismo' }, description: 'Planificación y diseño de ciudades y espacios urbanos.' },
  { title: 'Psicología organizacional', slug: { _type: 'slug', current: 'psicologia-organizacional' }, description: 'Estudio del comportamiento humano en entornos laborales.' },
  { title: 'Trabajo en equipo', slug: { _type: 'slug', current: 'trabajo-en-equipo' }, description: 'Colaboración entre personas para alcanzar objetivos comunes.' },
  { title: 'Gestión de tiempo', slug: { _type: 'slug', current: 'gestion-de-tiempo' }, description: 'Optimización de actividades para aprovechar mejor los recursos temporales.' },
  { title: 'Inteligencia emocional', slug: { _type: 'slug', current: 'inteligencia-emocional' }, description: 'Capacidad de reconocer, entender y manejar emociones propias y ajenas.' },
  { title: 'Storytelling', slug: { _type: 'slug', current: 'storytelling' }, description: 'Uso de narrativas para comunicar ideas y generar impacto.' },
  { title: 'Gamificación', slug: { _type: 'slug', current: 'gamificacion' }, description: 'Aplicación de mecánicas de juego en contextos no lúdicos para motivar usuarios.' },
  { title: 'Estrategia de contenido', slug: { _type: 'slug', current: 'estrategia-de-contenido' }, description: 'Planificación de contenido para atraer y retener audiencia.' },
  { title: 'Email marketing', slug: { _type: 'slug', current: 'email-marketing' }, description: 'Uso del correo electrónico para comunicación y promoción comercial.' },
  { title: 'Redes sociales', slug: { _type: 'slug', current: 'redes-sociales' }, description: 'Plataformas de interacción social y comunicación digital.' },
  { title: 'Influencers', slug: { _type: 'slug', current: 'influencers' }, description: 'Personas con gran capacidad de influencia en redes sociales.' },
  { title: 'Content creator', slug: { _type: 'slug', current: 'content-creator' }, description: 'Creador de contenido digital para medios en línea.' },
  { title: 'Podcast', slug: { _type: 'slug', current: 'podcast' }, description: 'Programa de audio digital distribuido en línea.' },
  { title: 'Video marketing', slug: { _type: 'slug', current: 'video-marketing' }, description: 'Uso de videos para promoción y comunicación de marca.' },
  { title: 'Estrategia de marca', slug: { _type: 'slug', current: 'estrategia-de-marca' }, description: 'Plan para construir y posicionar una marca' }
]

createRecords('topic', topics)
