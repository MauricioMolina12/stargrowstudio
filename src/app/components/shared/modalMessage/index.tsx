'use client';

type MessageProps = {
    message: string;
    isSuccess: boolean;
};

const ModalMessage = ({ message, isSuccess }: MessageProps) => {
    return (
        <>
         <section className={`flex flex-col justify-center items-center p-4 w-1/6 rounded-2xl fixed top-4 right-4 z-[9999] ${isSuccess ? 'bg-green-300' : 'bg-red-300'} text-white font-semibold`}>
            <h2 className="text-center">{message}</h2>
         </section>
        </>
    )
}

export default ModalMessage;