import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { IBufferedFile } from './file.model';

@Injectable()
export class MinioClientService {
  private readonly bucket = process.env.MINIO_BUCKET;

  constructor(@Inject(MINIO_CONNECTION) private readonly minioClient) {}

  async upload(file: IBufferedFile, postId: number): Promise<void> {
    const hashedFileName = crypto.randomUUID();
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
    };
    const uploadFilename = hashedFileName + ext;
 
    try {
      console.log(postId + uploadFilename);

      await this.minioClient.putObject(
        this.bucket,
        `${postId}/${uploadFilename}`,
        file.buffer,
        metaData['Content-Type'].length,
        metaData,
      );
 
      console.log(`File uploaded successfully: ${uploadFilename}`);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  
  async delete(postId: number, hashFileName: string): Promise<void> {
    try {
      await this.minioClient.removeObject(this.bucket, `${postId}/${hashFileName}`);
      console.log(`Removed the object: ${postId}/${hashFileName}`)
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
