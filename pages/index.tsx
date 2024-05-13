import { AppRoutes } from '@/types/types'
import { Typography } from '@mui/material'
import Link from 'next/link'

const Home = () => {
  return (
      <Link href={AppRoutes.home}>
        <Typography>
          Home
        </Typography>
      </Link>
  )
}

export default Home