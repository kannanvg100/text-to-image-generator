import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut, useSession } from 'next-auth/react'

export function UserNavbar() {
	const { data: session, status } = useSession()
	const userEmail = session?.user?.email
	const userImage = session?.user?.image
	const userName = session?.user?.name
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={userImage || ''} alt="@shadcn" />
					<AvatarFallback>SD</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
                <DropdownMenuLabel className='text-xs font-normal'>{userName}</DropdownMenuLabel>
                <DropdownMenuLabel className='text-xs font-light'>{userEmail}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='cursor-pointer' onClick={() => signOut()}>
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
