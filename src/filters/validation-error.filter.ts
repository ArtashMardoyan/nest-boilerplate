import { Error } from 'mongoose';
import { ArgumentsHost, Catch, HttpStatus, RpcExceptionFilter } from '@nestjs/common';

import ValidationError = Error.ValidationError;

@Catch(ValidationError)
export class ValidationErrorFilter implements RpcExceptionFilter {
    catch(exception: ValidationError, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            createdBy: 'ValidationErrorFilter',
            errors: exception.errors
        });
    }
}
