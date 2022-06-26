import * as mongoose from 'mongoose';

import { APP_CONFIG } from '../../config';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://localhost/test'),
  },
];
