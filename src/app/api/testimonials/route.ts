import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/serverClient";
import { Resend } from "resend";
import { testimonialTemplate } from "@/lib/email/templates/testimonialTemplate";


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.content) {
      return NextResponse.json(
        { error: "Datos incompletos" },
        { status: 400 }
      );
    }

    const created = await writeClient.create({
      _type: "testimonial",
      name: body.name,
      role: body.role ?? "",
      company: body.company ?? "",
      content: body.content,
      status: "pending",
    });

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "stargrowstudio@gmail.com",
        subject: "Nuevo testimonio recibido",
        html: testimonialTemplate({
          name: body.name,
          role: body.role,
          company: body.company,
          content: body.content,
          id: created._id,
        }),
      });
    } catch (error) {
      console.error("Error enviando correo", error);
    }


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error creando testimonio" },
      { status: 500 }
    );
  }
}
