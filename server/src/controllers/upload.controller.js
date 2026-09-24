const { handleUpload } = require("@vercel/blob/client");

const handleDirectUpload = async (req, res, next) => {
  try {
    const response = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!pathname.startsWith("uploads/")) {
          throw new Error("Uploads must use the uploads/ pathname prefix");
        }
        return { addRandomSuffix: true, tokenPayload: clientPayload || "" };
      },
      onUploadCompleted: async () => {
        // The browser receives the URL, then saves file metadata through /api/tracks.
      },
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { handleDirectUpload };
