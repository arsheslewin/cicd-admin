import unset from 'lodash/unset';
import type { ZodNullable, ZodObject } from 'zod';

export class DTO {
  constructor() {}

  protected safeParseResponse?<T>(schema: ZodNullable<ZodObject<any>>, response: any): T {
    const parsedResult = schema.safeParse(response);

    if (!parsedResult.success) {
      parsedResult.error.issues.map(({ path }) => {
        unset(response, path.join('.'));
      });
    }

    return parsedResult.success ? parsedResult.data : response;
  }
}
