import { useEffect } from 'react'
import Navbar from '../components/Navbar.jsx'

const TIMER_STORAGE_KEY = 'focuspath-study-timer-state'

function getDefaultTimerState() {
	return {
		initialSeconds: 25 * 60,
		remainingSeconds: 25 * 60,
		running: false,
		status: 'Ready',
		snoozed: false,
	}
}

function loadTimerState() {
	if (typeof window === 'undefined') {
		return getDefaultTimerState()
	}

	const saved = window.localStorage.getItem(TIMER_STORAGE_KEY)
	if (!saved) {
		return getDefaultTimerState()
	}

	try {
		return { ...getDefaultTimerState(), ...JSON.parse(saved) }
	} catch {
		return getDefaultTimerState()
	}
}

let timerId = null
let timerState = loadTimerState()

const StudyTimer = () => {
	function saveTimerState() {
		window.localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timerState))
	}

	function formatTime(totalSeconds) {
		const minutes = Math.floor(totalSeconds / 60)
		const seconds = totalSeconds % 60
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
	}

	function setNavbarVisible(isVisible) {
		const nav = document.getElementById('app-nav')
		const toggle = document.getElementById('nav-toggle')

		if (nav) {
			nav.classList.toggle('hidden', !isVisible)
			nav.classList.toggle('flex', !isVisible)
		}

		if (toggle) {
			toggle.classList.toggle('hidden', isVisible)
			toggle.classList.toggle('flex', !isVisible)
		}
	}

	function updateDisplay() {
		const display = document.getElementById('study-timer-display')
		if (display) {
			display.textContent = formatTime(timerState.remainingSeconds)
		}
	}

	function updateStatus(text) {
		const status = document.getElementById('study-timer-status')
		if (status) {
			status.textContent = text
		}
	}

	function updateButton(text) {
		const button = document.getElementById('study-timer-button')
		if (button) {
			button.textContent = text
		}
	}

	function syncUI() {
		updateDisplay()
		updateStatus(timerState.status)
		if (timerState.running) {
			updateButton('Pause')
			setNavbarVisible(false)
			return
		}

		setNavbarVisible(true)
		if (timerState.remainingSeconds === 0) {
			updateButton('Start')
			return
		}

		if (timerState.status === 'Paused') {
			updateButton('Resume')
			return
		}

		updateButton('Start')
	}

	function stopTimer(message) {
		if (timerId) {
			clearInterval(timerId)
			timerId = null
		}

		timerState.running = false
		timerState.status = message
		saveTimerState()
		setNavbarVisible(true)
		updateButton('Start')
		updateStatus(message)

		if (message === 'Time is up') {
			// only play alarm and show snooze if not snoozed already
			if (!timerState.snoozed) {
				playAlarm()
				showSnoozeButton()
			}
		}
	}

	function playAlarm() {
		const audio = document.getElementById('study-timer-audio')
		if (!audio) return
		audio.currentTime = 0
		audio.loop = true
		const p = audio.play()
		if (p && typeof p.catch === 'function') p.catch(() => {})
	}

	function stopAlarm() {
		const audio = document.getElementById('study-timer-audio')
		if (!audio) return
		audio.pause()
		audio.currentTime = 0
	}

	function snoozeAlarm() {
		// stop the alarm audio, mark snoozed, and remove the snooze button
		stopAlarm()
		hideSnoozeButton()
		// mark snoozed so alarm won't appear again until a new timer starts
		timerState.snoozed = true
		timerState.running = false
		saveTimerState()
		syncUI()
	}

	function showSnoozeButton() {
		const controls = document.getElementById('study-timer-controls')
		if (!controls) return
		// do not show snooze if already snoozed
		if (timerState.snoozed) return
		if (document.getElementById('study-timer-snooze')) return

		const btn = document.createElement('button')
		btn.id = 'study-timer-snooze'
		btn.type = 'button'
		btn.className = 'rounded-xl bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-yellow-300'
		btn.textContent = 'Snooze'
		btn.addEventListener('click', snoozeAlarm)
		controls.appendChild(btn)
	}

	function hideSnoozeButton() {
		const btn = document.getElementById('study-timer-snooze')
		if (btn && btn.parentNode) btn.parentNode.removeChild(btn)
	}

	function startTimer() {
		// kept for compatibility; real start happens in startTimerWithMinutes
		showModal()
	}

	function startTimerWithMinutes(minutes) {
		if (!minutes || minutes <= 0) return

		timerState.initialSeconds = minutes * 60
		timerState.remainingSeconds = timerState.initialSeconds
		// starting a new timer clears any previous snooze
		timerState.snoozed = false
		timerState.running = true
		timerState.status = 'Running'
		saveTimerState()
		syncUI()

		if (timerId) {
			clearInterval(timerId)
		}

		timerId = setInterval(() => {
			if (timerState.remainingSeconds <= 1) {
				timerState.remainingSeconds = 0
				saveTimerState()
				updateDisplay()
				stopTimer('Time is up')
				return
			}

			timerState.remainingSeconds -= 1
			saveTimerState()
			updateDisplay()
		}, 1000)
	}

	function showModal() {
		const modal = document.getElementById('study-timer-modal')
		const input = document.getElementById('study-timer-minutes')
		if (!modal) return
		modal.classList.remove('hidden')
		modal.classList.add('flex')
		setTimeout(() => input && input.focus(), 50)
	}

	function hideModal() {
		const modal = document.getElementById('study-timer-modal')
		if (!modal) return
		modal.classList.add('hidden')
		modal.classList.remove('flex')
	}

	function handleToggleTimer() {
		if (!timerState.running && (timerState.remainingSeconds === timerState.initialSeconds || timerState.remainingSeconds === 0)) {
			startTimer()
			return
		}

		if (timerState.running) {
			if (timerId) {
				clearInterval(timerId)
				timerId = null
			}

			timerState.running = false
			timerState.status = 'Paused'
			saveTimerState()
			syncUI()
			return
		}

		if (timerState.remainingSeconds > 0) {
			timerState.running = true
			timerState.status = 'Running'
			saveTimerState()
			syncUI()
			timerId = setInterval(() => {
				if (timerState.remainingSeconds <= 1) {
					timerState.remainingSeconds = 0
					saveTimerState()
					updateDisplay()
					stopTimer('Time is up')
					return
				}

				timerState.remainingSeconds -= 1
				saveTimerState()
				updateDisplay()
			}, 1000)
		}
	}

	function handleReset() {
		if (timerId) {
			clearInterval(timerId)
			timerId = null
		}

		timerState.running = false
		timerState.remainingSeconds = timerState.initialSeconds
		timerState.status = 'Ready'
		timerState.snoozed = false
		saveTimerState()
		syncUI()
		stopAlarm()
		hideSnoozeButton()
	}

	useEffect(() => {
		syncUI()

		if (timerState.running && !timerId) {
			timerId = setInterval(() => {
				if (timerState.remainingSeconds <= 1) {
					timerState.remainingSeconds = 0
					saveTimerState()
					updateDisplay()
					stopTimer('Time is up')
					return
				}

				timerState.remainingSeconds -= 1
				saveTimerState()
				updateDisplay()
			}, 1000)
		}

		// wire modal buttons once
		const confirm = document.getElementById('study-timer-modal-confirm')
		const cancel = document.getElementById('study-timer-modal-cancel')
		const input = document.getElementById('study-timer-minutes')

		function onConfirm() {
			const n = Number(input && input.value)
			hideModal()
			if (n && n > 0) startTimerWithMinutes(n)
		}

		function onCancel() {
			hideModal()
		}

		if (confirm) confirm.addEventListener('click', onConfirm)
		if (cancel) cancel.addEventListener('click', onCancel)

		return () => {
			if (confirm) confirm.removeEventListener('click', onConfirm)
			if (cancel) cancel.removeEventListener('click', onCancel)
		}
	}, [])

	return (
		<div className="flex min-h-screen bg-black text-white">
			<Navbar />

			<main className="flex flex-1 items-center justify-center px-4 py-8 md:px-10">
				<section className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900/40 px-6 py-8 shadow-2xl backdrop-blur-md md:px-10 md:py-12">
					<h1 className="text-4xl font-semibold uppercase tracking-[0.3em] text-gray-500">STUDY TIMER</h1>
					<p className="mt-3 text-sm text-slate-300">Pomodoro timer for your focused study sessions.</p>

					<div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-950/40 px-6 py-10 text-center">
						<div
							id="study-timer-display"
							className="text-7xl font-bold tracking-tight text-cyan-200 md:text-8xl"
						>
							{formatTime(timerState.remainingSeconds)}
						</div>
						<p id="study-timer-status" className="mt-4 text-sm uppercase tracking-[0.3em] text-slate-400">
							{timerState.status}
						</p>

						<div id="study-timer-controls" className="mt-8 flex flex-wrap items-center justify-center gap-3">
							<button
								id="study-timer-button"
								type="button"
								onClick={handleToggleTimer}
								className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
							>
										{timerState.running ? 'Pause' : timerState.status === 'Paused' ? 'Resume' : 'Start'}
							</button>
							<button
								type="button"
								onClick={handleReset}
								className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
							>
								Reset
							</button>

						</div>
					</div>
				</section>
			</main>
				<audio id="study-timer-audio" src="src/assets/alarm.mp3" />

				{/* Modal for minutes input (hidden by default) */}
				<div id="study-timer-modal" className="fixed inset-0 z-50 hidden">
					{/* overlay */}
					<div className="absolute inset-0 bg-black/50" />
					{/* centered dialog */}
					<div className="fixed inset-0 flex items-center justify-center p-4">
						<div className="w-full max-w-sm rounded-lg bg-slate-900 p-6 shadow-lg">
							<h3 className="mb-3 text-lg font-semibold">Set timer (minutes)</h3>
							<input id="study-timer-minutes" type="number" min="1" defaultValue="25" className="w-full rounded border border-white/10 bg-transparent px-3 py-2 text-white outline-none" />
							<div className="mt-4 flex justify-end gap-3">
								<button id="study-timer-modal-cancel" className="rounded bg-white/5 px-4 py-2 text-sm text-white">Cancel</button>
								<button id="study-timer-modal-confirm" className="rounded bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900">Start</button>
							</div>
						</div>
					</div>
				</div>
		</div>
	)
}

export default StudyTimer
