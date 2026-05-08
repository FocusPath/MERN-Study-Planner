import Navbar from '../components/Navbar.jsx'

const Exams = () => {
	return (
		<div className="flex min-h-screen bg-black text-white">
			<Navbar />

			<main className="flex-1 px-6 py-16">
				<section className="mx-auto max-w-6xl">
					<h1 className="text-4xl font-semibold uppercase tracking-[0.3em] text-gray-500">Exams</h1>
					<p className="mt-6 text-gray-300">Track upcoming exams.</p>
				</section>
			</main>

            <button
				type="button"
				aria-label="Add Exam"
				className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-gray-300 text-3xl leading-none text-black shadow-lg transition-transform hover:scale-105 pb-1.5"
			>
				+
			</button>
		</div>
	)
}

export default Exams
