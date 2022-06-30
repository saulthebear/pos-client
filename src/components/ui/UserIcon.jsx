import PropTypes from "prop-types"

export default function UserIcon({ isAdmin }) {
  return (
    <div className="flex items-center justify-center mr-2">
      {isAdmin ? (
        <span className="material-symbols-rounded text-red-700 font-bold">
          admin_panel_settings
        </span>
      ) : (
        <span className="material-symbols-rounded text-slate-900 font-bold">
          account_circle
        </span>
      )}
    </div>
  )
}

UserIcon.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
}
