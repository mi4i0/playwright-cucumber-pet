import { expect, test } from '@playwright/test'

test('create user post', async ({ request }) => {
  const response = await request.post('/posts', {
      data: {
          title: 'New Post',
          body: 'This is a new post',
          userId: 1
      }
  })

  expect(response.status()).toBe(201)
  expect(await response.json()).toEqual(expect.objectContaining({
      "body" : "This is a new post",
      "id" : 101,
      "title" : "New Post",
      "userId" : 1
  }))
})
