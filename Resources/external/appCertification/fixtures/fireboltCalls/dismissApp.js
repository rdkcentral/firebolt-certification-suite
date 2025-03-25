

exports.DISMISS = {
  screenshot: {
      type: 'custom',
      assertionDef: 'ScreenshotValidation',
      validations: [
          {
              type: 'image',
              label: 'home',
              confidence: 50,
          },
      ]
  }
}

