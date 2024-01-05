'use client'
import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ComponentPlaceholderIcon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

interface DataItem {
	image: string
	prompt: string
}

export default function ChatWindow() {
	const [query, setQuery] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()
    const scrollRef = useRef<HTMLDivElement>(null)
	const [data, setData] = useState<DataItem[]>([
		{
			image: 'https://replicate.com/api/models/stability-ai/stable-diffusion/files/50fcac81-865d-499e-81ac-49de0cb79264/out-0.png',
			prompt: 'a professional rat photoframe',
		},
	])

	const handleSubmit = async () => {
		setIsLoading(true)
		try {
			if (query.trim() === '') return
			const res = await fetch(`/api/stable-diff?query=${query}`).then((res) => res.json())
			if (res?.success) {
				setData((prev) => [...prev, { image: res.output[0], prompt: query }])
				setQuery('')
                scrollRef.current?.scrollIntoView(false)
			} else {
				toast({
					title: 'Oops! Something went wrong.',
					description: 'Please try again later',
				})
			}

			setIsLoading(false)
		} catch (e) {
			toast({
				title: 'Oops! Something went wrong.',
				description: 'Please try again later',
			})
			setIsLoading(false)
		}
	}
	return (
		<div className="flex-grow flex flex-col justify-end gap-2 self-stretch">
			<ScrollArea ref={scrollRef} className="flex flex-col justify-end items-end rounded-md max-h-[calc(100vh-130px)] mx-1 snap-end">
				{data.map((item, i) => (
					<div key={i}>
						<div className="flex justify-end px-4">
							<p className="text-xs p-2 italic border rounded-lg bg-slate-200">{item?.prompt}</p>
						</div>
						<Card className="w-[300px] rounded-lg mt-2">
							<Image src={item.image} alt={item.prompt} width={300} height={300} className="rounded-lg" />
						</Card>
					</div>
				))}

				{isLoading && (
					<div>
						<div className="flex justify-end px-4">
							<p className="text-xs p-2 italic border rounded-lg bg-slate-200">{query}</p>
						</div>
						<Skeleton className="rounded-lg w-[300px] h-[300px] mt-2" />
					</div>
				)}
			</ScrollArea>
			<div className="flex gap-2">
				<Input
					type="text"
					placeholder="type your prompt here"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="flex-grow"
				/>
				<Button disabled={isLoading} onClick={handleSubmit}>
					{isLoading && <ComponentPlaceholderIcon className="mr-2 h-4 w-4 animate-spin" />}
					Send
				</Button>
			</div>
		</div>
	)
}
