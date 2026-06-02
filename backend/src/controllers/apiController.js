import User from "../models/User.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COLOR_POOL = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#ec4899", "#f97316"];

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function isValidEmail(email) {
  return EMAIL_REGEX.test(normalizeEmail(email));
}

function buildDisplayName(email) {
  const [localPart] = normalizeEmail(email).split("@");
  if (!localPart) {
    return "Focus Path User";
  }

  return localPart
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function starterSubjects() {
  return [
    { title: "Mathematics", color: COLOR_POOL[1], caption: "Build your first study lane here." },
    { title: "Science", color: COLOR_POOL[2], caption: "Track experiments, notes, and revision." },
  ];
}

function starterExams() {
  return [
    {
      title: "First Mock Exam",
      color: COLOR_POOL[0],
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      time: "10:30",
      topics: [
        { topic: "Core concepts", done: true },
        { topic: "Revision questions", done: false },
        { topic: "Past paper practice", done: false },
      ],
    },
  ];
}

function createStarterUser(email) {
  const displayName = buildDisplayName(email);
  return {
    email,
    profile: {
      displayName,
      bio: "Your Focus Path workspace is ready.",
    },
    subjects: starterSubjects(),
    exams: starterExams(),
  };
}

async function getUserForEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  if (!isValidEmail(normalizedEmail)) {
    const error = new Error("A valid email address is required.");
    error.status = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    return existingUser;
  }

  return User.create(createStarterUser(normalizedEmail));
}

function parseResourceId(req) {
  return req.params.id;
}

function applyPatch(target, payload) {
  Object.entries(payload || {}).forEach(([key, value]) => {
    if (value !== undefined) {
      target[key] = value;
    }
  });
}

function fail(res, error) {
  const status = error?.status || 500;
  return res.status(status).json({ message: error?.message || "Unexpected server error" });
}

export async function login(req, res) {
  try {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    const user = await getUserForEmail(email);
    return res.json({ message: "Logged in successfully.", user });
  } catch (error) {
    return fail(res, error);
  }
}

export async function getMe(req, res) {
  try {
    const user = await getUserForEmail(req.query.email);
    return res.json({ user });
  } catch (error) {
    return fail(res, error);
  }
}

export async function updateProfile(req, res) {
  try {
    const user = await getUserForEmail(req.query.email);
    applyPatch(user.profile, {
      displayName: req.body?.displayName,
      bio: req.body?.bio,
    });
    await user.save();
    return res.json({ message: "Profile updated.", profile: user.profile, user });
  } catch (error) {
    return fail(res, error);
  }
}

export async function listSubjects(req, res) {
  try {
    const user = await getUserForEmail(req.query.email);
    return res.json({ subjects: user.subjects });
  } catch (error) {
    return fail(res, error);
  }
}

export async function createSubject(req, res) {
  try {
    const user = await getUserForEmail(req.query.email);
    const title = String(req.body?.title || "").trim();
    if (!title) {
      return res.status(400).json({ message: "Subject title is required." });
    }

    const subject = {
      title,
      color: req.body?.color || COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)],
      caption: req.body?.caption || `${title} is ready for revision.`,
    };

    user.subjects.push(subject);
    await user.save();

    return res.status(201).json({ message: "Subject created.", subject: user.subjects[user.subjects.length - 1], subjects: user.subjects });
  } catch (error) {
    return fail(res, error);
  }
}

export async function updateSubject(req, res) {
  try {
    const user = await getUserForEmail(req.query.email);
    const subject = user.subjects.id(parseResourceId(req));
    if (!subject) {
      return res.status(404).json({ message: "Subject not found." });
    }

    applyPatch(subject, {
      title: req.body?.title,
      color: req.body?.color,
      caption: req.body?.caption,
    });

    await user.save();
    return res.json({ message: "Subject updated.", subject, subjects: user.subjects });
  } catch (error) {
    return fail(res, error);
  }
}

export async function deleteSubject(req, res) {
  try {
    const user = await getUserForEmail(req.query.email);
    const subject = user.subjects.id(parseResourceId(req));
    if (!subject) {
      return res.status(404).json({ message: "Subject not found." });
    }

    subject.deleteOne();
    await user.save();
    return res.json({ message: "Subject deleted.", subjects: user.subjects });
  } catch (error) {
    return fail(res, error);
  }
}

export async function listExams(req, res) {
  try {
    const user = await getUserForEmail(req.query.email);
    return res.json({ exams: user.exams });
  } catch (error) {
    return fail(res, error);
  }
}

export async function createExam(req, res) {
  try {
    const user = await getUserForEmail(req.query.email);
    const title = String(req.body?.title || "").trim();
    if (!title) {
      return res.status(400).json({ message: "Exam title is required." });
    }

    const exam = {
      title,
      color: req.body?.color || COLOR_POOL[Math.floor(Math.random() * COLOR_POOL.length)],
      date: req.body?.date || "",
      time: req.body?.time || "",
      topics: Array.isArray(req.body?.topics) ? req.body.topics : [],
    };

    user.exams.push(exam);
    await user.save();

    return res.status(201).json({ message: "Exam created.", exam: user.exams[user.exams.length - 1], exams: user.exams });
  } catch (error) {
    return fail(res, error);
  }
}

export async function updateExam(req, res) {
  try {
    const user = await getUserForEmail(req.query.email);
    const exam = user.exams.id(parseResourceId(req));
    if (!exam) {
      return res.status(404).json({ message: "Exam not found." });
    }

    applyPatch(exam, {
      title: req.body?.title,
      color: req.body?.color,
      date: req.body?.date,
      time: req.body?.time,
      topics: req.body?.topics,
    });

    await user.save();
    return res.json({ message: "Exam updated.", exam, exams: user.exams });
  } catch (error) {
    return fail(res, error);
  }
}

export async function deleteExam(req, res) {
  try {
    const user = await getUserForEmail(req.query.email);
    const exam = user.exams.id(parseResourceId(req));
    if (!exam) {
      return res.status(404).json({ message: "Exam not found." });
    }

    exam.deleteOne();
    await user.save();
    return res.json({ message: "Exam deleted.", exams: user.exams });
  } catch (error) {
    return fail(res, error);
  }
}

export async function deleteUser(req, res) {
  try {
    const normalizedEmail = normalizeEmail(req.query.email);
    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ message: "A valid email address is required." });
    }

    const deletedUser = await User.findOneAndDelete({ email: normalizedEmail });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({ message: "Account deleted." });
  } catch (error) {
    return fail(res, error);
  }
}