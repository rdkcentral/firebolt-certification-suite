function defaultMethod(eventEmitter) {
  eventEmitter.on('mochawesome', (mochawesomeReport) => {
    console.log('Received Report: ', mochawesomeReport);
  });
  eventEmitter.on('cucumber', (cucumberReport) => {
    console.log('Received Report: ', cucumberReport);
  });
  return true;
}

module.exports = { defaultMethod };
