import { Box } from '@mui/system'
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import ConnectedListing from '../../components/listing/ConnectedListingCard';
import ResourceController from '../../components/common/APIResourceView';
import ListingCard from '../../components/listing/ListingCard';
import ErrorHandler from '../../components/common/ErrorHandler';
import Loader from '../../components/common/Loader';
import { ListingAPIResource } from '../../lib/frontend/data/listing';

const Listing: NextPage = () => {
    const SuccessView = (data: any) => <ListingCard data={data}/>

    return (
        <Box m={4}>
            <ResourceController
                resource={ListingAPIResource}
                getQueryFromRouter={true}
                swrKeyOptions={{}}
                successView={SuccessView}
            />
        </Box>
    )
}

export default Listing
