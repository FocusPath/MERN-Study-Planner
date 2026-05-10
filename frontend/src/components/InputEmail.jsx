const InputEmail = ({title = "Email"}) => {
  return (
    <form >
      <h2 className="text-xl font-semibold p-2">{title}</h2>
      <input
      type="email"
      placeholder="Enter your email"
      className="w-full rounded-2xl border p-6"
    />
    </form>
  )
}

export default InputEmail