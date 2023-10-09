import { z } from 'zod';

import { DTO } from 'constant/dto';

export const UserSchema = z.object({}).nullable();

export type IUser = z.infer<typeof UserSchema>;

export class UserDTO extends DTO {
  no?: number;

  constructor(response: IUser) {
    super();

    const res = this.safeParseResponse?.<IUser>(UserSchema, response) || {};
  }
}
