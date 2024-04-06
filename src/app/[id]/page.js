import { updateProduct } from "@/lib/actions";
import { sql } from "@/lib/db";

export default async function Page({ params }) {
  // per mi shfaq te gjitha te dhenat nga databaza
  const [product] =
    await sql`SELECT * FROM product WHERE product_id = ${params.id}`;
    const consumers = await sql `SELECT * FROM consumer`;

  const updateTableWithId = updateProduct.bind(null, params.id);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={updateTableWithId} className="flex flex-col gap-4">
        {/* per tabelen e pare pk */}
        {/* <input
          type="text"
          name="name"
          placeholder="Name"
          defaultValue={consumer.name}
        />
        <input
          type="number"
          name="birthyear"
          placeholder="Birth Year"
          defaultValue={consumer.birthyear}
        /> */}
        {/* per tabelen e dyte fk */}
        <input
          type="text"
          name="title"
          placeholder="title"
          defaultValue={product.title}
        />
        <input
          type="number"
          name="barcode"
          placeholder=" barcode"
          defaultValue={product.barcode}
        />
        <input
          type="number"
          name="skadimi"
          placeholder="skadimi"
          defaultValue={product.skadimi}
        />
        <select
          id="consumer_id"
          name="consumer_id"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={product.consumer_id}
        >
          <option value="" disabled>
            Select
          </option>
          {consumers.map((consumer) => (
            <option
              key={consumer.consumer_id}
              value={consumer.consumer_id}
            >
              {consumer.name}
            </option>
          ))}
        </select>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}