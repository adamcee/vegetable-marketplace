import { Listing } from '.prisma/client'
import { NextRouter } from 'next/router';
import { APIResource, GetSWRKey } from './apiResource';
import createUseSWRHook from './createUseSWRHook'

/**
 * Listing
 * api/listing/[id]
 */

export interface KeyOptions {
  foo?: string
}

// TODO - This is a use case where the `getQueryFromRouter` flag should have `createUseSWRHook` function
// automatically do this work for us.
const swrKey: GetSWRKey<KeyOptions> = ({ router }) => {
  const id = router?.query?.id
  return id ? `/api/listings/${id}` : null
}

export const ListingAPIResource: APIResource<Listing, KeyOptions> = {
  useSWRHook: createUseSWRHook<Listing, KeyOptions>(swrKey),
}
