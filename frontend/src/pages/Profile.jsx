import Navbar from '../components/Navbar.jsx'
import Mascot from '../assets/Mascot.png'

const Profile = () => {
	return (
		<div className="flex min-h-screen bg-black text-white">
			<Navbar />

			<main className="flex-1 px-6 pt-16">
				<section className="mx-auto max-w-6xl">
					<h1 className="text-4xl font-semibold uppercase tracking-[0.3em] text-gray-500">Profile</h1>

					<div className="mt-10 flex justify-center">
						<div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/40 px-8 py-10 text-center shadow-2xl backdrop-blur-md">
							<img
							src={Mascot}
							alt="Profile mascot"
							className="mx-auto h-41 w-41 rounded-full object-cover shadow-[0px_0px_22px_white]"
							/>


							<h2 className="mt-6 text-2xl font-semibold text-white">Focus Path User</h2>
							<p className="mt-2 text-sm text-gray-300">Keep going. Small steps every day build strong results.</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}

export default Profile
