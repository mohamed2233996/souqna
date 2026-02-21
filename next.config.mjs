/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'koozkocjslzkbrvoelyt.supabase.co', // الدومين بتاعك في سوبابيس
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;

