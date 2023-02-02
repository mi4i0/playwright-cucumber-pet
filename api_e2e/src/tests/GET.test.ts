import { expect, test } from '@playwright/test'

test('retrieve user posts', async ({ request }) =>  {
  const response = await request.get('/posts')
  expect(response.ok()).toBeTruthy()
  expect(response.status()).toBe(200)
})

test('retrieve user post', async ({ request }) => {
  const response = await request.get('/posts/1')
  expect(response.ok()).toBeTruthy()
  expect(response.status()).toBe(200)
  expect(await response.json()).toEqual(expect.objectContaining({
    "id":1,
    "userId":1
  }))
})

test('cannot retrieve animals', async ({ request }) =>  {
  const response = await request.get('/animals')
  expect(response.ok()).toBeFalsy()
  expect(response.status()).toBe(404)
  expect(response.statusText()).toEqual("Not Found")
})
