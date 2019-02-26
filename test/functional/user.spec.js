'use strict'

const { test, trait, after, before } = use('Test/Suite')('User')
const User = use('App/Models/User')

trait('Test/ApiClient')

let user = {
  username: 'thebylito',
  email: 'thebylito@gmail.com',
}

 after(async () => {
   const user = await User.findBy('email', 'thebylito@gmail.com')
   if(user){
     await user.delete()
   }
 })
 before(async () => {
   const user = await User.findBy('email', 'thebylito@gmail.com')
   if(user){
     await user.delete()
   }
 })

test('Create a new user', async ({ client }) => {
  const response = await client.post('/user/').send({ ...user, password: '123456'}).end()
  response.assertStatus(200)
  response.assertJSONSubset(user)
  user = {...user, id: response.body.id}
})

test('Edit previous created user', async ({ client }) => {
  const response = await client.put('/user/').send({...user, username: 'thebylito1' }).end()
  user = { ...user, username: 'thebylito1'}
  response.assertStatus(200)
  response.assertJSONSubset(user)
})

test('Delete previous created user', async ({ client }) => {
  const response = await client.delete(`/user/${user.id}`).end()
  response.assertStatus(200)
})
