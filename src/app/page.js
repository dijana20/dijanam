import {createConsumer ,createProduct  } from '@/lib/actions';
import { sql } from '@/lib/db';
import {FirstDeleteButton} from './button';// e bon firstdeletebutton, seconddeletebutton
import Search from './search';

export default async function Home({searchParams}) {
  const query =searchParams?.query || "";
  // per mi shfaq te gjitha te dhenat nga databaza
  // CAST(nameofcolumn AS VARCHAR)     dmth ku e sheh qeta name e bon namepfcplumns psh nese don per
  //int borthyear e bon Where cast (borrthyear as varchar) Ilike .....
  const consumers = await sql`SELECT * FROM consumer `;
  // WHERE CAST (birthyear as VARCHAR) ILIKE ${"%" + query + "%"}
  // const products = await sql`SELECT * FROM product `;
    // WHERE title ILIKE ${"%" + query + "%"}
    //  OR CAST(recipe_id AS VARCHAR) ILIKE ${"%" + query + "%"}  `;

  const products = await sql`
  SELECT product.*, consumer.name AS consumer_name 
  FROM product 
  JOIN consumer ON product.consumer_id = consumer.consumer_id
  WHERE 
  consumer.name ILIKE ${"%" + query + "%"}
  OR product.title ILIKE ${"%" + query + "%"}
  OR  CAST (product.barcode AS VARCHAR) ILIKE ${"%" + query + "%"} `;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-2 gap-8">
        <ul className="border p-4">
          <h1>Consumer</h1>
          {/* <Search placeholder="Search" /> */}
          {consumers.map((consumer) => (
            <li
              key={consumer.consumer_id}
              className="flex items-center space-y-4"
            >
              <div className="my-4 text-lg font-medium">
                <h2>Name:{consumer.name}</h2>
                <p>Birthyear: {consumer.birthyear}</p>
                <p>ID:{consumer.consumer_id}</p>
              {/* <a href={`${consumer.consumer_id}`}>Update</a> */}
                <FirstDeleteButton consumer_id={consumer.consumer_id} />
              </div>
            </li>
          ))}
        </ul>
        <ul className="border p-4">
          <h1>Product</h1>
          <Search placeholder="Search" />
          {products.map((product) => (
            <li
              key={product.product_id}
              className="flex items-center space-y-4"
            >
              <div className="my-4 text-lg font-medium">
                <h2>Title:{product.title}</h2>
                <p> Barcode: {product.barcode}</p>
                <p>Skadimi:{product.skadimi}</p>
                <p>id: {product.consumer_id}</p>
                <a href={`${product.product_id}`}>Update</a>
                {/* <SecondDeleteButton employee_id={employee.employee_id} /> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <form action={createConsumer}>
          <div className="flex flex-col space-y-4 border p-4">
            <label>
              <span>Name: </span>
              <input id="name" name="name" type="text" required />
            </label>
            <label>
              <span>Birthyear: </span>
              <input id="birthyear" name="birthyear" type="number" required />
            </label>
            <button type="submit">Create</button>
          </div>
        </form>
        <form action={createProduct}>
          <div className="flex flex-col space-y-4 border p-4">
            <label>
              <span>Title:</span>
              <input id="title" name="title" type="text" required />
            </label>
            <label>
              <span>Barcode: </span>
              <input id="barcode" name="barcode" type="number" required />
            </label>
            <label>
              <span>Skadimi: </span>
              <input id="skadimi" name="skadimi" type="number" required />
            </label>
            <select name="consumer_id" id="consumer_id" required>
              {consumers.map((consumer) => (
                <option
                  key={consumer.consumer_id}
                  value={consumer.consumer_id}
                >
                  {consumer.name}
                </option>
              ))}
            </select>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </main>
  );
}
