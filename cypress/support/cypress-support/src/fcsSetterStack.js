const fcsMethodStack = [];

// This module is used to keep track of the current method being executed in the FCS

module.exports = {
  pushMethod: (method) => {
    fcsMethodStack.push(method);
    console.log(`Pushed ${method} in the stack [${fcsMethodStack.join(', ')}]`);
  },
  popMethod: () => {
    fcsMethodStack.pop();
  },
  getCurrentMethod: () => {
    return fcsMethodStack.length > 0 ? fcsMethodStack[fcsMethodStack.length - 1] : null;
  },
};
