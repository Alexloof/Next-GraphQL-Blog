import Post from './Post'
import User from './User'
import Comment from './Comment'
import Like from './Like'
import Auth from './Auth'

const Root = /* GraphQL */ `
	# The dummy queries and mutations are necessary because
	# graphql-js cannot have empty root types and we only extend
	# these types later on
	# Ref: apollographql/graphql-tools#293
	type Query {
		dummy: String
	}
	type Mutation {
		dummy: String
	}
	type Subscription {
		dummy: String
	}
	schema {
		query: Query
		mutation: Mutation
		subscription: Subscription
	}
`

export default [Root, Post, User, Comment, Like, Auth]
