import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import {
  Avatar,
  Box,
  Card as MuiCard,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from '@mui/material'

interface CardProps {
  title: string
  value: string
  icon: JSX.Element
  iconColor: string
  isUpper: boolean
  details: string
  onClick(): void
}

export function Card({
  title,
  value,
  icon,
  iconColor,
  isUpper,
  details,
  onClick
}: CardProps) {
  return (
    <CardActionArea>
      <MuiCard sx={{ height: '100%', width: '100%' }}>
        <CardContent onClick={onClick}>
          <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
            <Grid item>
              <Typography gutterBottom>{title}</Typography>
              <Typography>{value}</Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: iconColor,
                  height: 56,
                  width: 56
                }}
              >
                {icon}
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              pt: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isUpper ? (
              <ArrowUpward htmlColor="#2e7d32" />
            ) : (
              <ArrowDownward color="error" />
            )}
            <Typography
              variant="body2"
              sx={{ mr: 1 }}
              color={isUpper ? 'green' : 'red'}
            >
              {details}
            </Typography>
          </Box>
        </CardContent>
      </MuiCard>
    </CardActionArea>
  )
}
