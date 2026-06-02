import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Mascot from '../assets/Mascot.png'
import api from '../lib/api.js'
import { getCurrentEmail } from '../lib/auth.js'
import { clearCurrentEmail } from '../lib/auth.js'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
	const email = getCurrentEmail()
	const navigate = useNavigate()
	const [profile, setProfile] = useState({ displayName: '', bio: '' })
	const [subjectCount, setSubjectCount] = useState(0)
	const [examCount, setExamCount] = useState(0)
	const [deleting, setDeleting] = useState(false)

	useEffect(() => {
		const loadProfile = async () => {
			const response = await api.get('/me', { params: { email } })
			setProfile(response.data.user.profile || { displayName: '', bio: '' })
			setSubjectCount(response.data.user.subjects?.length || 0)
			setExamCount(response.data.user.exams?.length || 0)
		}

		loadProfile()
	}, [email])

	async function deleteAccount() {
		setDeleting(true)
		try {
			await api.delete('/me', { params: { email } })
			clearCurrentEmail()
			navigate('/login', { replace: true })
		} finally {
			setDeleting(false)
		}
	}

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


							<h2 className="mt-6 text-2xl font-semibold text-white">{profile.displayName || 'Focus Path User'}</h2>
							<p className="mt-2 text-sm text-gray-300">{email}</p>

							<div className="mt-6 space-y-3 text-left">
								<div className="grid grid-cols-2 gap-3 text-center">
									<div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
										<p className="text-2xl font-semibold">{subjectCount}</p>
										<p className="text-xs uppercase tracking-[0.3em] text-gray-400">Subjects</p>
									</div>
									<div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
										<p className="text-2xl font-semibold">{examCount}</p>
										<p className="text-xs uppercase tracking-[0.3em] text-gray-400">Exams</p>
									</div>
								</div>
								<button type="button" onClick={deleteAccount} disabled={deleting} className="w-full rounded-2xl bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60">
									{deleting ? 'Deleting...' : 'Delete account'}
								</button>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}

export default Profile
