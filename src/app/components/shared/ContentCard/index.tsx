

type content = {
    name: string;
    image: string;
    description: string;
    techs?: { image: string; name: string }[]
}

type ContentCardProps = {
    contents: content[]
}


export default function ContentCard({contents}: ContentCardProps) {
    return( 
        <>
            {contents.map((project, index) => (
                <div key={index} className="parallax min-w-[350px] max-w-[350px] flex-shrink-0 rounded-xl overflow-hidden bg-white border border-[var(--color-gray)]">
                    <figure className="h-[200px] overflow-hidden">
                        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                    </figure>
                    <div className="p-4 flex flex-col gap-3">
                        <h2 className="font-bold text-[14px] text-[var(--color-primary)]">{project.name}</h2>
                        <p className="text-[13px] text-[var(--color-dark-gray)] leading-relaxed">{project.description}</p>
                    </div>
                    {project.techs && (
                        <div className='px-4 pb-4 flex flex-col gap-2'>
                            <h4 className='text-[var(--color-dark)] font-semibold text-[.95rem]'>Tecnologías usadas</h4>
                            <div className='flex items-center gap-2'>
                                {project.techs?.map((tech, idx) => (
                                    <figure key={idx} className='flex flex-col items-center gap-2'>
                                        <img className='bg-gray-50 rounded-[10px] p-[2px] w-7 object-cover' src={tech.image} alt={`Imagen de: ` + tech.name} />
                                        <figcaption className='text-[var(--color-dark-gray)] text-[.8rem]'>{tech.name}</figcaption>
                                    </figure>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}