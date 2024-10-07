export interface IBufferedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer | string;
}

export interface ISigned {
    url: string;
    fileName: string;
}