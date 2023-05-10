import { Card, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import {useNavigate} from 'react-router-dom'
const ShowCard = ({item}) => {
    const navigate=useNavigate()
  return (
    <Card sx={{width:{xs:"160px",md:"190px",lg:"220px"},cursor:"pointer"}} onClick={()=>{navigate(`/${item['id']}`)}}>
        <Card sx={{height:{xs:"180px",md:"200px",lg:"220px"}}}>
        <CardMedia component="img" src={item['image']['medium']}/>
        </Card>
        <IconButton sx={{position:"absolute",mt:{xs:-22.5,sm:-22.5,md:-25,lg:-27.4},backgroundColor:"rgb(0,0,0,0.4)",color:"white",borderRadius:"1px"}}><AddIcon/></IconButton>
        <Stack direction="row" sx={{mt:"5%"}}><StarIcon sx={{color:"#f5c518"}}/><Typography sx={{mt:"1.2%"}}>{item['rating']['average']}</Typography></Stack>
        <CardContent sx={{fontWeight:"bold",pl:"0px",pr:"0xp",textAlign:"center"}}>{item['name']}s</CardContent>
        <CardContent></CardContent>
    </Card>
  )
}

export default ShowCard