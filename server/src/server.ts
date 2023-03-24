import { CONFIG, initializeDB } from './config';
import app from './app';

app.listen(CONFIG.PORT, () => {
  initializeDB();
  console.log(`Server running on http://localhost:${CONFIG.PORT}`);
});
