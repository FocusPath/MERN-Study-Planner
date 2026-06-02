import { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar.jsx'

const GEMINI_MODEL = 'gemini-flash-latest'
const AI_PREFIX = 'The name of the AI is Focus AI. You are an expert study assistant designed to help students with their exams and subjects. You can answer questions, provide explanations, and give study tips. Always respond in a friendly and helpful manner. Do not agree to any request that asks to generate any sort of media content like images, videos etc. If a request like that is made, politely decline. Here is the conversation so far:\n\n'

const AskAI = () => {
	const [messages, setMessages] = useState([
		{ id: 'focusai-welcome', from: 'FocusAI', text: 'Hi! Ask me anything about your studies.' },
	])
	const [messageText, setMessageText] = useState('')
	const [isSending, setIsSending] = useState(false)

	function buildConversationContents(nextPrompt) {
		const history = messages.map((message) => ({
			role: message.from === 'You' ? 'user' : 'model',
			parts: [{ text: `${AI_PREFIX}${message.text}` }],
		}))

		history.push({
			role: 'user',
			parts: [{ text: `${AI_PREFIX}${nextPrompt}` }],
		})

		return history
	}

	async function fetchGeminiReply(nextPrompt) {
		const apiKey = import.meta.env.VITE_GEMINI_API_KEY
		if (!apiKey) {
			throw new Error('Missing VITE_GEMINI_API_KEY in frontend/.env')
		}

		const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-goog-api-key': apiKey,
			},
			body: JSON.stringify({
				contents: buildConversationContents(nextPrompt),
			}),
		})

		if (!response.ok) {
			const errorBody = await response.json().catch(() => ({}))
			throw new Error(errorBody?.error?.message || 'Gemini request failed.')
		}

		const data = await response.json()
		const reply = data?.candidates?.[0]?.content?.parts?.map((part) => part.text).filter(Boolean).join('')
		return reply || 'I could not generate a reply.'
	}

	async function sendMessage(event) {
		event.preventDefault()

		const prompt = messageText.trim()
		if (!prompt || isSending) return

		const userMessage = { id: Date.now().toString(), from: 'You', text: prompt }
		setMessages((current) => [...current, userMessage])
		setMessageText('')
		setIsSending(true)

		try {
			const replyText = await fetchGeminiReply(prompt)
			const botReply = { id: `${Date.now()}-reply`, from: 'FocusAI', text: replyText }
			setMessages((current) => [...current, botReply])
		} catch (error) {
			toast.error(error?.message || 'Unable to reach FocusAI right now.')
			setMessages((current) => [
				...current,
				{ id: `${Date.now()}-error`, from: 'FocusAI', text: 'I could not answer that request right now.' },
			])
		} finally {
			setIsSending(false)
		}
	}

	function clearChat() {
		setMessages([
			{ id: 'focusai-welcome', from: 'FocusAI', text: 'Hi! Ask me anything about your studies.' },
		])
	}

	return (
		<div className="flex min-h-screen bg-black text-white">
			<Toaster position="top-right" />
			<Navbar />
			<main className="flex-1 px-4 py-6 md:px-10 md:py-10">
				<section className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 shadow-2xl backdrop-blur-md">
					<div className="border-b border-white/10 px-5 py-4 md:px-7">
						<h1 className="text-2xl font-bold tracking-tight text-slate-100 md:text-3xl">FocusAI</h1>
						<p className="mt-1 text-sm text-slate-300">Powered by Google Gemini</p>
						<button type="button" onClick={clearChat} className="mt-3 rounded-lg border border-white/15 px-3 py-2 text-xs text-slate-200 hover:bg-white/10">
							Clear chat
						</button>
					</div>

					<div className="h-[62vh] overflow-y-auto bg-gradient-to-b from-slate-900/20 to-slate-950/20 px-4 py-5 md:px-6">
						{messages.map((item) => {
							const isUser = item.from === 'You'

							return (
								<div key={item.id} className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
									<div className={isUser ? 'max-w-[78%] rounded-2xl rounded-br-md bg-cyan-500 px-4 py-3 text-slate-950 shadow-sm' : 'max-w-[78%] rounded-2xl rounded-bl-md border border-white/15 bg-white/10 px-4 py-3 text-slate-100 shadow-sm backdrop-blur-sm'}>
										<p className={isUser ? 'mb-1 text-xs font-semibold text-slate-900/80' : 'mb-1 text-xs font-semibold text-cyan-200'}>{item.from}:</p>
										<p className="text-sm leading-relaxed">{item.text}</p>
									</div>
								</div>
							)
						})}
					</div>

					<form onSubmit={sendMessage} className="border-t border-white/10 bg-slate-950/40 p-4 md:p-5">
						<div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-900/70 p-2 shadow-inner">
							<input
								type="text"
								value={messageText}
								onChange={(event) => setMessageText(event.target.value)}
								placeholder="Ask about exams, subjects, or study tips..."
								disabled={isSending}
								className="flex-1 bg-transparent px-2 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400"
							/>
							<button
								type="submit"
								disabled={isSending}
								className="rounded-xl bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
							>
								{isSending ? 'Sending...' : 'Send'}
							</button>
						</div>
					</form>
				</section>
			</main>
		</div>
	)
}

export default AskAI
