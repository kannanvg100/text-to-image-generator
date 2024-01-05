import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
export const authOptions: NextAuthOptions = {
	// Secret for Next-auth, without this JWT encryption/decryption won't work
	secret: process.env.NEXTAUTH_SECRET,

	// Configure one or more authentication providers
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
}
