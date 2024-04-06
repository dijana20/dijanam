'use server';

import { sql } from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// delete first 
export async function deleteConsumer(consumer_id) {
  try {
    await sql`DELETE FROM consumer WHERE consumer_id = ${consumer_id}`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Delete.',
    };
  }

  revalidatePath('/');
  redirect('/');
}

// delete second
// export async function deleteEmployee(employee_id) {
//   try {
//     await sql`DELETE FROM employee WHERE employee_id = ${employee_id}`;
//   } catch (error) {
//     // If a database error occurs, return a more specific error.
//     return {
//       message: 'Database Error: Failed to Delete.',
//     };
//   }

//   revalidatePath('/');
//   redirect('/');
// }
//e inserton me qeta = tabela me pk
export async function createConsumer(formData) {
  const data = {
    name: formData.get('name'),
    birthyear: formData.get('birthyear'),
  };

  try {
    await sql`
    INSERT INTO consumer (name, birthyear)
    VALUES (${data.name}, ${data.birthyear})
  `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Table.',
    };
  }

  revalidatePath('/');
  redirect('/');
}
//e inserton me qeta = tabela me fk 
export async function createProduct(formData) {
  const data = {
    title: formData.get('title'),
    barcode: formData.get('barcode'),
    skadimi: formData.get('skadimi'),
    consumer_id: formData.get('consumer_id'),
  };

  try {
    await sql`
    INSERT INTO product (title,barcode, skadimi, consumer_id)
    VALUES (${data.title}, ${data.barcode}, ${data.skadimi},${data.consumer_id})
  `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Table.',
    };
  }

  revalidatePath('/');
  redirect('/');
}

export async function updateConsumer(consumer_id, formData) {
  const data = {
    name: formData.get("name"),
    birthyear: formData.get("birthyear"),
  };

  try {
    await sql`
    UPDATE consumer
    SET name = ${data.name},  birthyear = ${data.birthyear}
    WHERE consumer_id = ${consumer_id}`;
  ;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update.",
    };
  }

  revalidatePath("/");
  redirect("/");
}
export async function updateProduct(product_id, formData) {
  const data = {
    title: formData.get('title'),
    barcode: formData.get('barcode'),
    skadimi: formData.get('skadimi'),
    consumer_id: formData.get('consumer_id'),
  };

  try {
    await sql`
    UPDATE product
    SET title = ${data.title},  barcode = ${data.barcode},skadimi = ${data.skadimi},consumer_id = ${data.consumer_id}
    WHERE product_id = ${product_id}`;
  ;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update.",
    };
  }

  revalidatePath("/");
  redirect("/");
}