module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/register",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
