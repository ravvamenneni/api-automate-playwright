import { request } from "@playwright/test";
import { cart_api_url, cart_key } from "../../constants/cart";

interface CartItem {
  sku: number;
  sellerId: number;
  requestedQuantity: number;
  price: number;
  isDirect: boolean;
}

export async function GetCartCount() {
  const context = await request.newContext();

  const response  = await context.get(`${cart_api_url}v1/${cart_key}/summary/count`)

  const body = await response.json();

  return body.results[0].itemCount as number;
}

export async function ClearCart() {
  const context = await request.newContext();

  await context.delete(`${cart_api_url}v1/${cart_key}/items/all`);

  console.log("cleared cart");
}

export async function SeedCart(cartItems: CartItem[]) {
  const context = await request.newContext();

  await context.post(`${cart_api_url}v1/${cart_key}/items/bulkadd`, {
    data: {
      items: cartItems,
      countryCode: "US"
    }
  })
  
  console.log("cart seeded")
}