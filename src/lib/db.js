import postgres from 'postgres';

export const sql = postgres(
  'postgres://postgres:dijana123@localhost:5432/lab1_db'
);
