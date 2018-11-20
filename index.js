import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'

const app = express()

app.get('/', (req, res) => {
  res.send('GraphQL is amazing!')
})

class Friend {
  constructor(id, {firstName, lastName, gender, language, email}) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.gender = gender
    this.language = language
    this.email = email
  }
}

const friendDatabase = {}

const root = { 
  friend: () => {
    return {
      "id": 12634564,
      "firstName": "Edwin",
      "lastName": "Agbenyega",
      "gender": "Male",
      "language": "English",
      "email": "eddy.devv@gmail.com"
    }
  },
  createFriend: ({input}) => {
    let id = require('crypto').randomBytes(10).toString('hex')
    friendDatabase[id] = input
    return new Friend(id, input)
  }
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(8080, () => console.log('Running server on port localhost:8080/graphql'))