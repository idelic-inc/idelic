import {
  getCustomerNestedConfig,
  getDefaultNestedConfig,
  NestedConfiguration
} from './api';
import {ApiError} from './error';
import {ApiOptions, UrlRoot} from './types';

export type Config = {[R in UrlRoot]: string} & {
  authToken?: string;
  onAuthError(error: ApiError): void;
};

export type InitConfig = Config & {
  initialized: boolean;
};

export const config: InitConfig = {
  apiUrlRoot: '',
  configUrlRoot: '',
  dashboardSinkUrlRoot: '',
  documentLibraryUrlRoot: '',
  eformsUrlRoot: '',
  initialized: false,
  loginUrlRoot: '',
  onAuthError: () => {},
  permissionUrlRoot: '',
  userManagementUrlRoot: ''
};

export interface CrudOptions extends NestedConfiguration {
  create: boolean;
  delete: boolean;
  update: boolean;
}

export interface TrainingIntegrationConfig extends NestedConfiguration {
  attendee: CrudOptions;
  class: CrudOptions & {
    addAttendee: boolean;
  };
  course: CrudOptions;
  sourceKey: string;
}

export interface ScalaService extends NestedConfiguration {
  auth0: {
    clientId: string;
  };
  db: {
    enableMigrations: boolean;
    numThreads: number;
    queueSize: number;
  };
  enabled: boolean;
  url: string;
}

export interface BasicConfig extends NestedConfiguration {
  env: {
    auth0: {
      audience: string;
      cacheLocation: string;
      clientId: string;
      domain: string;
      internal: {clientId: string};
      namespace: string;
    };
    gtm: {containerId: string};
    sentry: {dsn: string};
    smtp: {
      mock: {
        enabled: boolean;
      };
    };
    termsOfService: {
      enabled: boolean;
      link: string;
      version: string;
    };
  };
  integrations: {
    training: Record<string, TrainingIntegrationConfig | undefined>;
  };
  services: {
    adminPanel: {
      enabled: boolean;
      fallbackFrontendUrl: string;
      frontendUrl: string;
      hierarchies: {
        enabled: boolean;
      };
      roles: {
        enabled: boolean;
      };
    };
    app: {
      datadog: {
        applicationId: string;
        clientToken: string;
        enabled: boolean;
        env: string;
      };
      frontendUrl: string;
      url: string;
    };
    dashboardSink: {
      url: string;
      auth0: {
        clientId: string;
      };
    };
    documentLibrary: {
      url: string;
      maxUploadSize: number;
    };
    eforms: {
      auth0: {
        clientId: string;
      };
      email: {
        sender: {
          address: string;
        };
      };
      enabled: boolean;
      frontendUrl: string;
      hellosign: {
        clientId: string;
        testMode: boolean;
      };
      maxUploadSize: number;
      url: string;
    };
    legacySaf: {
      fallbackFrontendUrl: string;
      frontendUrl: string;
    };
    lincoln: {
      enabled: boolean;
      db: {
        appUsername: string;
        dbname: string;
        host: string;
        migrationsEnabled: boolean;
        port: string;
        schemaUsername: string;
      };
      kafka: {
        acks: string;
        apiKey: string;
        bootstrapServer: string;
        topicName: string;
      };
      sns: {
        region: string;
        topicName: string;
      };
      strategy: string;
    };
    performanceDashboard: {
      accidents: {enabled: boolean};
      apiTarget: string;
      developmentPlans: {enabled: boolean};
      enabled: boolean;
      enforcements: {enabled: boolean};
      expiringDocuments: {enabled: boolean};
      fallbackFrontendUrl: string;
      frontendUrl: string;
      hierarchyFilter: {enabled: boolean};
      injuries: {enabled: boolean};
      newHotness: {enabled: boolean};
      watchlist: {enabled: boolean};
    };
    permission: ScalaService;
    saf: {
      auth0: {
        clientId: string;
        connection: string;
      };
      datadog: {
        applicationId: string;
        clientToken: string;
        enabled: boolean;
        env: string;
      };
      frontendUrl: string;
      modules: {
        safetyAndRisk: {
          severityPreventabilityVersion: number;
        };
      };
      proDataIrv: string;
      url: string;
      watchlist: {
        notifications: {
          minimumThreshold: number;
          percentIncrease: number;
          pointIncrease: number;
        };
      };
    };
    testingUi: {
      auth0: {
        clientId: string;
      };
      frontendUrl: string;
      url: string;
    };
    training: {
      enabled: boolean;
      fallbackFrontendUrl: string;
      frontendUrl: string;
    };
    usermanagement: ScalaService;
  };
}
const exampleConfig: BasicConfig = {
  services: {
    adminPanel: {
      enabled: false,
      fallbackFrontendUrl: '',
      frontendUrl: '',
      hierarchies: {
        enabled: false
      },
      roles: {
        enabled: false
      }
    },
    saf: {
      auth0: {
        clientId: '',
        connection: ''
      },
      datadog: {
        applicationId: '',
        clientToken: '',
        enabled: false,
        env: ''
      },
      frontendUrl: '',
      modules: {
        safetyAndRisk: {
          severityPreventabilityVersion: 0
        }
      },
      proDataIrv: '',
      url: '',
      watchlist: {
        notifications: {
          minimumThreshold: 0,
          percentIncrease: 0,
          pointIncrease: 0
        }
      }
    },
    dashboardSink: {
      url: '',
      auth0: {clientId: ''}
    },
    documentLibrary: {url: '', maxUploadSize: 0},
    legacySaf: {
      fallbackFrontendUrl: '',
      frontendUrl: ''
    },
    lincoln: {
      enabled: false,
      db: {
        appUsername: '',
        dbname: '',
        host: '',
        migrationsEnabled: false,
        port: '',
        schemaUsername: ''
      },
      kafka: {
        acks: '',
        apiKey: '',
        bootstrapServer: '',
        topicName: ''
      },
      sns: {
        region: '',
        topicName: ''
      },
      strategy: ''
    },
    app: {
      datadog: {
        applicationId: '',
        clientToken: '',
        enabled: false,
        env: ''
      },
      frontendUrl: '',
      url: ''
    },
    testingUi: {
      auth0: {
        clientId: ''
      },
      frontendUrl: '',
      url: ''
    },
    training: {
      enabled: false,
      fallbackFrontendUrl: '',
      frontendUrl: ''
    },
    eforms: {
      auth0: {
        clientId: ''
      },
      email: {
        sender: {
          address: ''
        }
      },
      enabled: false,
      frontendUrl: '',
      maxUploadSize: 0,
      url: '',
      hellosign: {
        clientId: '',
        testMode: false
      }
    },
    permission: {
      auth0: {
        clientId: ''
      },
      db: {
        enableMigrations: false,
        numThreads: 0,
        queueSize: 0
      },
      enabled: false,
      url: ''
    },
    usermanagement: {
      auth0: {
        clientId: ''
      },
      db: {
        enableMigrations: false,
        numThreads: 0,
        queueSize: 0
      },
      enabled: false,
      url: ''
    },
    performanceDashboard: {
      accidents: {enabled: false},
      apiTarget: '',
      developmentPlans: {enabled: false},
      enabled: false,
      enforcements: {enabled: false},
      expiringDocuments: {enabled: false},
      fallbackFrontendUrl: '',
      frontendUrl: '',
      hierarchyFilter: {enabled: false},
      injuries: {enabled: false},
      newHotness: {enabled: false},
      watchlist: {enabled: false}
    }
  },
  integrations: {
    training: {}
  },
  env: {
    sentry: {dsn: ''},
    auth0: {
      audience: '',
      cacheLocation: '',
      clientId: '',
      domain: '',
      internal: {clientId: ''},
      namespace: ''
    },
    gtm: {containerId: ''},
    termsOfService: {
      enabled: false,
      link: '',
      version: ''
    },
    smtp: {
      mock: {
        enabled: false
      }
    }
  }
};

const matchesConfig = <T extends NestedConfiguration>(
  conf: NestedConfiguration,
  example: T,
  keyPath: string[] = []
): conf is T => {
  let result = true;
  Object.entries(example).forEach(([key, exampleValue]) => {
    const value = conf[key];
    const type = typeof value;
    const exampleType = typeof exampleValue;
    const path = [...keyPath, key];
    let isCorrect = false;
    if (type === 'undefined') {
      result = false;
      isCorrect = true;
      console.warn(`Item "${path.join('.')}" is missing in the config!`);
    } else if (typeof exampleValue === 'object' && typeof value === 'object') {
      isCorrect = matchesConfig(value, exampleValue, path);
    } else if (
      (exampleType === 'string' && type === 'string') ||
      (exampleType === 'number' && type === 'number') ||
      (exampleType === 'boolean' && type === 'boolean')
    ) {
      isCorrect = true;
    }
    if (!isCorrect) {
      result = false;
      console.warn(
        `Type of config item "${path.join(
          '.'
        )}" is incorrect, expected ${exampleType}`
      );
    }
  });
  return result;
};

/**
 * Type guard to ensure the received config matches the expected structure
 * @param conf - Nested config from config service
 * @param example - Example to compare conf to
 */
export function isConfig(conf: NestedConfiguration): conf is BasicConfig;
export function isConfig<T extends NestedConfiguration>(
  conf: NestedConfiguration,
  example: T
): conf is T;
export function isConfig(conf: NestedConfiguration, example = exampleConfig) {
  return matchesConfig(conf, example);
}

/**
 * A function to initialize api config with an existing nested config,
 * otherwise use setupApi instead.
 * @param configUrl - URL of the config service
 * @param nestedConfig - Nested config object
 */
export const initializeConfig = (
  configUrl: string,
  nestedConfig: NestedConfiguration
): void => {
  if (
    !matchesConfig(nestedConfig, {
      services: {
        app: {url: ''},
        dashboardSink: {url: ''},
        documentLibrary: {url: ''},
        eforms: {url: ''},
        permission: {url: ''},
        saf: {url: ''},
        usermanagement: {url: ''}
      }
    })
  ) {
    throw new Error("Config doesn't match!");
  }
  config.configUrlRoot = configUrl;
  config.apiUrlRoot = nestedConfig.services.saf.url;
  config.dashboardSinkUrlRoot = nestedConfig.services.dashboardSink.url;
  config.documentLibraryUrlRoot = nestedConfig.services.documentLibrary.url;
  config.eformsUrlRoot = nestedConfig.services.eforms.url;
  config.loginUrlRoot = nestedConfig.services.app.url;
  config.permissionUrlRoot = nestedConfig.services.permission.url;
  config.userManagementUrlRoot = nestedConfig.services.usermanagement.url;
  config.initialized = true;
};

/**
 * A function that pulls config, sets up api config,
 * then returns a nested config object.
 * @param configUrl - URL of the config service
 * @param [customerAlias] - Optional customer alias to fetch config for, otherwise pulls default config
 */
export const setupApi = async (
  configUrl: string,
  customerAlias?: string
): Promise<NestedConfiguration> => {
  const apiOptions: ApiOptions = {
    bypassInitializeCheck: true,
    customUrlRoot: configUrl
  };
  const configRequest = customerAlias
    ? getCustomerNestedConfig(customerAlias, apiOptions)
    : getDefaultNestedConfig(apiOptions);
  const {data: nestedConfig} = await configRequest.response;
  initializeConfig(configUrl, nestedConfig);
  return nestedConfig;
};

/**
 * Setter for the Auth0 access token which is sent with all requests.
 * @param token Auth0 access token
 */
export const setAccessToken = (token: string): void => {
  config.authToken = token;
};
