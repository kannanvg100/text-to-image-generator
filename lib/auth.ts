import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import init from './mongodb'
import User from '../models/User'

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		Google({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
	],
	events: {
		async signIn(message) {
			init()
			try {
				await User.findOneAndUpdate(
					{ email: message.user.email, method: message.account?.provider },
					{
						name: message.user.name,
						email: message.user.email,
						picture: message.user.image,
					},
					{ upsert: true }
				)
			} catch (err) {
				console.log('db na')
			}
		},
	},
}
