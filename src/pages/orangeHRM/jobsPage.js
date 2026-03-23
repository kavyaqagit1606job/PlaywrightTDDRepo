const { BasePage } = require('./basePage');
const { expect }   = require('@playwright/test');

class JobsPage extends BasePage {
  constructor(page) {
    super(page);

    // ─ Locators
    this.addButton           = page.locator('button.oxd-button i');
    this.jobTitleInput       = page.getByRole('textbox').nth(1);
    this.jobDescriptionInput = page.getByRole('textbox', { name: 'Type description here' });
    this.addNoteInput        = page.getByRole('textbox', { name: 'Add note' });
    this.browseButton        = page.getByText('Browse');
    this.fileInput           = page.locator('input[type="file"]');
    this.saveButton          = page.getByRole('button', { name: 'Save' });
    this.successToast        = page.locator('div.oxd-toast--success');
    this.deleteConfirmButton = page.getByRole('button', { name: 'Yes, Delete' });
  }


  async addJobTitle(jobTitle, jobDescription = '', note = '', filePath = null) {
    await this.click(this.addButton);                          
    await this.fill(this.jobTitleInput, jobTitle);             
    if (jobDescription) {
      await this.fill(this.jobDescriptionInput, jobDescription); 
    }
    if (filePath) {               
      await this.uploadFile(this.fileInput, filePath, {timeout:200_000});
      await this.assertText('div.oxd-file-input-div', "jobs.png");
      //await expect(page.locator('div.oxd-file-input-div',{timeout:80_000})).toHaveText("jobs.png");
    }
    if (note) {
      await this.fill(this.addNoteInput, note);                
    }
    await this.click(this.saveButton);                        
  }

  async deleteJobTitle(jobTitle) {
    const row = this.page.locator('div.oxd-table-card', { hasText: jobTitle });
    await this.waitForVisible(row);                            
    await this.click(row.locator('button:has(i.bi-trash)'));  
    await this.click(this.deleteConfirmButton);               
  }

  async assertJobTitleAdded(jobTitle) {
    await this.assertVisible(                                  
      this.page.locator('div.oxd-table-card').filter({ hasText: jobTitle }),150_000
    );
  }

  async assertMandatoryField() {
    await this.click(this.addButton); 
    await this.click(this.saveButton);
    await this.assertVisible('span.oxd-input-field-error-message','Required')
  }
}

module.exports = { JobsPage };