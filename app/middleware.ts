import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const isProtectedPath = [
        '/api/inventory',
        '/api/recipes',
        '/api/meal-planning',
        '/api/social'
      ].some(path => req.nextUrl.pathname.startsWith(path));

      return isProtectedPath ? !!token : true;
    },
  },
});

export const config = {
  matcher: [
    '/api/inventory/:path*',
    '/api/recipes/:path*',
    '/api/meal-planning/:path*',
    '/api/social/:path*'
  ],
}; 