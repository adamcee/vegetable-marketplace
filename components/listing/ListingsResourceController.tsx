import { Box } from '@mui/system'
import APIResourceController from '../../components/common/APIResourceController'
import { KeyOptions, ListingsAPIResource } from '../../lib/frontend/data/listings'
import ListingList from './ListingList'

interface Props extends KeyOptions {}

const ListingsResourceController = ({ myListings }: Props) => {
  const SuccessView = (data: any) => <ListingList data={data} />

  return (
    <Box m={4}>
      <APIResourceController
        resource={ListingsAPIResource}
        swrKeyOptions={{ myListings }}
        successView={SuccessView}
      />
    </Box>
  )
}

export default ListingsResourceController
