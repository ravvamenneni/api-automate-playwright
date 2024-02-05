import { test, expect } from '@playwright/test';
import { ClearCart, GetCartCount, SeedCart } from '@helpers/cart';
import { cart_api_url, cart_key } from '@constants/cart';

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

test.describe('cart summary tests', () => {
  const cart_summary_url = `${cart_api_url}v1/${cart_key}/summary`;

  test.beforeEach("cart setup", async () => {
    if(await GetCartCount() > 0) {
      console.log('cart has items');    
      await ClearCart();
    } else {
      console.log('cart is empty');
    }
    await SeedCart(items);
  });

  test('gets the cart count', async ({ request }) => {
    const response = await request.get(`${cart_summary_url}/count`);

    await expect(response).toBeOK();

    const body = await response.json();

    const { itemCount } = body.results[0];

    await expect(itemCount).toBe(10);
  });

  test('gets the cart summary', async ({ request }) => {
    const response = await request.get(`${cart_summary_url}`);

    await expect(response).toBeOK();

    const body = await response.json();

    const { cartKey, itemCount, itemSubtotal } = body.results[0];

    await expect(cartKey).toBe(cart_key);
    await expect(itemCount).toBe(10);
    await expect(itemSubtotal).toBe(100);
  });

  test('gets the cart summary meta data', async ({ request }) => {
    const response = await request.get(`${cart_summary_url}/meta`);

    await expect(response).toBeOK();

    const body = await response.json();

    const { isCartOptimized } = body.results[0];

    await expect(isCartOptimized).toBe(false);
  });
});
