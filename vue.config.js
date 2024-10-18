module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_BASE_URL
    : '/'
};
