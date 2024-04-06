'use client';

import { deleteConsumer} from '@/lib/actions';//munesh me bo delete chef edhe recipe psh {deletechef,deleterecipe}

export function FirstDeleteButton({ consumer_id }) {
  return (
    <button
      className="text-rose-500 px-4 py-2 rounded-md"
      onClick={async () => {
        await deleteConsumer(consumer_id);
      }}
    >
      Delete
    </button>
  );
}

// export function SecondDeleteButton({ employee_id }) {
//   return (
//     <button
//       className="text-red-500 px-4 py-2 rounded-md"
//       onClick={async () => {
//         await deleteEmployee(employee_id);
//       }}
//     >
//       Delete
//     </button>
//   );
// }