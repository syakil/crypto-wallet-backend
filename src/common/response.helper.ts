import { HttpStatus } from '@nestjs/common';
export class ResponseHelper {
  static success(data: any, message = 'Success') {
    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message,
      data,
    };
  }

  static error(message: string, statusCode = HttpStatus.INTERNAL_SERVER_ERROR) {
    return {
      status: 'error',
      statusCode,
      message,
      data: null,
    };
  }

  static notFound(message: string, statusCode = HttpStatus.NOT_FOUND) {
    return {
      status: 'error',
      statusCode,
      message,
      data: null,
    };
  }
}
