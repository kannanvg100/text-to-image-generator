'use client'
import ChatWindow from '@/components/ChatWindow'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import Providers from './Providers'

export default function Page() {
	return (
		<>
			<Providers>
				<div className="flex min-h-screen flex-col justify-between items-center gap-4 w-full max-w-screen-md mx-auto p-3">
					<div className="w-full h-10">
						<Navbar />
					</div>
					<main className="flex-grow w-full max-w-[550px] flex items-end">
						<ChatWindow />
					</main>
				</div>
				<Toaster />
			</Providers>
		</>
	)
}
