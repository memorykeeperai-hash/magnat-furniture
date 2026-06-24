"use server";

import { createClient } from "@/lib/supabase-server";

export async function submitInquiry(formData: FormData) {
  const supabase = await createClient();
  
  const full_name = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!full_name || !email) {
    return { error: "Name and email are required." };
  }

  const { error } = await supabase
    .from("inquiries")
    .insert([{
      full_name,
      email,
      subject,
      message,
      status: 'new'
    }]);

  if (error) {
    console.error("Error inserting inquiry:", error);
    return { error: "Failed to submit inquiry. Please try again." };
  }

  return { success: true };
}
