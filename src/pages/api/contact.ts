import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const subject = formData.get("subject")?.toString().trim() || "general";
    const message = formData.get("message")?.toString().trim() || "";

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Name, email, and message are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Mail service not configured — store to temp file
    const entry = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };

    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    const filePath = path.join(tempDir, `contact-${Date.now()}.json`);
    fs.writeFileSync(filePath, JSON.stringify(entry, null, 2), "utf-8");

    return new Response(
      JSON.stringify({ success: true, message: "Thank you for your message. We will respond within 2-3 business days." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
