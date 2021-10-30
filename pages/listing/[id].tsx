import { Box } from '@mui/system'
import type { NextPage } from 'next'
import APIResourceController from '../../components/common/APIResourceController';
import ListingCard from '../../components/listing/ListingCard';
import { ListingAPIResource } from '../../lib/frontend/data/listing';

const Listing: NextPage = () => {
    const SuccessView = (data: any) => <ListingCard data={data}/>

    return (
        <Box m={4}>
            <APIResourceController
                resource={ListingAPIResource}
                successView={SuccessView}
            />
        </Box>
    )
}

export default Listing
