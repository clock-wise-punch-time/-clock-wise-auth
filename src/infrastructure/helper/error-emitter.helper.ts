import { CustomException } from '../../domain/entities/error/custom-exception';
import { ERROR_NAME } from '../enums/error-name.enum';
import { HTTP_NAME } from '../enums/http-name.enum';

export function errorEmitter(
  exception: Partial<Error>,
  errorMappings: [ErrorConstructor | any, ERROR_NAME | HTTP_NAME, string?][],
) {
  for (const [errorType, customErrorName, searchString] of errorMappings) {
    if (exception instanceof errorType) {
      if (searchString) {
        if (exception.stack && exception.stack.includes(searchString)) {
          throw new CustomException(customErrorName);
        }
      } else {
        throw new CustomException(customErrorName, exception.stack);
      }
    }
  }
}
