exports.NOTIFY_USER_HAS_NAVIGATED_TO_PAGE_WITH_ID_CETTAGS_TEST_PAGE1 = {
  method: 'metrics.page',
  params: { pageId: 'cettags_test_page1' },
};

exports.NOTIFY_USER_HAS_NAVIGATED_TO_PAGE_WITH_ID_CETTAGS_TEST_PAGE2 = {
  method: 'metrics.page',
  params: { pageId: 'cettags_test_page2' },
};

exports.NOTIFY_USER_HAS_NAVIGATED_TO_PAGE_WITH_ID_METRICS_TEST_PAGE1 = {
  method: 'metrics.page',
  params: { pageId: 'metrics_test_page1' },
};

exports.NOTIFY_USER_HAS_NAVIGATED_TO_PAGE_WITH_ID_METRICS_TEST_PAGE2 = {
  method: 'metrics.page',
  params: { pageId: 'metrics_test_page2' },
};

exports.ADDCONTEXT_FOR_METRICS = {
  method: 'MetricsManagement.addContext',
  params: {
    context: {
      deviceSessionId: 'ccccc-cccc-cccc-cccc-cccccccc',
    },
  },
};

exports.REMOVECONTEXT_FOR_METRICS = {
  method: 'MetricsManagement.removeContext',
  params: {
    keys: ['deviceSessionId'],
  },
};

exports.NULL_FOR_METRICS_ADDCONTEXT = {
  method: 'MetricsManagement.addContext',
  validationJsonPath: 'result',
  content: null,
};

exports.NULL_FOR_METRICS_REMOVECONTEXT = {
  method: 'MetricsManagement.removeContext',
  validationJsonPath: 'result',
  content: null,
};
