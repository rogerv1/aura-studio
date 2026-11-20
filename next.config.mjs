const githubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: githubPages ? "export" : undefined,
  basePath: githubPages ? "/aura-studio" : "",
  images: {
    unoptimized: githubPages,
  },
};

export default nextConfig;