const InputPassword = ({ title = "Password", value, onChange }) => {
  return (
    <form>
      <h2 className="text-xl font-semibold p-2">{title}</h2>
      <input
        type="password"
        placeholder="Enter your password"
        className="w-full rounded-2xl border p-6"
        value={value}
        onChange={onChange}
      />
    </form>
  )
}

export default InputPassword