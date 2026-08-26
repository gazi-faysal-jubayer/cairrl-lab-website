import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-2',
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: true,
});

const BUCKET_NAME = process.env.NEON_STORAGE_BUCKET || 'cairrl';

/**
 * Upload a buffer or string to Neon S3 Object Storage
 */
export async function uploadToStorage(
  key: string,
  body: Buffer | Uint8Array | string,
  contentType?: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  await s3Client.send(command);

  // Return public endpoint URL
  const endpoint = process.env.AWS_ENDPOINT_URL_S3?.replace(/\/$/, '');
  return `${endpoint}/${BUCKET_NAME}/${key}`;
}

/**
 * Generate a presigned download/view URL (if bucket is private)
 */
export async function getStorageSignedUrl(key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn });
}

export { s3Client, BUCKET_NAME };
