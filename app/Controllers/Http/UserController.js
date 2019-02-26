'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class UserController {
  async create ({ request }){
    const data = request.only(['username','email', 'password'])
    const user = await User.create(data)
    return user
  }
  async update({ request }) {
    const data = request.only(['username', 'email', 'password', 'id'])
    const user = await User.find(data.id);
    user.merge(data);
    await user.save()
    return user
  }

  async delete({ params, response }){
    const { id } = params
    const user = await User.find(id);
    await user.delete()
    response.status(200).send()
  }
}

module.exports = UserController
