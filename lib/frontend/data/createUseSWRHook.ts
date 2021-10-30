import { useRouter } from 'next/router'
import useSWR from 'swr'
import { GetSWRKey } from './apiResource'
import { fetcher } from './helpers'

export type UseSWRHook<APIResponseType, SWRKeyOptions> = (
  options: SWRKeyOptions,
  getQueryFromRouter: boolean,
) => {
  data: APIResponseType | undefined
  error: Error | undefined
}

export default function createUseSWRHook<APIResponseType, SWRKeyOptions>(
  key: GetSWRKey<SWRKeyOptions>,
): UseSWRHook<APIResponseType, SWRKeyOptions> {
  return function (options, getQueryFromRouter) {
    // Inject Next.js router so we can use router.query, etc
    const router = useRouter()
    const keyWrapper = () => key({ router, options, getQueryFromRouter })

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

type QueryParamValue = string

// A rule function performs
type ValidatorFunction = (value: QueryParamValue) => boolean

/**
 * Object representing a required router query param.
 * For example: /listings/[id] route would have required query param key `id`,
 * so that we can confirm the router's full path is `/listing/xyz123` and has actual id.
 *
 * For URL query params, like `/listings/xyz123?extraThing=false`, `extraThing`
 * would also be a required query param and we would set mustBeTruthy: false.
 *
 * So we would have two RequiredQueryParamKeyObj like so:
 * ```
 * { key: "id", mustBeTruthy: true } -- assuming `id` should always be truthy
 * { key: "extraThing", mustBeTruthy: false }
 * ```
 */
interface RequiredQueryParamKey {
  key: string
  // Flags for common validation rules such as "val must be truthy"
  mustBeTruthy: boolean
  // Rules for the programmer to decide on and set
  // validators?: ValidatorFunction[]
}
