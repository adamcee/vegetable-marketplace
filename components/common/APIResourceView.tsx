import PropTypes from 'prop-types'
import React from 'react'
import { APIResource } from '../../lib/frontend/data/apiResource'
import ErrorHandler from '../common/ErrorHandler'
import Loader from '../common/Loader'

interface ResourceControllerProps {
  resource: APIResource<any, any>
  successView: (data: any) => JSX.Element
  loadingView: () => JSX.Element
  errorView: (error: Error) => JSX.Element
  swrKeyOptions: any
  getQueryFromRouter: boolean
}

ResourceController.propTypes = {
  // TODO: Add shape
  resource: PropTypes.object,
  swrKeyOptions: PropTypes.object,
  successView: PropTypes.node.isRequired,
  loadingView: PropTypes.node,
  errorView: PropTypes.node,
  getQueryFromRouter: PropTypes.bool,
}

ResourceController.defaultProps = {
  loadingView: Loader,
  errorView: ErrorHandler,
}

export default function ResourceController({
  swrKeyOptions,
  getQueryFromRouter,
  errorView,
  loadingView,
  resource,
  successView,
}: ResourceControllerProps) {
  // Pass swrKeyOptions to getKey function for swr
  const { data, error } = resource.useSWRHook(swrKeyOptions, getQueryFromRouter)

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
