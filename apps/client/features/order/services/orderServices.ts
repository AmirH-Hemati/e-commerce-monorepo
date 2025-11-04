export async function getMyOrders() {
  const res = await fetch(`http://localhost:4000/api/v1/orders/myOrders`, {
    credentials: "include",
  });
  const ResponseData = await res.json();

  if (!res.ok) {
    throw new Error(ResponseData.message);
  }
  return ResponseData.data;
}
