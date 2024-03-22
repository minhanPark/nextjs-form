import { schema } from "@/app/registrationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData(); // form 데이터를 얻는다
  const data = Object.fromEntries(formData); // form 데이터를 객체로 변환한다.

  let parsed = schema.safeParse(data);
  if (parsed.success) {
    return NextResponse.json({ message: "User registered", data: parsed.data });
  } else {
    return NextResponse.json(
      {
        error: parsed.error,
      },
      { status: 400 }
    );
  }
}
