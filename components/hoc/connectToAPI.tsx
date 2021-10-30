import PropTypes from 'prop-types'
import Loader from "../common/Loader";
import ErrorHandler from "../common/ErrorHandler";
import { APIResource } from '../../lib/frontend/data/apiResource';
import React from 'react';

/**
 * This is a function which creates a higher-order component
 * that requests and renders data from an API call, with error/loading
 * state handling.
 *
 * It passes in one of our "useData" hooks (usually an "useSWR" hook
 * and sets up proper loading/error messages so that the component will now
 * gracefully & correctly request and render data.
 */

export default function connectToAPI<ViewComponentProps, SWRKeyOptions>(ViewComponent: React.ComponentType<ViewComponentProps>, resource: APIResource<any, SWRKeyOptions>) {


    // Type info for the `swrKeyOptions` prop which ConnectedComponent will have.
    // Example: <MyConnectedComponent swrKeyOptions={{ mustBeTruthy: true }} />
    interface DefaultConnectedComponentProps {
        // Make required b/c its hard to programmatically set this. Better to be required
        // and be an empty object than to forget it when it is needed.
        swrKeyOptions: SWRKeyOptions
        // Make required b/c its hard to programmatically set this. Better to be required so we dont forget
        // when it is needed.
        getQueryFromRouter: boolean
    }

    // This allows Typescript Type info for ViewComponent props to be exposed on ConnectedComponent
    // so we get the desired Type info in our editor.
    // Note that we don't actually want to expose the `data` prop on ConnectedComponent, as we inject data
    // here ourselves on receiving successful API call response.
    type ConnectedComponentProps =  DefaultConnectedComponentProps & Omit<ViewComponentProps, "data">

    function ConnectedComponent({ swrKeyOptions, getQueryFromRouter, ...props }: ConnectedComponentProps ) {
        // Pass swrKeyOptions to getKey function for swr
        const { data, error } = resource.useSWRHook(swrKeyOptions, getQueryFromRouter)

        if (!data && !error) return <Loader />
        if (error) return <ErrorHandler error={error} />
        // This is an edge case, but makes Typescript happy as it ensures
        // that `data` will always exist when `data` is passed as a prop into <WrappedComponent/>
        if (!data) return <Loader />

        // Data fetched successfully.
        // Inject data into ViewComponent along w/whatever other props ViewComponent expects, and render ViewComponent.
        // @ts-ignore
        return <ViewComponent data={data} {...props} />
    }

    // Safely get rid of `data` from ViewComponent propTypes, defaultProps, as we pass
    // data in here and don't want to expose that.
    const viewComponentPropTypes = { ...ViewComponent.propTypes }
    // @ts-ignore
    delete viewComponentPropTypes.data

    ConnectedComponent.propTypes = {
        // terrible hack
        ...viewComponentPropTypes,
        // Make required b/c its hard to programmatically set this. Better to be required
        // and be an empty object than to forget it when it is needed.
        swrKeyOptions: PropTypes.object.isRequired,
        // Make required b/c its hard to programmatically set this. Better to be required so we dont forget
        // when it is needed.
        // When true we will use Next.js router.query to grab query params and
        // build our swr key (api route) from it.
        getQueryFromRouter: PropTypes.bool.isRequired,
    }

    const viewComponentDefaultProps = { ...ViewComponent.defaultProps }
    // @ts-ignore
    delete viewComponentDefaultProps.data

    ConnectedComponent.defaultProps = {
        // terrible hack
        ...viewComponentDefaultProps,
    }

    return ConnectedComponent;
}
