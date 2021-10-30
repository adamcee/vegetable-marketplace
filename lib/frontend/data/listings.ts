import { Listing } from '.prisma/client'
import { APIResource, DefaultSWRKeyOptions, GetSWRKey } from './apiResource'
import createUseSWRHook from './createUseSWRHook'

/**
 * Listings
 * /api/listings
 */

export interface KeyOptions extends DefaultSWRKeyOptions {
  myListings?: boolean
}

const getListingsKey: GetSWRKey<KeyOptions> = ({ router, options }) => {
  const { myListings } = options
  const queryParams = myListings ? '?myListings=true' : ''
  const key = `/api/listings${queryParams}`
  console.log('key is ', key)
  return key
}

export const ListingsAPIResource: APIResource<Listing[], KeyOptions> = {
  useSWRHook: createUseSWRHook<Listing[], KeyOptions>(getListingsKey),
}
