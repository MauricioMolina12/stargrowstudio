'use client';


type InternetStatusProps = {
  isOnline: boolean;
};

export default function InternetStatus({ isOnline }: InternetStatusProps) {
  return (
    <div
      className={`fixed bottom-4 left-4 px-4 py-2 rounded-lg text-white shadow-lg transition-all ${
        isOnline ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      {isOnline ? 'Estás conectado a Internet ✅' : 'Sin conexión ❌'}
    </div>
  );
}
