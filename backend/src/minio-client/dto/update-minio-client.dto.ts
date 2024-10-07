import { PartialType } from '@nestjs/swagger';
import { CreateMinioClientDto } from './create-minio-client.dto';

export class UpdateMinioClientDto extends PartialType(CreateMinioClientDto) {}
