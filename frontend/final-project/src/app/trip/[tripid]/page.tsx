'use client'
import Box from '@mui/material/Box';
import { useParams, useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react'





const Product = ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = use(params);
  console.log("This is id", id);
  const router = useRouter()
  
  useEffect(()=>{
    // getData()
  },[])


  return (
    <>

      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        This is details of ride whose id is {id}.

      </Box>

    </>
  )
}

export default Product
