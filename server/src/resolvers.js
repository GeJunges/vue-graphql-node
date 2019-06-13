export const Query = {
  getUser: () => null
}
export const Mutation = {
  signupUser: async (_, { userName, email, password }, { User }) => {
    const user = await User.findOne({ userName: userName })
    if (user) {
      throw new Error('User already exist')
    }
    const newUser = await new User({
      userName,
      email,
      password
    }).save()
    return newUser
  }
}
