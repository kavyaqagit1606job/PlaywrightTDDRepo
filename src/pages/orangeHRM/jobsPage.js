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
      await this.click(this.browseButton);                     
      await this.uploadFile(this.fileInput, filePath); 
      await page.waitForTimeout(250000);   
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
}

module.exports = { JobsPage };