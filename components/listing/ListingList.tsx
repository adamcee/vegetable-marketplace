import { Listing } from '.prisma/client'
import { Stack } from '@mui/material'
import ListingCard from './ListingCard'
import { ResourceViewProps } from '../../lib/frontend/data/apiResource';

interface Props extends ResourceViewProps {
  data: Listing[] | undefined
}

export default function ListingList({ data }: Props) {
  return (
    <Stack spacing={2}>
      {data && data.map((listing) => <ListingCard key={listing.id} data={listing} />)}
    </Stack>
  )
}
