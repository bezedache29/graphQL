let users = [
  {id : 1, name: "Jake", email: "jack@gmail.com", age: 17},
  {id : 2, name: "Paul", email: "paul@gmail.com", age: 18},
]

const messageHello = "Hello !"

const resolvers = {
  Query: {
    hello: (parent, args, context, info) => messageHello,
    users: () => users,
    user: (parent, { id }) => (
      users.find(user => user.id == id)
    )
  },
  Mutation: {
    createUser: (parent, { id, name, email, age }) => {
      // Check si l'id existe deja
      let checkID = users.findIndex(user => user.id == id)
      // Si checkID return -1, l'id n'existe pas, on cré le user sinon on renvoie une erreur
      if (checkID == -1 ) {
        let newUser = { id, name, email, age }
        users.push(newUser)
        return newUser
      } else {
        throw new Error('ID already taken')
      }
    },
    deleteUser: (parent, {id}) => {
      // Check si l'id existe
      let checkID = users.findIndex(user => user.id == id)
      // Si checkID ne return pas -1, c'est que l'id existe
      if (checkID != -1) {
        // Splice = (A partir de quel index ?, Combien d'elements je supprime ?)
        users.splice(checkID, 1)
        return true
      } else {
        throw new Error('unknown ID')
      }
    }
  }
}

export default resolvers