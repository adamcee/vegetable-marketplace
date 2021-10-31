import { Listing } from '.prisma/client'
import { NextRouter } from 'next/router'
import { APIResource, DefaultSWRKeyOptions, GetSWRKey } from './apiResource'
import createUseSWRHook from './createUseSWRHook'

/**
 * Listing
 * api/listing/[id]
 */

export interface KeyOptions extends DefaultSWRKeyOptions {}

interface QueryParam {
  key: string
  val: string | number | boolean
}

const swrKeyWrapper = ({
  requiredParams = [], // TODO: Do we need to have a `mustExist` prop for each required param key?
  apiPathname,
  paramsToAppend, // TODO: This needs
  router,
}: {
  requiredParams?: string[]
  apiPathname?: string
  paramsToAppend?: QueryParam[]
  router: NextRouter
}) => {
  const path = apiPathname || router.pathname
  // TODO: Check if path already has `?`. Check if it has ampersand at end or not.
  const { query } = router
  // TODO: If query.hasOwnProperty(someRequiredParamKey) is false, we return null - key returns null
}

// TODO - This is a use case where the `getQueryFromRouter` flag should have `createUseSWRHook` function
// automatically do this work for us.
const swrKey: GetSWRKey<KeyOptions> = ({ router }) => {
  const id = router?.query?.id
  return id ? `/api/listings/${id}` : null
}

export const ListingAPIResource: APIResource<Listing, KeyOptions> = {
  useSWRHook: createUseSWRHook<Listing, KeyOptions>(swrKey),
  defaultSWRKeyOptions: {
    getQueryFromRouter: true,
    requiredParams: ['id'],
    apiPathname: '/api/listings/[id]',
  },
}
