/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nznuabfiswutwbxsdodf.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
        ],
    },
    // async redirects() {
    //     return [
    //         {
    //             source: '/',
    //             destination: '/participants',
    //             permanent: true,
    //         },
    //     ]
    // },
};

export default nextConfig;
