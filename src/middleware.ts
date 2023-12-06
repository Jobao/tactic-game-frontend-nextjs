'use client'

import { NextRequest, NextResponse } from "next/server";

const jwtAuthName =   'authorization';

export default function middleware(request:NextRequest){
  if(!sessionStorage.getItem('')){
    console.log('error');
    
  }
   if (request.nextUrl.pathname) {
     if(request.headers.get(jwtAuthName)){
         console.log('oks');
         
     }
     else{
         console.log("error");
         return NextResponse.redirect('http://localhost:3001/');
     }
   }
   else{
    
   }
}

export const config = {
    matcher: '/adsad',
  }