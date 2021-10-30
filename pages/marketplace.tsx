import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import ListingsResourceController from '../components/listing/ListingsResourceController';

const Home: NextPage = () => {
    return (
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        Available Veggies
      </Typography>
      <ListingsResourceController />
    </Box>
  )
}

export default Home
