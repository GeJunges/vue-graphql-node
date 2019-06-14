export const resolvers = {
  Query: {
    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({})
        .sort({ createdDate: 'desc' })
        .populate({
          path: 'createdBy',
          model: 'User'
        })
      return posts
    }
  },
  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorId },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        creatorId,
        createdBy: creatorId
      }).save()
      return newPost
    },
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
}
