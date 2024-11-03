import crons from 'node-cron';
import fs from 'fs';
import path from 'path';
import { DotenvConfig } from '../config/env.config';

// cron for every 7 days at 12:00am
export default crons.schedule('0 0 * * 0', async () => {
  console.log('Removing temp media files...');
  // loop through all the files of temp directory and check their modified time.
  // if the modified time is greater than 1 day then remove it.
  // As, temp file is not required after 1 day. (max, it can be for session of the user.)
  const files = fs.readdirSync(DotenvConfig.MEDIA_TEMP_PATH);
  files.forEach((file) => {
    const filePath = path.join(DotenvConfig.MEDIA_TEMP_PATH, file);
    const stats = fs.statSync(filePath);
    const now = new Date().getTime();
    const endTime = new Date(stats.mtime).getTime();
    const diff = now - endTime;
    const days = diff / (1000 * 60 * 60 * 24);
    if (days > 1) {
      fs.unlinkSync(filePath);
    }
  });
  console.log('Temp media files removed successfully!');
});
