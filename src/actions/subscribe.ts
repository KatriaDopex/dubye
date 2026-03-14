"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function subscribeAction(
  prevState: { message: string; success: boolean } | null,
  formData: FormData
) {
  const parsed = subscribeSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { message: parsed.error.errors[0].message, success: false };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("subscribers")
      .insert({ email: parsed.data.email, source: "landing_page" });

    if (error) {
      if (error.code === "23505") {
        return { message: "You're already on the list.", success: true };
      }
      console.error("Supabase error:", error);
      return { message: "Something went wrong. Try again.", success: false };
    }

    return { message: "You're in. Welcome to the shift.", success: true };
  } catch {
    return { message: "Something went wrong. Try again.", success: false };
  }
}
