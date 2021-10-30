import { useRouter } from 'next/router'
import useSWR from 'swr'
import { DefaultSWRKeyOptions, GetSWRKey } from './apiResource'
import { fetcher } from './helpers'

export type UseSWRHook<APIResponseType, SWRKeyOptions> = (
  options: DefaultSWRKeyOptions|SWRKeyOptions,
) => {
  data: APIResponseType | undefined
  error: Error | undefined
}

export default function createUseSWRHook<APIResponseType, SWRKeyOptions>(
  key: GetSWRKey<SWRKeyOptions|DefaultSWRKeyOptions>,
): UseSWRHook<APIResponseType, SWRKeyOptions|DefaultSWRKeyOptions> {
  return function (options){
    // Inject Next.js router so we can use router.query, etc
    const router = useRouter()
    const keyWrapper = () => key({ router, options })

    // swr will attempt to execute our key function. If our key function returns
    // null swr will not attempt an API call.
    // See https://swr.vercel.app/docs/conditional-fetching
    const { data, error } = useSWR<APIResponseType, Error>(keyWrapper, fetcher)

    return {
      data,
      error,
    }
  }
}
