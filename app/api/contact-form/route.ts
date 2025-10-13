import { contactSchema } from "@lib/types/contact";

export async function POST(request: Request) {
  const data = contactSchema.parse(await request.json());

  if (!data) {
    return new Response("Invalid data", { status: 400 });
  }

  const { name, email, message, phone, subject } = data;

  console.log(name, email, message, phone, subject);

  return new Response("OK");
}
