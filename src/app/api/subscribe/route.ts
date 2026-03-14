import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = subscribeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.errors[0].message, success: false },
      { status: 400 }
    );
  }

  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("subscribers")
      .insert({ email: parsed.data.email, source: "api" });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({
          message: "You're already on the list.",
          success: true,
        });
      }
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Something went wrong.", success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "You're in. Welcome to the shift.",
      success: true,
    });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 }
    );
  }
}
