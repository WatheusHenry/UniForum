import { Controller, Post, UploadedFile, Param, UseInterceptors, Delete } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('minio-client')
@ApiTags('minio-client')
export class MinioClientController {
  constructor(private readonly minioClientService: MinioClientService) {}

  @Post('upload/:postId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('postId') postId: number,
    @UploadedFile() file: Express.Multer.File
  ) {
    await this.minioClientService.upload(file, postId);
  }

  @Delete(':postId/:hashFileName')
  async deleteFile(
    @Param('postId') postId: number,
    @Param('hashFileName') hashFileName: string
  ): Promise<void> {
    await this.minioClientService.delete(postId, hashFileName);
  }
}
