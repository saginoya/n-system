import { Core as YubinBangoCore } from 'yubinbango-core2'
import { ref } from 'vue'

export const useFetchAddress = () => {
  const address = ref('')

  type Addr = {
    region: string
    locality: string
    street: string
  }
  const fetchAddress = (postalCode: string): void => {
    new YubinBangoCore(postalCode, (addr: Addr) => {
      address.value = addr.region + addr.locality + addr.street
    })
  }

  const clearAddress = (): void => {
    address.value = ''
  }

  return {
    address,
    fetchAddress,
    clearAddress
  }
}
