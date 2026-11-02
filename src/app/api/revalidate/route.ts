import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const SECRET = process.env.SANITY_REVALIDATE_SECRET || "zuma-revalidate";
const VALID_TAGS = ["project", "post", "service"] as const;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const tag = searchParams.get("tag");

  if (secret !== SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const tagsToRevalidate = tag
    ? (VALID_TAGS.includes(tag as (typeof VALID_TAGS)[number]) ? [tag] : [])
    : [...VALID_TAGS];

  if (tagsToRevalidate.length === 0) {
    return NextResponse.json(
      { message: `Tag inválido. Tags válidos: ${VALID_TAGS.join(", ")}` },
      { status: 400 }
    );
  }

  for (const t of tagsToRevalidate) {
    revalidateTag(t);
  }

  return NextResponse.json({
    revalidated: true,
    tags: tagsToRevalidate,
    now: Date.now(),
  });
}