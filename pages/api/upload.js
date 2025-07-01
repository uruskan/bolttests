import { withApiAuth } from '@/lib/api/middleware/auth';
import { withCors, withRateLimit } from '@/lib/api/middleware/validation';
import { supabase } from '@/lib/supabase/client';
import { Logger } from '@/lib/logging/logger';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { restaurantId } = req;

  try {
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filter: ({ mimetype }) => {
        return mimetype && mimetype.includes('image');
      },
    });

    const [fields, files] = await form.parse(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read file
    const fileBuffer = fs.readFileSync(file.filepath);
    const fileName = `${restaurantId}/${Date.now()}-${file.originalFilename}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('restaurant-assets')
      .upload(fileName, fileBuffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('restaurant-assets')
      .getPublicUrl(fileName);

    Logger.info('File uploaded successfully', {
      fileName,
      fileSize: file.size,
      restaurantId
    });

    return res.status(200).json({
      url: publicUrl,
      fileName: file.originalFilename,
      size: file.size
    });

  } catch (error) {
    Logger.error('File upload failed', error, { restaurantId });
    return res.status(500).json({ error: 'Upload failed' });
  }
}

export default withCors(withRateLimit({ maxRequests: 20 })(withApiAuth(handler)));