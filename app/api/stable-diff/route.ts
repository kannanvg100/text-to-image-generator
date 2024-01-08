import { NextResponse } from 'next/server'
import Replicate from 'replicate'

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url)
		const query = searchParams.get('query')

		await new Promise((resolve) => setTimeout(resolve, 5000))
		return NextResponse.json({
			success: true,
			output: [
				'https://replicate.com/api/models/stability-ai/stable-diffusion/files/50fcac81-865d-499e-81ac-49de0cb79264/out-0.png',
			],
		})

		const replicate = new Replicate({
			auth: process.env.REPLICATE_API_TOKEN,
		})

		const model = 'stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf'
		const input = { prompt: query }
		const output = await replicate.run(model, { input })

		return NextResponse.json({ success: true, output })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ success: false, error })
	}
}
