const SESSION_EMAIL_KEY = 'focuspath-session-email'

export function getCurrentEmail() {
  if (typeof window === 'undefined') {
    return ''
  }

  return window.localStorage.getItem(SESSION_EMAIL_KEY) || ''
}

export function setCurrentEmail(email) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(SESSION_EMAIL_KEY, email)
}

export function clearCurrentEmail() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(SESSION_EMAIL_KEY)
}