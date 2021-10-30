import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import { NextLinkComposed } from '../components/common/Link'
import ListingsResourceController from '../components/listing/ListingsResourceController';

const Dashboard: NextPage = () => {
  return (
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        My Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        My listings
      </Typography>
      <ListingsResourceController myListings={true} />
      <Button sx={{ my: 4 }} component={NextLinkComposed} to={'/createListing'} variant="contained">
        Create new listing
      </Button>
    </Box>
  )
}

export default Dashboard
