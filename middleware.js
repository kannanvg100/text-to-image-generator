import { NextResponse } from 'next/server'

export async function middleware(req) {
	const pathname = req.nextUrl.pathname
	if (pathname.startsWith('/api/auth/signin')) {
		const token = req.cookies.get('next-auth.session-token')
		if (token) {
			return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_URL, req.url))
		}
	}
	return NextResponse.next()
}
