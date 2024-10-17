
import { test, expect } from '@playwright/test';
import { log } from 'console';

const LOCALHOST_URL = 'http://localhost:5173/'
const PREFIX_ENDPOINT_CAT_IMG = `https://cataas.com`

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  console.log({textContent});
  
  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(PREFIX_ENDPOINT_CAT_IMG)).toBeTruthy()

});
