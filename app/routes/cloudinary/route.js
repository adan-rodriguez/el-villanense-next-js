export async function POST(request) {
  const formData = await request.formData();

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dh4eh6jen/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const { secure_url } = await response.json();

  return new Response(JSON.stringify(secure_url));
}
