import Alert from 'react-s-alert'

export const showSuccessAlert = text => {
  Alert.success(text, {
    position: 'top-right',
    effect: 'jelly',
    beep: false,
    timeout: 4000,
    offset: 30
  })
}

export const showErrorAlert = text => {
  Alert.error(text, {
    position: 'top-right',
    effect: 'jelly',
    beep: false,
    timeout: 4000,
    offset: 30
  })
}
