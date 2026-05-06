import Card from '../components/Card.jsx'

const cardItems = [
	{
		title: 'Card One',
        color: 'red',
		caption: 'Card one caption.',
	},
	{
		title: 'Card Two',
        color: 'blue',
		caption: 'Card two caption.',
	},
	{
		title: 'Card Three',
        color: 'green',
		caption: 'Card three caption.',
	},
	{
		title: 'Card Four',
        color: 'yellow',
		caption: 'Card four caption.',
	},
]

const HomePage = () => {
	return (
		<main className="min-h-screen bg-black px-6 py-16 text-white">
			<section className="mx-auto max-w-6xl">
				<div className="max-w-2xl">
					<h1 className="text-4xl font-semibold uppercase tracking-[0.3em] text-gray-500">
						Home Page
					</h1>
				</div>

				<div className="mt-12 grid gap-5 xl:grid-cols-4">
					{cardItems.map((item) => (
						<Card key={item.title} color={item.color} title={item.title} caption={item.caption} />
					))}
				</div>
			</section>

		</main>
	)
}

export default HomePage
