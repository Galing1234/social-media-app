import GoogleProvider from 'next-auth/providers/google' ;

export const options = {
  providers: [
    GoogleProvider({ 
      profile(profile) {
        let role = 'User' ;
        
        if (profile.email === 'galchuk28@gmail.com') {
          role = 'Admin' ;
        }

        return {
          ...profile,
          image: profile.picture,
          role,
          id: profile.sub
        } ;
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      checks: ['none']
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role ;
      return token ;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role ;
      return session ;
    }
  }
}