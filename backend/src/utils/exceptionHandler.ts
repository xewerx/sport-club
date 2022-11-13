import { HttpException, HttpStatus } from '@nestjs/common';

export const exceptionHandler = async <T>(fn: () => T) => {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    console.log(error);
    throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
  }
};
