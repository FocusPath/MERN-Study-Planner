import Navbar from '../components/Navbar.jsx'

const Profile = () => {
	return (
		<div className="flex min-h-screen bg-black text-white">
			<Navbar />

			<main className="flex-1 px-6 py-16">
				<section className="mx-auto max-w-6xl">
					<h1 className="text-4xl font-semibold uppercase tracking-[0.3em] text-gray-500">Profile</h1>
					<p className="mt-6 text-gray-300">Manage account details and preferences.</p>
				</section>
			</main>
		</div>
	)
}

export default Profile
