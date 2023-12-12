import { Discovery } from '@firebolt-js/sdk';
const MOCK_PURCHASED_CONTENT = {
  data: {
    totalCount: 1,
    expires: '2025-01-01T00:00:00.000Z',
    entries: [
      {
        identifiers: {
          entityId: '345',
        },
        entityType: 'program',
        programType: 'movie',
        title: 'Cool Runnings',
        synopsis:
          'When a Jamaican sprinter is disqualified from the Olympic Games, he enlists the help of a dishonored coach to start the first Jamaican Bobsled Team.',
        releaseDate: '1993-01-01T00:00:00.000Z',
        contentRatings: [
          {
            scheme: 'US-Movie',
            rating: 'PG',
          },
          {
            scheme: 'CA-Movie',
            rating: 'G',
          },
        ],
      },
    ],
  },
};

const MOCK_ENITY_INFO = {
  expires: '2025-01-01T00:00:00.000Z',
  entity: {
    identifiers: {
      entityId: 'THIS_SHOULD_BE_REPLACED',
    },
    entityType: 'program',
    programType: 'movie',
    title: 'Cool Runnings',
    synopsis:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc.',
    releaseDate: '1993-01-01T00:00:00.000Z',
    contentRatings: [
      {
        scheme: 'US-Movie',
        rating: 'PG',
      },
      {
        scheme: 'CA-Movie',
        rating: 'G',
      },
    ],
    waysToWatch: [
      {
        identifiers: {
          assetId: '123',
        },
        expires: '2025-01-01T00:00:00.000Z',
        entitled: true,
        entitledExpires: '2025-01-01T00:00:00.000Z',
        offeringType: 'buy',
        price: 2.99,
        videoQuality: ['UHD'],
        audioProfile: ['dolbyAtmos'],
        audioLanguages: ['en'],
        closedCaptions: ['en'],
        subtitles: ['es'],
        audioDescriptions: ['en'],
      },
    ],
  },
};

// Specific to Discovery module
export default class DiscoveryInvoker {
  purchasedContent() {
    return new Promise((resolve, reject) => {
      Discovery.purchasedContent(async (req) => {
        if (req === null || req.listening === null) {
          // don't care about the listening ack
          resolve({ message: 'purchasedContent has been requested' });
          return MOCK_PURCHASED_CONTENT;
        }
        return null;
      });
    });
  }

  entityInfo() {
    return new Promise((resolve, reject) => {
      Discovery.entityInfo(async (req) => {
        if (req === null || req.listening === null) {
          // don't care about the listening ack
          resolve({ message: 'entityInfo has been requested' });
          const rv = { ...MOCK_ENITY_INFO };
          rv.entity.identifiers.entityId = req.entityId;
          return rv;
        }
        return null;
      });
    });
  }

  async getPurchasedContent() {
    const allApps = await Discovery.apps();
    const supportedApps = allApps.apps.filter((a) => a.apis.indexOf('getPurchasedContent') !== -1);
    if (supportedApps.length > 0) {
      return Discovery.getPurchasedContent(supportedApps[0].id);
    }
  }

  async getEntityInfo() {
    const allApps = await Discovery.apps();
    const supportedApps = allApps.apps.filter((a) => a.apis.indexOf('getEntityInfo') !== -1);
    if (supportedApps.length > 0) {
      return Discovery.getEntityInfo(supportedApps[0].id, {
        entityId: '333',
      });
    }
  }
}
