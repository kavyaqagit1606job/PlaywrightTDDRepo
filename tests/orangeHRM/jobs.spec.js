const { test, expect } = require('../../src/fixtures');
const { generateDynamicName, randomPick } = require('../../src/utils/randomDataGenerator');

test.describe('Jobs - Job Titles', () => {

  test.beforeEach(async ({ loginPage, commonPage, userData }) => {
    await loginPage.loginAsAdmin(userData);      // valid[0] from userData.json
    await commonPage.navigateToAdmin();
    await commonPage.navigateToJobs();
  });


  test('TC-JOBS-001 | Add job title with all fields, upload image, assert and delete', async ({ jobsPage, testData, uploads }) => {
    const jobData = testData.jobs[0];          
    const title   = generateDynamicName(jobData.jobTitle);

    // Add
    await jobsPage.addJobTitle(
      title,
      jobData.description,
      jobData.note,
      uploads.images.jobsimage      
    );
    await jobsPage.assertJobTitleAdded(title);

    await jobsPage.deleteJobTitle(title);
  });

  test('TC-JOBS-002 | Assert Mandatory fields', async ({ jobsPage, testData, uploads }) => {
    await jobsPage.assertMandatoryField();
  });

});