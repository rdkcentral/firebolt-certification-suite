const fcsMethodStack = [];

module.exports = {
  pushMethod: (method) => {
    fcsMethodStack.push(method);
    console.log('****FCS Method Stack after push:', [...fcsMethodStack]);
  },
  popMethod: () => {
    fcsMethodStack.pop();
    console.log('***FCS Method Stack after pop:', [...fcsMethodStack]);
  },
  getCurrentMethod: () => {
    return fcsMethodStack.length > 0 ? fcsMethodStack[fcsMethodStack.length - 1] : null;
  },
};