import Navbar from '../components/Navbar.jsx'

function addMessage(container, from, text) {
	const wrapper = document.createElement('div')
	const isUser = from === 'You'
	wrapper.className = `mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`

	const bubble = document.createElement('div')
	bubble.className = isUser
		? 'max-w-[78%] rounded-2xl rounded-br-md bg-cyan-500 px-4 py-3 text-slate-950 shadow-sm'
		: 'max-w-[78%] rounded-2xl rounded-bl-md border border-white/15 bg-white/10 px-4 py-3 text-slate-100 shadow-sm backdrop-blur-sm'

	const sender = document.createElement('p')
	sender.className = isUser ? 'mb-1 text-xs font-semibold text-slate-900/80' : 'mb-1 text-xs font-semibold text-cyan-200'
	sender.textContent = `${from}:`

	const message = document.createElement('p')
	message.className = 'text-sm leading-relaxed'
	message.textContent = text

	bubble.appendChild(sender)
	bubble.appendChild(message)
	wrapper.appendChild(bubble)
	container.appendChild(wrapper)
	container.scrollTop = container.scrollHeight
}

const AskAI = () => {
	function sendMessage(event) {
		event.preventDefault()

		const form = event.currentTarget
		const input = form.querySelector('input[name="message"]')
		const messages = document.getElementById('ask-ai-messages')

		if (!input || !messages) return

		const userText = input.value.trim()
		if (!userText) return

		addMessage(messages, 'You', userText)
		input.value = ''

		setTimeout(() => {
			addMessage(messages, 'FocusAI', 'Message recieved, please await for a response.')
		}, 300)
	}

	return (
		<div className="flex min-h-screen bg-black text-white">
			<Navbar />
			<main className="flex-1 px-4 py-6 md:px-10 md:py-10">
				<section className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 shadow-2xl backdrop-blur-md">
					<div className="border-b border-white/10 px-5 py-4 md:px-7">
						<h1 className="text-2xl font-bold tracking-tight text-slate-100 md:text-3xl">FocusAI</h1>
						<p className="mt-1 text-sm text-slate-300">Powered by Google Gemini</p>
					</div>

					<div
						id="ask-ai-messages"
						className="h-[62vh] overflow-y-auto bg-gradient-to-b from-slate-900/20 to-slate-950/20 px-4 py-5 md:px-6"
					>
						<div className="mb-4 flex justify-start">
							<div className="max-w-[78%] rounded-2xl rounded-bl-md border border-white/15 bg-white/10 px-4 py-3 text-slate-100 shadow-sm backdrop-blur-sm">
								<p className="mb-1 text-xs font-semibold text-cyan-200">FocusAI:</p>
								<p className="text-sm leading-relaxed">Hi! Ask me anything about your studies.</p>
							</div>
						</div>
					</div>

					<form onSubmit={sendMessage} className="border-t border-white/10 bg-slate-950/40 p-4 md:p-5">
						<div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-slate-900/70 p-2 shadow-inner">
							<input
								name="message"
								type="text"
								placeholder="Ask about exams, subjects, or study tips..."
								className="flex-1 bg-transparent px-2 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400"
							/>
							<button
								type="submit"
								className="rounded-xl bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
							>
								Send
							</button>
						</div>
					</form>
				</section>
			</main>
		</div>
	)
}

export default AskAI
