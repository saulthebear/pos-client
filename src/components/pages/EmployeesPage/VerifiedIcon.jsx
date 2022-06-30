import PropTypes from "prop-types"

export default function VerifiedIcon({ isVerified }) {
  if (isVerified)
    return (
      <span className="material-symbols-rounded text-green-700 font-bold">
        verified
      </span>
    )

  return (
    <span className="material-symbols-rounded text-red-700 font-bold">
      dangerous
    </span>
  )
}

VerifiedIcon.propTypes = {
  isVerified: PropTypes.bool.isRequired,
}
