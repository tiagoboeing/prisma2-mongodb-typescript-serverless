module.exports.handler = () => {
  console.log('Is offline?', process.env.IS_OFFLINE);

  return {
    path: process.env.IS_OFFLINE ? '' : '/opt/query-engine-rhel-openssl-1.0.x'
  };
};
