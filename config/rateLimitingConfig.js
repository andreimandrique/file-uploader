const rateLimitingConfig = {
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

export default rateLimitingConfig;
