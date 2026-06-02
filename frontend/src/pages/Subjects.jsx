import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Card from '../components/Card.jsx'
import api from '../lib/api.js'
import { getCurrentEmail } from '../lib/auth.js'

const subjectColors = [
	'red',
	'blue',
	'green',
	'yellow',
	'purple',
	'pink',
	'orange',
]

const Subjects = () => {
	const email = getCurrentEmail()
	const [subjects, setSubjects] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [subjectName, setSubjectName] = useState('')
	const [editingId, setEditingId] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const loadSubjects = async () => {
			try {
				const response = await api.get('/subjects', { params: { email } })
				setSubjects(response.data.subjects || [])
			} finally {
				setLoading(false)
			}
		}

		loadSubjects()
	}, [email])

	const addOrUpdateSubject = async () => {
		if (!subjectName.trim()) return

		try {
			if (editingId) {
				const response = await api.patch(`/subjects/${editingId}`, { title: subjectName }, { params: { email } })
				setSubjects(response.data.subjects || [])
			} else {
				const randomColor = subjectColors[Math.floor(Math.random() * subjectColors.length)]
				const response = await api.post('/subjects', { title: subjectName, color: randomColor }, { params: { email } })
				setSubjects(response.data.subjects || [])
			}
		} finally {
			setSubjectName('')
			setEditingId(null)
			setShowModal(false)
		}
	}

	const deleteSubject = async (id) => {
		const response = await api.delete(`/subjects/${id}`, { params: { email } })
		setSubjects(response.data.subjects || [])
	}

	const editSubject = (subject) => {
		setSubjectName(subject.title)
		setEditingId(subject.id)
		setShowModal(true)
	}

	return (
		<div className="flex min-h-screen bg-black text-white">
			<Navbar />

			<main className="flex-1 px-6 py-16">
				<section className="mx-auto max-w-6xl">
					<div className="max-w-2xl">
						<h1 className="text-4xl font-semibold uppercase tracking-[0.3em] text-gray-500">Subjects</h1>
					</div>

					<div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
						{loading ? (
							<p className="text-gray-300">Loading subjects...</p>
						) : subjects.length === 0 ? (
							<p className="text-gray-300">No subjects yet. Add one to start tracking your study plan.</p>
						) : subjects.map((item) => (
							<div key={item.id} className="relative">
								<Card color={item.color} title={item.title} caption={item.caption} />
								<div className="absolute right-3 top-3 flex gap-2">
									<button onClick={() => editSubject(item)} className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600">Edit</button>
									<button onClick={() => deleteSubject(item.id)} className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600">Delete</button>
								</div>
							</div>
						))}
					</div>
				</section>
			</main>

			<button
				type="button"
				onClick={() => setShowModal(true)}
				aria-label="Add subject"
				className="fixed bottom-8 right-8 flex h-14 w-14 pb-1 items-center justify-center rounded-full bg-gray-300 text-3xl text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-white"
			>
				+
			</button>

			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/70">
					<div className="w-full max-w-md rounded-xl bg-white p-6 text-black shadow-2xl">
						<h2 className="mb-4 text-2xl font-semibold">{editingId ? 'Edit Subject' : 'Add Subject'}</h2>

						<input
							type="text"
							placeholder="Enter subject name"
							value={subjectName}
							onChange={(e) => setSubjectName(e.target.value)}
							className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
						/>

						<div className="mt-5 flex justify-end gap-3">
							<button
								onClick={() => {
									setShowModal(false)
									setEditingId(null)
									setSubjectName('')
								}}
								className="rounded-lg bg-gray-300 px-4 py-2 hover:bg-gray-400"
							>
								Cancel
							</button>

							<button onClick={addOrUpdateSubject} className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800">
								{editingId ? 'Update' : 'Add'}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Subjects