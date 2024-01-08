'use client'

import { Button } from '@/components/ui/button'
import { UserNavbar } from './UserNavbar'
import Link from 'next/link'
import { ComponentPlaceholderIcon } from '@radix-ui/react-icons'
import { useSession } from 'next-auth/react'

export default function UserAvatar() {
    const { data: session, status } = useSession()
	if (status === 'loading') {
		return (
			<Button disabled className="flex justify-center items-center gap-1">
				<ComponentPlaceholderIcon className="mr-2 h-4 w-4 animate-spin" />
				<p>Wait...</p>
			</Button>
		)
	}

	if (status === 'authenticated') {
		return <UserNavbar />
	}

	return (
		<div className="flex gap-2 justify-center">
			<Link href="/api/auth/signin" passHref>
				<Button>Sign in</Button>
			</Link>
		</div>
	)
}
