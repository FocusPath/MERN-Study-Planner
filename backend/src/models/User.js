import mongoose from "mongoose";

const createSchemaTransform = () => ({
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const SubjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    color: { type: String, default: "#4f83ff" },
    caption: { type: String, default: "" },
  },
  { timestamps: true, toJSON: createSchemaTransform(), toObject: createSchemaTransform() }
);

const ExamTopicSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: false, toJSON: createSchemaTransform(), toObject: createSchemaTransform() }
);

const ExamSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    color: { type: String, default: "#10b981" },
    date: { type: String, default: "" },
    time: { type: String, default: "" },
    topics: { type: [ExamTopicSchema], default: [] },
  },
  { timestamps: true, toJSON: createSchemaTransform(), toObject: createSchemaTransform() }
);

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    profile: {
      displayName: { type: String, default: "" },
      bio: { type: String, default: "Your Focus Path workspace is ready." },
    },
    subjects: { type: [SubjectSchema], default: [] },
    exams: { type: [ExamSchema], default: [] },
  },
  { timestamps: true, toJSON: createSchemaTransform(), toObject: createSchemaTransform() }
);

const User = mongoose.model("User", UserSchema);

export default User;