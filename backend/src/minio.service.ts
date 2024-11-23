import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: +process.env.MINIO_PORT,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucketName = 'forum'; // Nome do bucket no MinIO
    const objectName = `${Date.now()}-${file.originalname}`;

    await this.minioClient.putObject(bucketName, objectName, file.buffer);

    return `http://localhost:9000/${bucketName}/${objectName}`;
  }

  // Função para verificar se o bucket existe
  async checkBucket(bucketName: string) {
    const exists = await this.minioClient.bucketExists(bucketName);
    if (!exists) {
      await this.minioClient.makeBucket(bucketName, 'us-east-1');
    }
  }
}
