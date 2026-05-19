import Navbar from '../components/Navbar.jsx'
import Card from '../components/Card.jsx'
import CheckBox from '../components/CheckBox.jsx'
import { useState } from 'react'

// test data
const examsTest = [
	{
		id: 1,
		title: 'Physics',
		date: new Date('2026-05-11T10:30:00'),
		topics: [{ topic: "Oscillations and Waves", done: true }, { topic: "Gravitational Field", done: true }, { topic: "Electronics", done: true }, { topic: "Electromagnetism", done: false }]
	},
	{
		id: 2,
		title: 'Chemistry',
		date: new Date('2026-05-12T10:30:00'),
		topics: [{ topic: "Organic Chemistry", done: true }, { topic: "Thermochemistry", done: false }, { topic: "Electrochemistry", done: false }, { topic: "Mole Calculation", done: false }]
	},
]

const FormTypes = {
	ADD_EXAM: 'add',
	EDIT_EXAM: 'changeName',
	VIEW_EXAM: 'viewExam'
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

	const [topicName, setTopicName] = useState('')
	const [examTopics, setExamTopics] = useState([])

	// keeps track of current exam being edited/viewed
	const [selectedId, setSelectedId] = useState(null)

	// when a form should appear
	const [showForm, setShowForm] = useState(false);
	// what type of form sould appear
	const [typeForm, setTypeForm] = useState(null)

	const selectedExam = exams.find(exam => exam.id === selectedId);

	function calculateProgress(topics) { //https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
		const sum = topics.reduce(
			(count, item) => count + (item.done ? 1 : 0), 0
		);
		if (topics.length === 0) {
			return 0;
		}
		return (sum / topics.length * 100).toFixed(1)
	}

	function deleteExam(id) {
		setExams(exams.filter((exam) => exam.id !== id))

	}

	function addExam() {
		if (!examName.trim()) {
			alert('Please enter exam name');
			return;
		}
		if (!examDate.trim()) {
			alert('Please enter exam date');
			return;
		}
		// Optionally: require at least one topic
		if (examTopics.length === 0) {
			alert('Please add at least one topic');
			return;
		}
		const newExam = {
			id: Date.now(),
			title: examName,
			date: new Date(examDate),
			topics: examTopics,
		};
		setExams(prev => [...prev, newExam]);
		resetInputs();
	}


	function resetInputs() {
		setExamName('');
		setExamDate('');
		setSelectedId(null);
		setShowForm(false);
		setTypeForm(null);
		setTopicName('');
		setExamTopics([]);
	}

	function editExam() {
		// validate inputs
		if (!examName.trim()) {
			alert('Please enter exam name')
			return
		}
		if (!examDate.trim()) {
			alert('Please enter exam date')
			return
		}

		if (examTopics.length === 0) {
			alert('Please add at least one topic');
			return;
		}

		setExams(prev =>
			prev.map(exam =>
				exam.id === selectedId
					? { ...exam, title: examName, date: new Date(examDate),topics: examTopics }

					: exam
			)
		)

		// reset tracking variables
		resetInputs();
	}

	function toggleTopic(index) { setExams(prev => prev.map(exam => exam.id === selectedId ? { ...exam, topics: exam.topics.map((topic, i) => i == index ? { ...topic, done: !topic.done } : topic) } : exam)) }

	function deleteTopic(index) {
		setExams(prev =>
			prev.map(exam =>
				exam.id === selectedId
					? {
						...exam,
						topics: exam.topics.filter((_, i) => i !== index)
					}
					: exam
			)
		)
	}

	function addTopic() {
		if (!topicName.trim()) {
			alert('Please enter a topic name');
			return;
		}
		const newTopic = {
			topic: topicName,
			done: false,
		};
		setExamTopics((prev) => [...prev, newTopic]);
		setTopicName('');
	}

	const CancelButton = ({ onClick }) => {
		return (
			<button
				onClick={onClick}
				className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
			>
				Cancel
			</button>
		)
	}

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
										caption={`${item.date.toLocaleString()} || ${calculateProgress(item.topics)}%`}
									/>


									<button onClick={() => {
										setShowForm(true), setTypeForm(FormTypes.VIEW_EXAM), setSelectedId(item.id)
									}}
										className="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
									>
										View
									</button>

									<button onClick={() => {
										// setShowForm(true), setTypeForm(FormTypes.EDIT_EXAM), setExamDate(item.date.toLocaleDateString()), setExamName(item.title), setSelectedId(item.id)
										setShowForm(true), setTypeForm(FormTypes.EDIT_EXAM), setExamDate(item.date.toLocaleDateString()), setExamName(item.title), setSelectedId(item.id) ,setExamTopics(item.topics)
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
					<div className="w-full max-w-md max-h-[90vh] overflow-y rounded-xl bg-white p-6 text-black shadow-2xl">
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
						<hr className="my-2 border-gray-500" />
						<h1 className="mb-4 text-2xl font-semibold">
							ADD TOPICS!
						</h1>
						<div className="flex gap-2">
							<input
								className="flex-1 rounded border p-2"
								type="text"
								placeholder="New topic"
								value={topicName}
								onChange={e => setTopicName(e.target.value)}
							/>
							<button onClick={addTopic}>Add</button>
						</div>
						<div className="flex gap-2">
							{examTopics.map((topic, index) => (
								<div key={index} className="flex items-center gap-2 rounded-lg border p-2">
									<div>{topic.topic}</div>
									<button onClick={() => setExamTopics(examTopics.filter((_, i) => i !== index))}>Delete</button>
								</div>
							))}
						</div>

						<button onClick={() => {
							addExam()
						}}
							className="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
						>
							Submit
						</button>

						<CancelButton onClick={resetInputs} />

					</div>

				</div>

			)}

			{/* floating form for editing exam */}
			{showForm && typeForm === FormTypes.EDIT_EXAM && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/70">
					<div className="w-full max-w-md max-h-[90vh] overflow-y rounded-xl bg-white p-6 text-black shadow-2xl">
						<h2 className="mb-4 text-2xl font-semibold">
							EDIT EXAM!
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

						<hr className="my-2 border-gray-500" />
						<h1 className="mb-4 text-2xl font-semibold">
							EDIT TOPICS!
						</h1>

						<div className="flex gap-2">
							<input
								className="flex-1 rounded border p-2"
								type="text"
								placeholder="New topic"
								value={topicName}
								onChange={e => setTopicName(e.target.value)}
							/>
							<button onClick={addTopic} className="rounded bg-gray-600 px-2 py-1 text-white hover:bg-gray-800">Add</button>
						</div>
						<div className="flex flex-col gap-2 mt-2">
  {examTopics.map((topic, index) => (
    <div key={index} className="flex gap-2">
      <div className="flex-1 rounded border p-2">{topic.topic}</div>
      <button
        onClick={() => setExamTopics(examTopics.filter((_, i) => i !== index))}
        className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  ))}
</div>

						<button onClick={() => {
							editExam();
							
						}}
							className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
						>
							Save
						</button>

						<CancelButton onClick={resetInputs} />

					</div>

				</div>

			)}

			{/* floating form for viewing exam */}
			{showForm && typeForm === FormTypes.VIEW_EXAM && selectedExam && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/70"
					onClick={resetInputs}>
					<div className="w-full max-w-md  max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 text-black shadow-2xl"
						onClick={(e) => e.stopPropagation()}>
						<h2 className="mb-4 text-2xl font-semibold">
							{selectedExam.title}
						</h2>

						<p className="mt-2 text-sm leading-6 text-slate-600"><strong>Exam Date: </strong>{`${selectedExam.date.toLocaleDateString()} `}</p>
						<p className="mt-2 text-sm leading-6 text-slate-600"><strong>Exam Time: </strong>{`${selectedExam.date.toLocaleTimeString()} `}</p>
						<p className="mt-2 text-sm leading-6 text-slate-600"> <strong>Topic Progress: </strong>{`${calculateProgress(selectedExam.topics)}%`}</p>
						<hr className="my-2 border-gray-500" />
						<strong className="mt-2 text-sm bold leading-6 text-slate-600">{"TOPICS!"}</strong>
						<div className="mt-4 space-y-2">
							{selectedExam.topics.map((topic, index) => (
								<CheckBox
									topic={topic}
									onToggle={() => toggleTopic(index)} />
							))}
						</div>
					</div>

				</div>

			)}
		</div>
	)
}

export default Exams
