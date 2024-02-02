import { test, expect } from '@playwright/test';

const cart_api_url = process.env.VUE_APP_CART_API;
const cart_key = process.env.CART_KEY

const items = [
  {
    sku: 15322,
    sellerId: 142990,
    requestedQuantity: 5,
    price: 15,
    isDirect: false,
  },
  {
    sku: 364268,
    sellerId: 142990,
    requestedQuantity: 5,
    price: 5,
    isDirect: false,
  }
];


test('gets the cart count', async ({ page, request }) => {
  const cart_summary_url = `${cart_api_url}v1/${cart_key}/summary`;

  const response = await request.get(`${cart_summary_url}/count`)

  console.log(response)
});