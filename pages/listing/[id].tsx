import { Box } from '@mui/system'
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import ConnectedListing from '../../components/listing/ConnectedListingCard';

const Listing: NextPage = () => {
    const router = useRouter()
    console.log('router asPath ', router.asPath)
    console.log('router query ', router.query)
    console.log('router ', router)
    return (
        <Box m={4}>
            <ConnectedListing swrKeyOptions={{}} getQueryFromRouter={true} />
        </Box>
    )
}

export default Listing
