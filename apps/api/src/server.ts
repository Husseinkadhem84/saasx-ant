import app from './app.js';
import { config } from './config/env.js';

app.listen(config.PORT, '0.0.0.0', () => {
  console.log(`SAASX Engine running on http://0.0.0.0:${config.PORT} in ${config.NODE_ENV} mode`);
});
