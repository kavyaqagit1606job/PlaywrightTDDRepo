const path = require('path');
const { CONFIG } = require('../config/env');

/**
 * uploadPaths
 *
 * Single source of truth for every upload file in the framework.
 * All paths are resolved absolutely at load time so they work
 * regardless of where `npx playwright test` is invoked from.
 *
 * Folder convention:
 *   testData/<app>/uploads/
 *     images/      → .png  .jpg  .jpeg  .gif  .webp
 *     documents/   → .txt  .docx
 *     csv/         → .csv
 *     pdf/         → .pdf
 *
 * Usage in a test:
 *   const { uploadPaths } = require('../../src/utils/uploadPaths');
 *   await jobsPage.uploadFile(selector, uploadPaths.images.sample);
 *
 * Or via the fixture (preferred — no import needed):
 *   test('...', async ({ uploads }) => {
 *     await jobsPage.uploadFile(selector, uploads.images.sample);
 *   });
 */

const base = path.resolve(
  __dirname, `../../testData/${CONFIG.testDataPath}/uploads`
);

const uploadPaths = {
  images: {
    sample: path.join(base, 'images', 'sample.png')
    // add more:  logo: path.join(base, 'images', 'logo.jpg')
  },
  documents: {
    sample: path.join(base, 'documents', 'sample.txt')
    // add more:  resume: path.join(base, 'documents', 'resume.docx')
  },
  csv: {
    sample: path.join(base, 'csv', 'sample.csv')
    // add more:  bulkUsers: path.join(base, 'csv', 'bulk-users.csv')
  },
  pdf: {
    sample: path.join(base, 'pdf', 'sample.pdf')
    // add more:  contract: path.join(base, 'pdf', 'contract.pdf')
  }
};

module.exports = { uploadPaths };