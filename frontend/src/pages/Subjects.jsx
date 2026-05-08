import Navbar from '../components/Navbar.jsx'
import Card from '../components/Card.jsx'

const cardItems = [
	{
		title: 'Subject One',
        color: 'red',
		caption: 'Subject one caption.',
	},
	{
		title: 'Subject Two',
        color: 'blue',
		caption: 'Subject two caption.',
	},
	{
		title: 'Subject Three',
        color: 'green',
		caption: 'Subject three caption.',
	},
	{
		title: 'Subject Four',
        color: 'yellow',
		caption: 'Subject four caption.',
	},
]

const Subjects = () => {
	return (
		<div className="flex min-h-screen bg-black text-white">
			<Navbar />

			<main className="flex-1 px-6 py-16">
				<section className="mx-auto max-w-6xl">
					<div className="max-w-2xl">
						<h1 className="text-4xl font-semibold uppercase tracking-[0.3em] text-gray-500">
							Subjects
						</h1>
					</div>

					<div className="mt-12 grid gap-5 xl:grid-cols-4">
						{cardItems.map((item) => (
							<Card key={item.title} color={item.color} title={item.title} caption={item.caption} />
						))}
					</div>
				</section>
			</main>

			<button
				type="button"
				aria-label="Add subject"
				className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-gray-300 text-3xl leading-none text-black shadow-lg transition-transform hover:scale-105 pb-1.5"
			>
				+
			</button>
		</div>
	)
}

export default Subjects
