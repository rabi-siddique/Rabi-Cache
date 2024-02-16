import { RabiCache } from '../Cache.js';
import { ErrorMessages, Operations, SuccessMessages } from '../enums/enums.js';
import { logWithTimestamp, successMessageLogger } from '../utils/Logger.js';
import { Request, Response } from 'express';

export function logMessage(
  target: unknown,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod: Function = descriptor.value;

  descriptor.value = function (...args: unknown[]) {
    const result = originalMethod.apply(this, args);

    switch (key) {
      case Operations.INSERT: {
        successMessageLogger(SuccessMessages.Insertion);
        break;
      }
      case Operations.GET: {
        successMessageLogger(SuccessMessages.Get);
        break;
      }
      case Operations.DELETE: {
        successMessageLogger(SuccessMessages.Deletion);
        break;
      }
      case Operations.UPDATE: {
        successMessageLogger(SuccessMessages.Update);
        break;
      }
    }

    return result;
  };

  return descriptor;
}

export function validateKey(cache: RabiCache) {
  return function (
    target: unknown,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod: Function = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const keyArgument = args[0] as string;
      const invalidKeys = ['', "''", '""', 'null', 'undefined'];

      if (invalidKeys.includes(keyArgument)) {
        throw new Error(ErrorMessages.KeyEmpty);
      }

      if (['get', 'delete', 'update'].includes(key)) {
        if (!cache.hasOwnProperty(keyArgument)) {
          throw new Error(ErrorMessages.KeyNotPresent);
        }
      }

      const result = originalMethod.apply(this, args);

      logWithTimestamp(
        `Method ${key} called with arguments: ${JSON.stringify(args)}`
      );

      return result;
    };

    return descriptor;
  };
}

export function handleErrorsForIncomingRequests(
  target: unknown,
  key: string,
  descriptor: PropertyDescriptor
) {
  const orginalFunction: Function = descriptor.value;

  descriptor.value = function (req: Request, res: Response) {
    try {
      orginalFunction.apply(this, [req, res]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  };

  return descriptor;
}

/**
This decorator is currently not required but can be useful in the future for validating parameters of GET 
and DELETE requests. Initially, the logic for parameter validation was planned to be placed in middleware.
However, req.params are not defined in middleware because middleware is evaluated before reaching the route 
handler.Once the route handler is reached, req.params becomes available. This behavior is a design decision 
by Express. An alternative approach to incorporating parameter validation is to use inline middleware 
directly where the route is defined. However, the decision was made to use decorators for consistency and 
maintainability of the codebase. 
*/
export function validateQueryParams(
  target: unknown,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod: Function = descriptor.value;

  descriptor.value = function (req: Request, res: Response) {
    const { key } = req.params;
    if (
      (req.method === 'GET' || req.method === 'DELETE') &&
      typeof key !== 'string'
    ) {
      return res.status(400).send(ErrorMessages.BadRequestGetAndDelete);
    }

    originalMethod.apply(this, [req, res]);
  };

  return descriptor;
}
