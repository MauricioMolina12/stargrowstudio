type Props = {
    title: { left: string, main: string; right?: string },
    tag: string;
    description: string;
}

const TitleBox = ({ title, tag, description }: Props) => {

    return (
        <header className="w-full flex flex-col items-center justify-center gap-4">
            <span className="bg-[var(--meteorite--200)] text-[var(--color-primary-to-white)] p-1 px-2 rounded-2xl">{ tag }</span>
            <h1 className="parallax text-3xl text-center font-light lg:w-[70%] text-[1.2rem] lg:text-4xl">{ title?.left } <span className="text-[var(--color-primary-to-white)]"> {title?.main} </span> { title?.right }</h1>
        </header>
    )
}

export default TitleBox