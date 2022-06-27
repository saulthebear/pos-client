const locale = "en-US"
const currency = "USD"

const formatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: currency,
  minimumFractionDigits: 2,
})

export const centsToDollars = (cents) => {
  return cents / 100
}

export const formatCurrency = (cents) => {
  return formatter.format(centsToDollars(cents))
}

export const formatDate = (date) => {
  return date.toLocaleDateString(locale)
}

export const formatTime = (date) => {
  return date.toLocaleTimeString(locale)
}

export const formatDateTime = (date) => {
  return `${formatDate(date)} ${formatTime(date)}`
}

export const getAuthOptions = () => {
  const token = localStorage.getItem("jwt")
  const options = {
    headers: {
      Authorization: token,
    },
  }
  return options
}
