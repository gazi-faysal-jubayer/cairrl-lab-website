import { NextRequest, NextResponse } from 'next/server';
import { uploadToStorage } from '@/lib/s3';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // Size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    // Validate type (images and pdfs)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'File type not allowed. Please upload an image (JPG, PNG, WebP, GIF) or PDF.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique key
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `${folder}/${Date.now()}_${sanitizedName}`;

    const publicUrl = await uploadToStorage(key, buffer, file.type);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      key,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('S3 upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload file to storage.' },
      { status: 500 }
    );
  }
}
