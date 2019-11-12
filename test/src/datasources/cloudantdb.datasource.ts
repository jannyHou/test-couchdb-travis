import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise,
} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './cloudantdb.datasource.json';
import {inspect} from 'util';

@lifeCycleObserver('datasource')
export class CloudantdbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'cloudantdb';

  constructor(
    @inject('datasources.config.cloudantdb', {optional: true})
    dsConfig: object = config,
  ) {
    const ENV_CONFIG = {
      name: 'cloudantdb',
      connector: 'cloudant',
      url: process.env.CLOUDANT_URL,
      database: process.env.CLOUDANT_DATABASE,
      username: process.env.CLOUDANT_USERNAME,
      password: process.env.CLOUDANT_PASSWORD,
      port: 5984
    }
    console.log(inspect(ENV_CONFIG));
    super(ENV_CONFIG);
  }

  /**
   * Start the datasource when application is started
   */
  start(): ValueOrPromise<void> {
    // Add your logic here to be invoked when the application is started
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
