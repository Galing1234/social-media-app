import { NextRequestWithAuth, withAuth } from "next-auth/middleware" ;
import { redirect } from "next/navigation" ;

export default withAuth((req: NextRequestWithAuth) => {
  if (
    req.nextUrl.pathname.startsWith('/users') && 
    !(
      req.nextauth.token?.role === 'User' || 
      req.nextauth.token?.role === 'Admin'
    )
  ) {
    redirect(`${process.env.NEXT_BASE_URL_PATH}/api/auth/signin?callbackUrl=/`)
  }
})

export const config = {
  matcher: [
    '/users/', '/users/(.*)'
  ]
} ;