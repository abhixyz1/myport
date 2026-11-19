const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/myport' : '';

export default {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  assetPrefix: isProd ? '/myport/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};
