class Logger {
  static log = (...args) => {
    if (args.length === 1) {
      const [arg] = args;
      console.log(arg);
    } else {
      console.log(args);
    }
  };
}

export default Logger;
