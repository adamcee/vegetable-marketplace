/**
 * We use a function to get the SWR key so that we can implement SWR conditional fetching.
 * If key is null swr does not make API call; this is a feature
 * See https://swr.vercel.app/docs/conditional-fetching

 * This allows us to gracefully handle cases in next.js (like clientside 1st render before route exists)
 * where this code may be called but route param/slug does not yet exist.
 * We can return `null` for the key value and SWR will know to not yet execute an AJAX request to the API to get data.
 **/
import { NextRouter } from 'next/router'
import PropTypes from 'prop-types'
import { UseSWRHook } from './createUseSWRHook'

export type GetSWRKey<SWRKeyOptions> = ({
  router,
  options,
  getQueryFromRouter,
}: {
  router?: NextRouter
  options: SWRKeyOptions
  getQueryFromRouter?: boolean
}) => string | null

export interface DefaultSWRKeyOptions {
  // Get query param vals for API route from Next.js router.query
  getQueryFromRouter?: boolean
  // TODO: Rename `mustBeTruthy` to something more specific ...
  // All query param vals must be truthy
  mustBeTruthy?: true
  [key: string]: string|boolean|number|undefined
}

/**
 * Represents some resource accessible by API.
 * Usually the API will be a Next.js Page API.
 *
 * What this interface does is give us a "module" where we can store all the critical information
 * about our API "resource" needed to generate helper code.
 *
 * Use in conjunction with createUseSWRHook()
 */

export interface APIResource<APIResponseType, SWRKeyOptions> {
  useSWRHook: UseSWRHook<APIResponseType, SWRKeyOptions>
  defaultSWRKeyOptions?: DefaultSWRKeyOptions
}

/**
 * Required propTypes for a component used as a "Resource View"
 *
 * A "Resource View" is any component which actually does the rendering of data
 * once the data is successfully received from an APIResource.
 *
 * IMPORTANT - a view should _only_ be rendered when data already exists.
 * It's parent component should handle loading/error logic and associated views.
 */
export interface ResourceViewProps {
  // The view's parent component must manage loading/error states, etc.
  data: any
}

export const RESOURCE_VIEW_PROP_TYPES = {
  data: PropTypes.any.isRequired,
}
