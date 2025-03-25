exports.STATIC_COMMON_VARIABLES = {
    DEFAULT: {
      PLAYER_LOAD: {
        appId: 'app1',
        'CYPRESSENV-playerId': 'com.comcast.viper_ipa:1',
        request: {
          uri: 'https://cdn.rdkcentral.com/media/assets/asset.hls'
        }
      },
    PLAYER_LOAD_AUTOPLAY_TRUE: {
      appId: 'app1',
      'CYPRESSENV-playerId': 'com.comcast.viper_ipa:1',
      request: {
        uri: 'https://cdn.rdkcentral.com/media/assets/asset.hls',
        autoPlay: true,
      }
    },
    PLAYER_LOAD_METADATA: {
      appId: 'app1',
      'CYPRESSENV-playerId': 'com.comcast.viper_ipa:1',
      request: {
        uri: 'https://cdn.rdkcentral.com/media/assets/asset.hls',
        metadata: {}
      }
    },
    PLAYER_LOAD_CONFIG: {
      appId: 'app1',
      'CYPRESSENV-playerId': 'com.comcast.viper_ipa:1',
      request: {
        uri: 'https://cdn.rdkcentral.com/media/assets/asset.hls',
        config: {}
      }
    },
    PLAYER_LOAD_AUTOPLAY_FALSE: {
      appId: 'app1',
      'CYPRESSENV-playerId': 'com.comcast.viper_ipa:1',
      request: {
        uri: 'https://cdn.rdkcentral.com/media/assets/asset.hls',
        autoPlay: false
      }
    },
    PLAYER_LOAD_WITHOUT_PROVIDER: {
      appId: 'app1',
      playerId: 'abc',
      request: {
        uri: 'https://cdn.rdkcentral.com/media/assets/asset.hls'
      }
    },
      PLAYER_LOAD_RESPONSE: {},
      PLAYER_APPID_PLAYERID: {
        appId: 'app1',
        'CYPRESSENV-playerId': 'com.comcast.viper_ipa:1',
      },
      PLAYER_PROGRESS_CURRENT_POSITION_RESPONSE: 15,
      PLAYER_PROGRESS_START_POSITION_RESPONSE: 0,
      PLAYER_PROGRESS_END_POSITION_RESPONSE: 3600,
      PLAYER_PROGRESS_RESUME_POSITION_RESPONSE: 5,
      PLAYER_PROGRESS_SPEED_RESPONSE: 3,
      PLAYER_PROGRESS_UTC_VALUE: '2021-04-23T18:25:43.511Z',
      PLAYER_STATUS_RESPONSE: {
        mediaSessionId: 'com.comcast.viper_ipa:1:1',
        state: 'PLAYING',
        progress: {
          speed: 0,
          startPositionSeconds: 0,
          currentPositionSeconds: 5,
          resumePositionSeconds: 5,
          endPositionSeconds: 3600,
          utcLiveTime: '2021-04-23T18:25:43.511Z',
        },
      },
      PLAYER_STATUS_SET_RESPONSE: {
        mediaSessionId: 'com.comcast.viper_ipa:1:1',
        state: 'PLAYING',
        progress: {
          speed: 3,
          startPositionSeconds: 0,
          currentPositionSeconds: 15,
          resumePositionSeconds: 5,
          endPositionSeconds: 3600,
          utcLiveTime: '2021-04-23T18:25:43.511Z',
        },
      },
      PLAYER_ONSTATUS_SET_RESPONSE: {
        mediaSessionId: 'com.comcast.viper_ipa:1:2',
        state: 'PLAYING',
        progress: {
          speed: 3,
          startPositionSeconds: 0,
          currentPositionSeconds: 15,
          resumePositionSeconds: 5,
          endPositionSeconds: 3600,
          utcLiveTime: '2021-04-23T18:25:43.511Z',
        },
      },
      PLAYER_SET_AUDIO_TRACK: {
        appId: 'app1',
        'CYPRESSENV-playerId': 'com.comcast.viper_ipa:1',
        trackId: 'com.comcast.viper_ipa:1_track1',
      },
      PLAYER_SET_CAPTIONS_TRACK: {
        appId: 'app1',
        'CYPRESSENV-playerId': 'com.comcast.viper_ipa:1',
        trackId: 'com.comcast.viper_ipa:1_track1',
      },
      PLAYER_SET_POSITION: {
        appId: 'app1',
        'CYPRESSENV-playerId': 'com.comcast.viper_ipa:1',
        positionSeconds: 15,
      },
      PLAYER_SET_POSITION_8: {
        appId: 'app1',
        'CYPRESSENV-playerId': 'com.comcast.viper_ipa:1',
        positionSeconds: 8,
      },
      PLAYER_SET_SPEED: {
        appId: 'app1',
        'CYPRESSENV-playerId': 'com.comcast.viper_ipa:1',
        speed: 3,
      },
      PLAYER_SET_SPEED_4: {
        appId: 'app1',
        'CYPRESSENV-playerId': 'com.comcast.viper_ipa:1',
        speed: 4,
      },
      PLAYER_PROVIDE_STATUS: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:1',
          state: 'PLAYING',
          blockedReason: 'CONTENT_NOT_FOUND',
        },
      },
      PLAYER_PROVIDE_STATUS_MEDIASESSIONID: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'PLAYING',
        },
      },
      PLAYER_PROVIDE_STATE_IDLE: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'IDLE',
        },
      },
      PLAYER_PROVIDE_STATE_PENDING: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'PENDING',
        },
      },
      PLAYER_PROVIDE_STATE_PLAYING: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'PLAYING',
        },
      },
      PLAYER_PROVIDE_STATE_BLOCKED: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'BLOCKED',
        },
      },
      PLAYER_PROVIDE_STATE_BLOCKED_NO_NETWORK: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'BLOCKED',
          blockedReason: 'NO_NETWORK',
        },
      },
      PLAYER_PROVIDE_STATE_BLOCKED_CONTENT_NOT_FOUND: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'BLOCKED',
          blockedReason: 'CONTENT_NOT_FOUND',
        },
      },
      PLAYER_PROVIDE_STATE_BLOCKED_DRM_ERROR: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'BLOCKED',
          blockedReason: 'DRM_ERROR',
        },
      },
      PLAYER_PROVIDE_STATE_BLOCKED_NOT_ENTITLED: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'BLOCKED',
          blockedReason: 'NOT_ENTITLED',
        },
      },
      PLAYER_PROVIDE_STATE_BLOCKED_GEO_BLOCKED: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'BLOCKED',
          blockedReason: 'GEO_BLOCKED',
        },
      },
      PLAYER_PROVIDE_STATE_BLOCKED_CHANNEL_NOT_SCANNED: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'BLOCKED',
          blockedReason: 'CHANNEL_NOT_SCANNED',
        },
      },
      PLAYER_PROVIDE_STATE_BLOCKED_NO_SIGNAL: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'BLOCKED',
          blockedReason: 'NO_SIGNAL',
        },
      },
      PLAYER_PROVIDE_STATE_BLOCKED_TECHNICAL_FAULT: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'BLOCKED',
          blockedReason: 'TECHNICAL_FAULT',
        },
      },
      PLAYER_PROVIDE_STATE_BLOCKED_CHANNEL_OFF_AIR: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'BLOCKED',
          blockedReason: 'CHANNEL_OFF_AIR',
        },
      },
      PLAYER_PROVIDE_STATE_BLOCKED_PLAYER_FAILURE: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'BLOCKED',
          blockedReason: 'PLAYER_FAILURE',
        },
      },
      PLAYER_PROVIDE_STATE_FAILED: {
        playerId: 'com.comcast.viper_ipa:1',
        status: {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'FAILED',
        },
      },
      PLAYER_TRACKS_RESPONSE: {
        audio: [
          {
            trackId: 'com.comcast.viper_ipa:1_track1',
            language: 'eng',
            audioDescription: false,
            type: 'PCM',
            selected: true,
          },
        ],
        captions: [
          {
            trackId: 'com.comcast.viper_ipa:1_track1',
            language: 'eng',
            name: 'CC1',
            selected: true,
          },
        ],
      },
      PLAYER_AUDIO_TRACKS_RESPONSE: [
        {
          trackId: 'com.comcast.viper_ipa:1_track1',
          language: 'eng',
          audioDescription: false,
          type: 'PCM',
          selected: true,
        },
      ],
      PLAYER_CAPTIONS_TRACKS_RESPONSE: [
        {
          trackId: 'com.comcast.viper_ipa:1_track1',
          language: 'eng',
          name: 'CC1',
          selected: true,
        },
      ],
      PLAYER_CREATE_INSTANCE_PARAM: {
        appId: 'app1',
        ipaId: 'com.xumo.play_ipa',
        videoWindow: 'window1',
      },
      ONREQUESTCREATE_INSTANCE: {
        result: {
          correlationId: 'abc',
          parameters: {},
        },
      },
      ONREQUESTSTATUS_RESPONSE: {
        result: {
          correlationId: 'abc',
          parameters: {
            playerId: 'com.comcast.viper_ipa:1',
          },
        },
      },
    ONREQUESTLOAD_RESPONSE: {
      result: {
        correlationId: 'abc',
        parameters: {
          playerId: 'com.comcast.viper_ipa:1',
          request: {
            uri: 'https://cdn.rdkcentral.com/media/assets/asset.hls'
          },
        },
      },
  },
      ONREQUESTPLAY_RESPONSE: {
        result: {
          correlationId: 'abc',
          parameters: {
            playerId: 'com.comcast.viper_ipa:1',
          },
        },
      },
      ONREQUESTSTOP_RESPONSE: {
        result: {
          correlationId: 'abc',
          parameters: {
            playerId: 'com.comcast.viper_ipa:1',
          },
        },
      },
      ONREQUESTDESTROY_RESPONSE: {
        result: {
          correlationId: 'abc',
          parameters: {
            playerId: 'com.comcast.viper_ipa:1',
          },
        },
      },
      ONREQUESTSTATUS_PLAYER_RESPONSE: {
        result: {
          correlationId: 'abc',
          parameters: {
            playerId: 'com.comcast.viper_ipa:1',
          },
        },
      },
      ONREQUESTTRACKS_RESPONSE: {
        result: {
          correlationId: 'abc',
          parameters: {
            playerId: 'com.comcast.viper_ipa:1',
          },
        },
      },
      ONREQUESTSETAUDIOTRACK_RESPONSE: {
        result: {
          correlationId: 'abc',
          parameters: {
            playerId: 'com.comcast.viper_ipa:1',
            trackId: 'com.comcast.viper_ipa:1_track1',
          },
        },
      },
      ONREQUESTSETCAPTIONSTRACK_RESPONSE: {
        result: {
          correlationId: 'abc',
          parameters: {
            playerId: 'com.comcast.viper_ipa:1',
            trackId: 'com.comcast.viper_ipa:1_track1',
          },
        },
      },
      ONREQUESTSETPOSITION_RESPONSE: {
        result: {
          correlationId: 'abc',
          parameters: {
            playerId: 'com.comcast.viper_ipa:1',
            positionSeconds: 10,
          },
        },
      },
      ONREQUESTSETSPEED_RESPONSE: {
        result: {
          correlationId: 'abc',
          parameters: {
            playerId: 'com.comcast.viper_ipa:1',
            speed: 2,
            appId: 'app1',
          },
        },
      },
      ONSTATUS_PARAM: {
        appId: 'app1',
        'CYPRESSENV-playerId': 'com.comcast.viper_ipa:1',
        listen: true,
      },
      PLAYER_PROVIDESTATUS_PARAM: [
        'com.comcast.viper_ipa:1',
        {
          mediaSessionId: 'com.comcast.viper_ipa:1:2',
          state: 'PLAYING',
        },
      ],
      PLAYER_ONSTATUS_MEDIASESSIONID_RESPONSE: 'com.comcast.viper_ipa:1:2',
      PLAYER_ONSTATUS_STATE_PENDING_RESPONSE: 'PENDING',
      PLAYER_ONSTATUS_STATE_PLAYING_RESPONSE: 'PLAYING',
      PLAYER_ONSTATUS_STATE_BLOCKED_RESPONSE: 'BLOCKED',
      PLAYER_ONSTATUS_STATE_FAILED_RESPONSE: 'FAILED',
      PLAYER_ONSTATUS_STATE_IDLE_RESPONSE: 'IDLE',
      PLAYER_ONSTATUS_STATE_BLOCKED_NO_NETWORK: 'NO_NETWORK',
      PLAYER_ONSTATUS_STATE_BLOCKED_CONTENT_NOT_FOUND: 'CONTENT_NOT_FOUND',
      PLAYER_ONSTATUS_STATE_BLOCKED_DRM_ERROR: 'DRM_ERROR',
      PLAYER_ONSTATUS_STATE_BLOCKED_NOT_ENTITLED: 'NOT_ENTITLED',
      PLAYER_ONSTATUS_STATE_BLOCKED_GEO_BLOCKED: 'GEO_BLOCKED',
      PLAYER_ONSTATUS_STATE_BLOCKED_CHANNEL_NOT_SCANNED: 'CHANNEL_NOT_SCANNED',
      PLAYER_ONSTATUS_STATE_BLOCKED_NO_SIGNAL: 'NO_SIGNAL',
      PLAYER_ONSTATUS_STATE_BLOCKED_TECHNICAL_FAULT: 'TECHNICAL_FAULT',
      PLAYER_ONSTATUS_STATE_BLOCKED_CHANNEL_OFF_AIR: 'CHANNEL_OFF_AIR',
      PLAYER_ONSTATUS_STATE_BLOCKED_PLAYER_FAILURE: 'PLAYER_FAILURE',
      PLAYER_ONSTATUS_SPEED_RESPONSE: 3,
      PLAYER_ONSTATUS_POSITION_RESPONSE: 15,
      PLAYER_LOAD_BEFORE_PLAYER_CREATION: {
        appId: 'app1',
      playerId: 'abc',
      request: {
        uri: 'https://cdn.rdkcentral.com/media/assets/asset.hls'
      },
    },
      PLAYER_APPID_PLAYERID_BEFORE_PLAYER_CREATION: {
        appId: 'app1',
        playerId: 'abc',
      },
      PLAYER_SET_TRACK_BEFORE_PLAYER_CREATION: {
        appId: 'app1',
        playerId: 'abc',
        trackId: 'abc999',
      },
      PLAYER_SET_POSITION_BEFORE_PLAYER_CREATION: {
        appId: 'app1',
        playerId: 'abc',
        positionSeconds: 15,
      },
      PLAYER_SET_SPEED_BEFORE_PLAYER_CREATION: {
        appId: 'app1',
        playerId: 'abc',
        speed: 3,
      },
      PLAYER_PROVIDE_STATUS_BEFORE_PLAYER_CREATION: {
        playerId: 'abc',
        status: {
          mediaSessionId: 'sessabc',
          state: 'PLAYING',
          blockedReason: 'CONTENT_NOT_FOUND',
        }
      }
    }
  };
  exports.STATIC_VALIDATION_VARIABLES = {
    INTEGRATEDPLAYER: {
        PLAYER_INSTANCE: {
            data: [
              {
                type: 'regEx',
                validations: [
                  {
                    mode: 'regex',
                    type: '^[a-zA-Z.]+_[a-zA-Z]+:\\d$',
                    description: 'Validation of player instance',
                  },
                ],
              },
            ],
          },          
        PLAYER_LOAD_VALUE: {
          data: [
            {
              type: 'regEx',
              validations: [
                {
                  mode: 'regex',
                  type: '^[a-zA-Z.]+_[a-zA-Z]+:\\d:\\d$',
                  description: 'Validation of player load api',
                },
              ],
            },
          ],
          },
          PLAYER_ONSTATUS_CURRENT_POSITION_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROGRESS_CURRENT_POSITION_RESPONSE,
                    description: 'Validation of progress field in player status api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_START_POSITION_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROGRESS_START_POSITION_RESPONSE,
                    description: 'Validation of progress field in player status api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_END_POSITION_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROGRESS_END_POSITION_RESPONSE,
                    description: 'Validation of progress field in player status api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_RESUME_POSITION_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROGRESS_RESUME_POSITION_RESPONSE,
                    description: 'Validation of progress field in player status api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_UTC_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROGRESS_UTC_VALUE,
                    description: 'Validation of progress field in player status api'
                  }
                ]
              }
            ]
          },
          PLAYER_PROGRESS_SPEED_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROGRESS_SPEED_RESPONSE,
                    description: 'Validation of progress field in player status api'
                  }
                ]
              }
            ]
          },
          PLAYER_STATUS_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_STATUS_RESPONSE,
                    description: 'Validation of player status api'
                  }
                ]
              }
            ]
          },
          PLAYER_STATUS_SET_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_STATUS_SET_RESPONSE,
                    description: 'Validation of player status api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_SET_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_SET_RESPONSE,
                    description: 'Validation of player status api'
                  }
                ]
              }
            ]
          },
          PLAYER_AUDIO_TRACKS_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_AUDIO_TRACKS_RESPONSE,
                    description: 'Validation of player tracks api'
                  }
                ]
              }
            ]
          },
          PLAYER_CAPTIONS_TRACKS_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_CAPTIONS_TRACKS_RESPONSE,
                    description: 'Validation of player tracks api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_MEDIASESSIONID_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_MEDIASESSIONID_RESPONSE,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_STATE_IDLE_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_IDLE_RESPONSE,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_STATE_PENDING_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_PENDING_RESPONSE,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_STATE_PLAYING_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_PLAYING_RESPONSE,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_STATE_BLOCKED_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_BLOCKED_RESPONSE,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_STATE_FAILED_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_FAILED_RESPONSE,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_BLOCKED_NO_NETWORK: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_BLOCKED_NO_NETWORK,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_BLOCKED_DRM_ERROR: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_BLOCKED_DRM_ERROR,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_BLOCKED_CONTENT_NOT_FOUND: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_BLOCKED_CONTENT_NOT_FOUND,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_BLOCKED_NOT_ENTITLED: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_BLOCKED_NOT_ENTITLED,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_BLOCKED_GEO_BLOCKED: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_BLOCKED_GEO_BLOCKED,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_BLOCKED_CHANNEL_NOT_SCANNED: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_BLOCKED_CHANNEL_NOT_SCANNED,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_BLOCKED_NO_SIGNAL: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_BLOCKED_NO_SIGNAL,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_BLOCKED_TECHNICAL_FAULT: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_BLOCKED_TECHNICAL_FAULT,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_BLOCKED_CHANNEL_OFF_AIR: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_BLOCKED_CHANNEL_OFF_AIR,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_BLOCKED_PLAYER_FAILURE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_STATE_BLOCKED_PLAYER_FAILURE,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_SPEED_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_SPEED_RESPONSE,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          },
          PLAYER_ONSTATUS_POSITION_VALUE: {
            data: [
              {
                type: 'fixture',
                validations: [
                  {
                    mode: 'staticContentValidation',
                    type: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_ONSTATUS_POSITION_RESPONSE,
                    description: 'Validation of player onStatus api'
                  }
                ]
              }
            ]
          }
  
        }
  };
  
  
  exports.LOAD_CONTENT_IN_PLAYER = {
    method: 'IntegratedPlayer.load',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_LOAD,
  };
  exports.LOAD_CONTENT_IN_PLAYER_WITH_AUTOPLAY_AS_TRUE = {
    method: 'IntegratedPlayer.load',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_LOAD_AUTOPLAY_TRUE,
  };
  exports.LOAD_CONTENT_IN_PLAYER_WITH_AUTOPLAY_AS_FALSE = {
    method: 'IntegratedPlayer.load',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_LOAD_AUTOPLAY_FALSE,
  };
  exports.LOAD_CONTENT_IN_PLAYER_WITH_METADATA = {
    method: 'IntegratedPlayer.load',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_LOAD_METADATA,
  };
  exports.LOAD_CONTENT_IN_PLAYER_WITH_CONFIG = {
    method: 'IntegratedPlayer.load',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_LOAD_CONFIG,
  };
  exports.LOAD_PLAYER_WITHOUT_PROVIDER = {
    method: 'IntegratedPlayer.load',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_LOAD_WITHOUT_PROVIDER,
    expected: 'error',
  };
  exports.EXPECTED_VALUE_WHEN_CONTENT_IS_LOADED = {
    method: 'IntegratedPlayer.load',
    validationJsonPath: 'result',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_LOAD_VALUE,
  };
  exports.DESTROY_THE_PLAYER_GIVEN_BY_THE_ID = {
    method: 'IntegratedPlayer.destroy',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_APPID_PLAYERID,
  };
  exports.PLAYER_DESTROYED = {
    method: 'IntegratedPlayer.destroy',
    validationJsonPath: 'result',
  };
  exports.START_PLAYING_THE_CONTENT = {
    method: 'IntegratedPlayer.play',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_APPID_PLAYERID,
  };
  exports.EXPECTED_VALUE_WHEN_CONTENT_IS_PLAYED = {
    method: 'IntegratedPlayer.play',
    validationJsonPath: 'result'
    };
  exports.VALUE_FOR_PLAYER_STATUS_POSITION = {
    method: 'IntegratedPlayer.status',
    validationJsonPath: 'result.progress.currentPositionSeconds',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_CURRENT_POSITION_VALUE,
  };
  exports.VALUE_FOR_PLAYER_STATUS_SPEED = {
    method: 'IntegratedPlayer.status',
    validationJsonPath: 'result.progress.speed',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_PROGRESS_SPEED_VALUE,
  };
  exports.GET_LATEST_STATUS_OF_PLAYER = {
    method: 'IntegratedPlayer.status',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_APPID_PLAYERID,
  };
  exports.VALUE_FOR_PLAYER_STATUS = {
    method: 'IntegratedPlayer.status',
    validationJsonPath: 'result',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_STATUS_VALUE,
  };
  exports.STOP_PLAYING_THE_CONTENT_THAT_WAS_LAST_LOADED = {
    method: 'IntegratedPlayer.stop',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_APPID_PLAYERID,
  };
  exports.PLAYER_STOPPED = {
    method: 'IntegratedPlayer.stop',
    validationJsonPath: 'result',
  };
  exports.GET_THE_SUPPORTED_AUDIO_TRACK = {
    method: 'IntegratedPlayer.getAudioTracks',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_APPID_PLAYERID,
  };
  exports.EXPECTED_VALUE_OF_AUDIO_TRACK = {
    method: 'IntegratedPlayer.getAudioTracks',
    validationJsonPath: 'result',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_AUDIO_TRACKS_VALUE
  };
  exports.GET_THE_SUPPORTED_CAPTIONS_TRACK = {
    method: 'IntegratedPlayer.getCaptionsTracks',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_APPID_PLAYERID,
  };
  exports.EXPECTED_VALUE_OF_CAPTIONS_TRACK = {
    method: 'IntegratedPlayer.getCaptionsTracks',
    validationJsonPath: 'result',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_CAPTIONS_TRACKS_VALUE,
  };
  exports.SELECT_THE_GIVEN_AUDIO_TRACK = {
    method: 'IntegratedPlayer.setAudioTrack',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_SET_AUDIO_TRACK,
  };
  exports.EXPECTED_VALUE_WHEN_AUDIO_TRACK_IS_SELECTED = {
    method: 'IntegratedPlayer.setAudioTrack',
    validationJsonPath: 'result',
  };
  exports.LATEST_STATUS_OF_PLAYER = {
    method: 'IntegratedPlayer.status',
    validationJsonPath: 'result',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_STATUS_SET_VALUE,
  };
  exports.EXPECTED_VALUE_FOR_LATEST_STATUS_OF_PLAYER = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.mediaSessionId',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_MEDIASESSIONID_VALUE,
  };
  exports.SELECT_THE_GIVEN_CAPTIONS_TRACK = {
    method: 'IntegratedPlayer.setCaptionsTrack',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_SET_CAPTIONS_TRACK,
  };
  exports.EXPECTED_VALUE_WHEN_CAPTIONS_TRACK_IS_SELECTED = {
    method: 'IntegratedPlayer.setCaptionsTrack',
    validationJsonPath: 'result',
  };
  exports.SET_POSITION_OF_PLAYER_IN_SECONDS_FOR_THE_MEDIA = {
    method: 'IntegratedPlayer.seekTo',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_SET_POSITION,
  };
  exports.SET_POSITION_TO_8 = {
    method: 'IntegratedPlayer.seekTo',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_SET_POSITION_8,
  };
  exports.EXPECTED_VALUE_OF_POSITION = {
    method: 'IntegratedPlayer.seekTo',
    validationJsonPath: 'result',
  };
  exports.SET_SPEED_OF_PLAYER = {
    method: 'IntegratedPlayer.setSpeed',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_SET_SPEED,
  };
  exports.SET_SPEED_TO_4 = {
    method: 'IntegratedPlayer.setSpeed',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_SET_SPEED_4,
  };
  exports.EXPECTED_VALUE_OF_SPEED = {
    method: 'IntegratedPlayer.setSpeed',
    validationJsonPath: 'result',
  };
  exports.PROVIDE_STATUS = {
    method: 'IntegratedPlayer.provideStatus',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROVIDE_STATUS,
  };
  exports.PROVIDE_STATUS_WITH_MEDIASESSIONID = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROVIDE_STATUS_MEDIASESSIONID,
  };
  exports.PROVIDE_STATUS_WITH_STATE_AS_IDLE = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROVIDE_STATE_IDLE,
  };
  exports.PROVIDE_STATUS_WITH_STATE_AS_PENDING = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROVIDE_STATE_PENDING,
  };
  exports.PROVIDE_STATUS_WITH_STATE_AS_PLAYING = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROVIDE_STATE_PLAYING,
  };
  exports.PROVIDE_STATUS_WITH_STATE_AS_BLOCKED = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROVIDE_STATE_BLOCKED,
  };
  exports.PROVIDE_STATUS_WITH_STATE_AS_FAILED = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROVIDE_STATE_FAILED,
  };
  exports.PROVIDE_STATUS_WITH_BLOCKED_REASON_AS_NO_NETWORK = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_PROVIDE_STATE_BLOCKED_NO_NETWORK,
  };
  exports.PROVIDE_STATUS_WITH_BLOCKED_REASON_AS_CONTENT_NOT_FOUND = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_PROVIDE_STATE_BLOCKED_CONTENT_NOT_FOUND,
  };
  exports.PROVIDE_STATUS_WITH_BLOCKED_REASON_AS_DRM_ERROR = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROVIDE_STATE_BLOCKED_DRM_ERROR,
  };
  exports.PROVIDE_STATUS_WITH_BLOCKED_REASON_AS_NOT_ENTITLED = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_PROVIDE_STATE_BLOCKED_NOT_ENTITLED,
  };
  exports.PROVIDE_STATUS_WITH_BLOCKED_REASON_AS_GEO_BLOCKED = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_PROVIDE_STATE_BLOCKED_GEO_BLOCKED,
  };
  exports.PROVIDE_STATUS_WITH_BLOCKED_REASON_AS_CHANNEL_NOT_SCANNED = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_PROVIDE_STATE_BLOCKED_CHANNEL_NOT_SCANNED,
  };
  exports.PROVIDE_STATUS_WITH_BLOCKED_REASON_AS_NO_SIGNAL = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROVIDE_STATE_BLOCKED_NO_SIGNAL,
  };
  exports.PROVIDE_STATUS_WITH_BLOCKED_REASON_AS_TECHNICAL_FAULT = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_PROVIDE_STATE_BLOCKED_TECHNICAL_FAULT,
  };
  exports.PROVIDE_STATUS_WITH_BLOCKED_REASON_AS_CHANNEL_OFF_AIR = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_PROVIDE_STATE_BLOCKED_CHANNEL_OFF_AIR,
  };
  exports.PROVIDE_STATUS_WITH_BLOCKED_REASON_AS_PLAYER_FAILURE = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_PROVIDE_STATE_BLOCKED_PLAYER_FAILURE,
  };
  exports.INVOKE_PROVIDE_STATUS = {
    method: 'integratedproviderplayer_IntegratedPlayer.provideStatus',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_PROVIDESTATUS_PARAM,
  };
  exports.VALUE_FOR_PROVIDE_STATUS = {
    method: 'IntegratedPlayer.provideStatus',
    validationJsonPath: 'result',
  };
  exports.CREATE_PLAYER_INSTANCE = {
    method: 'IntegratedPlayer.create',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_CREATE_INSTANCE_PARAM,
  };
  exports.PLAYER_INSTANCE = {
    method: 'IntegratedPlayer.create',
    validationJsonPath: 'result',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_INSTANCE,
  };
  
  exports.PLAYER_ONSTATUS = {
    method: 'IntegratedPlayer.onStatus',
    params: this.STATIC_COMMON_VARIABLES.DEFAULT.ONSTATUS_PARAM,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_STATE_IDLE = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.state',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_STATE_IDLE_VALUE,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_STATE_FAILED = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.state',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_STATE_FAILED_VALUE,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_STATE_PENDING = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.state',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_STATE_PENDING_VALUE,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_STATE_PLAYING = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.state',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_STATE_PLAYING_VALUE,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_STATE_BLOCKED = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.state',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_STATE_BLOCKED_VALUE,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_BLOCKED_REASON_NO_NETWORK = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.blockedReason',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_BLOCKED_NO_NETWORK,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_BLOCKED_REASON_CONTENT_NOT_FOUND = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.blockedReason',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_BLOCKED_CONTENT_NOT_FOUND,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_BLOCKED_REASON_DRM_ERROR = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.blockedReason',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_BLOCKED_DRM_ERROR,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_BLOCKED_REASON_NOT_ENTITLED = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.blockedReason',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_BLOCKED_NOT_ENTITLED,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_BLOCKED_REASON_GEO_BLOCKED = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.blockedReason',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_BLOCKED_GEO_BLOCKED,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_BLOCKED_REASON_CHANNEL_NOT_SCANNED = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.blockedReason',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_BLOCKED_CHANNEL_NOT_SCANNED,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_BLOCKED_REASON_NO_SIGNAL = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.blockedReason',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_BLOCKED_NO_SIGNAL,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_BLOCKED_REASON_TECHNICAL_FAULT = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.blockedReason',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_BLOCKED_TECHNICAL_FAULT,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_BLOCKED_REASON_CHANNEL_OFF_AIR = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.blockedReason',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_BLOCKED_CHANNEL_OFF_AIR,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_BLOCKED_REASON_PLAYER_FAILURE = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.status.blockedReason',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_BLOCKED_PLAYER_FAILURE,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_SPEED = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.progress.speed',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_SPEED_VALUE,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_UTC_LIVE_TIME = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.progress.utcLiveTime',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_UTC_VALUE,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_CURRENT_POSITION_SECONDS = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.progress.currentPositionSeconds',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_CURRENT_POSITION_VALUE,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_START_POSITION_SECONDS = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.progress.startPositionSeconds',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_START_POSITION_VALUE,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_RESUME_POSITION_SECONDS = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.progress.resumePositionSeconds',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_RESUME_POSITION_VALUE,
  };
  exports.VALUE_OF_PLAYER_ONSTATUS_END_POSITION_SECONDS = {
    event: 'IntegratedPlayer.onStatus',
    validationJsonPath: 'eventResponse.progress.endPositionSeconds',
    content: this.STATIC_VALIDATION_VARIABLES.INTEGRATEDPLAYER.PLAYER_ONSTATUS_END_POSITION_VALUE,
  };
  exports.PLAYER_INSTANCE_NOT_AVAILABLE = {
    method: 'IntegratedPlayer.create',
    validationJsonPath: 'result',
    expectingError: true,
  };
  exports.NOT_AVAILABLE_FOR_PLAYER_LOAD = {
    method: 'IntegratedPlayer.load',
    validationJsonPath: 'result',
    content: 'NOT_AVAILABLE',
    expectingError: true,
  };
  exports.LOAD_PLAYER_BEFORE_PLAYER_CREATION = {
    method: 'IntegratedPlayer.load',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT.PLAYER_LOAD_BEFORE_PLAYER_CREATION,
    expected: 'error',
  };
  exports.START_PLAYING_THE_CONTENT_BEFORE_PLAYER_CREATION = {
    method: 'IntegratedPlayer.play',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_APPID_PLAYERID_BEFORE_PLAYER_CREATION,
    expected: 'error',
  };
  exports.GET_PLAYER_STATUS_BEFORE_PLAYER_CREATION = {
    method: 'IntegratedPlayer.status',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_APPID_PLAYERID_BEFORE_PLAYER_CREATION,
    expected: 'error',
  };
  exports.GET_AUDIO_TRACKS_BEFORE_PLAYER_CREATION = {
    method: 'IntegratedPlayer.getCaptionsTracks',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_APPID_PLAYERID_BEFORE_PLAYER_CREATION,
    expected: 'error',
  };
  exports.GET_THE_SUPPORTED_CAPTIONS_TRACK_BEFORE_PLAYER_CREATION = {
    method: 'IntegratedPlayer.getCaptionsTracks',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_APPID_PLAYERID_BEFORE_PLAYER_CREATION,
    expected: 'error',
  };
  exports.SELECT_THE_GIVEN_AUDIO_TRACK_BEFORE_PLAYER_CREATION = {
    method: 'IntegratedPlayer.setAudioTrack',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_SET_TRACK_BEFORE_PLAYER_CREATION,
    expected: 'error',
  };
  exports.SELECT_THE_GIVEN_CAPTIONS_TRACK_BEFORE_PLAYER_CREATION = {
    method: 'IntegratedPlayer.setCaptionsTrack',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_SET_TRACK_BEFORE_PLAYER_CREATION,
    expected: 'error',
  };
  exports.SET_POSITION_OF_PLAYER_IN_SECONDS_FOR_THE_MEDIA_BEFORE_PLAYER_CREATION =
    {
      method: 'IntegratedPlayer.seekTo',
      params:
        this.STATIC_COMMON_VARIABLES.DEFAULT
          .PLAYER_SET_POSITION_BEFORE_PLAYER_CREATION,
      expected: 'error',
    };
  exports.SET_SPEED_OF_PLAYER_BEFORE_PLAYER_CREATION = {
    method: 'IntegratedPlayer.setSpeed',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_SET_SPEED_BEFORE_PLAYER_CREATION,
    expected: 'error',
  };
  exports.PROVIDE_STATUS_BEFORE_PLAYER_CREATION = {
    method: 'IntegratedPlayer.provideStatus',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_PROVIDE_STATUS_BEFORE_PLAYER_CREATION,
    expected: 'error',
  };
  exports.STOP_PLAYING_THE_CONTENT_THAT_WAS_LAST_LOADED_BEFORE_PLAYER_CREATION = {
    method: 'IntegratedPlayer.stop',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_APPID_PLAYERID_BEFORE_PLAYER_CREATION,
    expected: 'error',
  };
  exports.DESTROY_THE_PLAYER_GIVEN_BY_THE_ID_BEFORE_PLAYER_CREATION = {
    method: 'IntegratedPlayer.destroy',
    params:
      this.STATIC_COMMON_VARIABLES.DEFAULT
        .PLAYER_APPID_PLAYERID_BEFORE_PLAYER_CREATION,
    expected: 'error',
  };
  