import { localStore } from '@/utils/storage'
import { PERMISSION } from '@/constants'
export default {
  bind(el, binding) {
    let permissions = localStore.get(PERMISSION)
    let hasPermission = false
    if (permissions && permissions.length) {
      hasPermission = permissions.map(item => item.key).includes(binding.value)
    }

    if (!hasPermission) {
      if (el) {
        el.style.display = 'none'
      }
    }
  },
}
