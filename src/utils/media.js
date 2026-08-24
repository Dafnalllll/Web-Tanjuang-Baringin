export const getMediaUrl = (path) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  const cleanPath = path.replace(/^\/+/, "");

  return `${import.meta.env.VITE_ASSET_URL}/${cleanPath}`;
};

export const getFileUrl = (path) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  const cleanPath = path.replace(/^\/+/, "");

  return `${import.meta.env.VITE_ASSET_URL}/${cleanPath}`;
};
