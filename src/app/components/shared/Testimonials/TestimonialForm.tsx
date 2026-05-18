'use client';

import { getInitialsAvatar } from "@/app/utils/functions/getInitialsAvatar";
import { stringToColor } from "@/app/utils/functions/stringToColor";
import { useState } from "react";
import { useToast } from "../Toast/ToastProvider";


export default function TestimonialForm() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [namePreview, setNamePreview] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      role: formData.get("role"),
      company: formData.get("company"),
      content: formData.get("content"),
    };

    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      showToast("¡Gracias por compartir tu experiencia! 🙌", "success", 4000);
      setNamePreview("");
      e.currentTarget.reset();
    } else {
      showToast("Hubo un error al enviar tu testimonio. Intenta nuevamente.", "error", 4000);
    }
  }

  const defaultName = "Tu Nombre";

  const displayName = namePreview.trim() || defaultName;
  const initials = getInitialsAvatar(displayName);
  const backgroundColor = stringToColor(displayName);
  
  return (
    <section className="w-full bg-[#5656B5] py-25 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div className="text-white flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Tu experiencia <br />
            <span className="opacity-80">es nuestra mejor carta</span>
          </h2>

          <p className="text-lg opacity-90 max-w-md">
            Comparte cómo fue trabajar con nosotros. Tu opinión ayuda a otros
            negocios a tomar decisiones con confianza.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="flex items-center gap-4">
              <div
                style={{ backgroundColor }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
              >
                {initials || "?"}
              </div>

              <input
                name="name"
                placeholder="Tu nombre"
                required
                onChange={(e) => setNamePreview(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5656B5] transition"
              />
            </div>

            <input
              name="role"
              placeholder="Cargo"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5656B5] transition"
            />

            <input
              name="company"
              placeholder="Empresa"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5656B5] transition"
            />

            <textarea
              name="content"
              placeholder="Escribe tu testimonio..."
              required
              className="border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#5656B5] transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#5656B5] text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-60 font-medium cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                'Enviar testimonio'
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );

}
