# Deployment

1. Import the repository into Vercel, with its root directory set to `.`.
2. Create and connect a Vercel Blob store in **Storage**. It supplies Blob credentials to the Vercel project.
3. Add `MONGO_URI` in Vercel Project Settings using a MongoDB Atlas SRV connection string. Configure Atlas Network Access to allow the deployment to reach the cluster.
4. Optionally set `CORS_ORIGIN` to the deployed frontend origin and enable Vercel System Environment Variables for Blob callbacks.

## Direct upload client usage

```js
import { upload } from '@vercel/blob/client';

const blob = await upload(`uploads/${file.name}`, file, {
  access: 'public', handleUploadUrl: '/api/tracks/upload', multipart: true,
});

await fetch('/api/tracks', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'My track', artist: 'Artist', durationSec: 180,
    file: { url: blob.url, downloadUrl: blob.downloadUrl, pathname: blob.pathname,
      contentType: blob.contentType, size: file.size } }),
});
```

This sends file bytes straight from the browser to Vercel Blob. Only metadata is saved to MongoDB Atlas. All upload paths must begin with `uploads/`.
