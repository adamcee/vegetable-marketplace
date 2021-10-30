import PropTypes from 'prop-types'
import React from 'react'
import { APIResource } from '../../lib/frontend/data/apiResource'
import ErrorHandler from '../common/ErrorHandler'
import Loader from '../common/Loader'

// TODO: Figure out how to preserve type information or PropType information for swrKeyOptions

interface APIResourceController {
  resource: APIResource<any, any>
  successView: (data: any) => JSX.Element
  loadingView: () => JSX.Element
  errorView: (error: Error) => JSX.Element
  swrKeyOptions?: any
}

APIResourceController.propTypes = {
  // TODO: Add shape to resource propType?
  resource: PropTypes.object,
  swrKeyOptions: PropTypes.object,
  successView: PropTypes.func.isRequired,
  loadingView: PropTypes.func,
  errorView: PropTypes.func,
}

APIResourceController.defaultProps = {
  loadingView: Loader,
  errorView: ErrorHandler,
  swrKeyOptions: {},
}

export default function APIResourceController({
  swrKeyOptions,
  errorView,
  loadingView,
  resource,
  successView,
}: APIResourceController) {
  // Pass swrKeyOptions to getKey function for swr
  const { data, error } = resource.useSWRHook({ ...swrKeyOptions, ...resource.defaultSWRKeyOptions })

  const renderLoadingView = () => !loadingView ? <Loader/> : loadingView()

  if (!data && !error) return <>{renderLoadingView()}</>

  if (error) {
    return !errorView ? <ErrorHandler error={error} /> : errorView(error)
  }

  // This is an edge case, but makes Typescript happy as it ensures
  // that `data` will always exist when `data` is passed as a prop into <WrappedComponent/>
  if (!data) return <>{renderLoadingView()}</>

  // Data fetched successfully.
  // Inject data into ViewComponent along w/whatever other props ViewComponent expects, and render ViewComponent.
  // @ts-ignore
  return <>{successView(data)}</>
}
