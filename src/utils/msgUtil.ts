import { createDiscreteApi } from 'naive-ui'

const { message, dialog, loadingBar } = createDiscreteApi(['message', 'dialog', 'loadingBar'])

const msgUtil = {
  $message: message,
  $dialog: dialog,
  $loadingBar: loadingBar
}

export default msgUtil
