export async function onRequest(context) {
  const { DB } = context.env;

  try {
    const result = await DB
      .prepare("INSERT INTO bl_numbers DEFAULT VALUES")
      .run();

    const id = result.meta.last_row_id;

    const blNumber = "BL-" + String(id).padStart(4, "0");

    return new Response(
      JSON.stringify({ id, blNumber }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
