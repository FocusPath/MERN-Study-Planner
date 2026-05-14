import Navbar from '../components/Navbar.jsx'
import Card from '../components/Card.jsx'
import { useState } from 'react'

// test data
const examsTest = [
	{
		id: 1,
		title: 'Physics',
		date: new Date('2026-05-11T10:30:00'),
		topics: ['Oscillations and Waves',
			'Gravitational Field',
			'Electronics',
			'Electromagnetism'],
		isTopicDone: [1, 0, 1, 0],
	},
	{
		id: 2,
		title: 'Chemistry',
		date: new Date('2026-05-11T10:30:00'),
		topics: [
			'Organic Chemistry',
			'Thermochemistry',
			'Electrochemistry'
		],
		isTopicDone: [1, 1, 0]
	},
]

const FormTypes = {
	ADD_EXAM: 'add',
	EDIT_EXAM: 'changeName',
}

//https://www.w3schools.com/react/react_forms.asp
const Exams = () => {
	// exams is current state
	// setExams updates exams
	// examsTest is inital state
	const [exams, setExams] = useState(examsTest) // access all exams (this is a hook)

	// temporarly saves user inputs
	const [examName, setExamName] = useState('')
	const [examDate, setExamDate] = useState('')


	// keeps track of current exam being edited
	const [editId, setEditId] = useState(null)

	// when a form should appear
	const [showForm, setShowForm] = useState(false);
	// what type of form sould appear
	const [typeForm, setTypeForm] = useState(null)

	function calculateProgress(isTopicDone) { //https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
		const sum = isTopicDone.reduce((partialSum, a) => partialSum + a, 0);
		if (isTopicDone.length === 0) {
			return 0
		}
		return (sum / isTopicDone.length * 100).toFixed(1)
	}

	function deleteExam(id) {
		setExams(exams.filter((exam) => exam.id !== id))

	}

	function newID() {
		const newId = exams.length + 1;
		return newId;
	}

	function editingTopics() {
		
	}

	function addExam() {
		// validate inputs
		if (!examName.trim()) {
			alert('Please enter exam name')
			return
		}
		if (!examDate.trim()) {
			alert('Please enter exam date')
			return
		}

		const newExam = {
			// id: newID(),
			id: 5,
			title: examName,
			date: new Date(examDate),
			topics: [],
			isTopicDone: []
		}

		// prev gets latest state
		setExams(prev => [...prev, newExam])

		// reset tracking variables
		resetInputs();
	}

	function resetInputs() {
		setExamName('')
		setExamDate('')
		setEditId(null)
		setShowForm(false)
		setTypeForm(null)
	}

	// function editExam(exam) {
	// 	setEditText(exam.title)
	// 	//setEditDate(exam.date)
	// 	//setExams(exam.topics)
	// 	setShowForm(false)
	// }

	// function editTopicCheck(isTopicDone) {
	// 	setExams()
	// }

	return (
		<div className="flex min-h-screen bg-black text-white">
			<Navbar />

			<main className="flex-1 px-6 py-16">
				<section className="mx-auto max-w-6xl">
					<h1 className="text-4xl font-semibold uppercase tracking-[0.3em] text-gray-500">Exams</h1>
					<p className="mt-6 text-gray-300">Track upcoming exams.</p>

					<div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
						{
							exams.map((item) => (
								<div>
									<Card
										color={'blue'}
										title={`${item.title}`}
										caption={`${item.date.toLocaleString()}`}
										caption={`${calculateProgress(item.isTopicDone)}%`}
									/>


									<button onClick={() => {
										//editExam(item)
									}}
										className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
									>
										Edit
									</button>

									<button
										onClick={() => deleteExam(item.id)}
										className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
									>
										Delete
									</button>





								</div>

							))
						}
					</div>
				</section>

			</main>


			<button
				type="button"
				aria-label="Add Exam"
				onClick={() => { setShowForm(true), setTypeForm(FormTypes.ADD_EXAM) }}
				className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-gray-300 text-3xl leading-none text-black shadow-lg transition-transform hover:scale-105 pb-1.5"
			>
				+
			</button>

			{/* comparison uses === instead of == */}
			{showForm && typeForm === FormTypes.ADD_EXAM && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/70">
					<div className="w-full max-w-md rounded-xl bg-white p-6 text-black shadow-2xl">
						<h2 className="mb-4 text-2xl font-semibold">
							ADD EXAM!
						</h2>

						<input className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
							type="text"
							placeholder='Enter Exam name'
							value={examName}
							onChange={(e) => setExamName(e.target.value)} />

						<input className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-black"
							type="date"
							placeholder='Enter Exam date'
							value={examDate}
							onChange={(e) => setExamDate(e.target.value)} />

						<button onClick={() => {
							addExam()
						}}
							className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
						>
							Submit
						</button>

						<button
							onClick={() => resetInputs()}
							className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
						>
							Cancel
						</button>

					</div>

				</div>

			)}
		</div>
	)
}

export default Exams
