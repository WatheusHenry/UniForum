import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: 'localhost', // Endereço do seu MinIO (por exemplo, 'localhost')
      port: 9000, // Porta do MinIO (normalmente 9000)
      useSSL: false, // Defina como 'true' se estiver usando SSL
      accessKey: 'TXjthqZ1ibMHudxsczM1', // Chave de acesso do MinIO
      secretKey: 'cIMv5uRYMC6Hv0esDG5c9gKQ9u8YrtZ8wh0nxf43', // Chave secreta do MinIO
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
