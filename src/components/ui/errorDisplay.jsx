export default function errorHandler({ error }) {
  return (
    <div role="alert">
      <p>An error has occurred:</p>
      <p>{error}</p>
    </div>
  )
}
