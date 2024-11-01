export default ({ config }) => ({
    ...config,
    extra: {
      SERVICE_ID: process.env.SERVICE_ID,
      TEMPLATE_ID: process.env.TEMPLATE_ID,
      PUBLIC_KEY: process.env.PUBLIC_KEY,
      IP_LOCAL: process.env.IP_LOCAL,
    }
  });