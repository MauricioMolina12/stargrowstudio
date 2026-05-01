type TestimonialTemplateProps = {
  name: string;
  role?: string;
  company?: string;
  content: string;
  id: string;
};

export function testimonialTemplate({
  name,
  role,
  company,
  content
}: TestimonialTemplateProps) {
  return `
  <div style="margin:0;padding:0;background-color:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.05);">

            <tr>
              <td style="background:#5656B5;padding:24px 32px;color:#ffffff;">
                <h2 style="margin:0;font-size:20px;font-weight:600;">
                  Nuevo Testimonio Recibido
                </h2>
                <p style="margin:8px 0 0;font-size:14px;opacity:0.9;">
                  Alguien compartió su experiencia en tu sitio.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:32px;">

                <p style="margin:0 0 16px;font-size:14px;color:#666;">
                  <strong style="color:#111;">Nombre:</strong> ${name}
                </p>

                <p style="margin:0 0 16px;font-size:14px;color:#666;">
                  <strong style="color:#111;">Rol:</strong> ${role ?? "No especificado"}
                </p>

                <p style="margin:0 0 24px;font-size:14px;color:#666;">
                  <strong style="color:#111;">Empresa:</strong> ${company ?? "No especificada"}
                </p>

                <div style="background:#f4f6fb;padding:20px;border-radius:8px;">
                  <p style="margin:0 0 8px;font-size:13px;color:#5656B5;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">
                    Mensaje
                  </p>
                  <p style="margin:0;font-size:15px;color:#333;line-height:1.6;">
                    ${content}
                  </p>
                </div>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </div>
  `;
}
