const { BasePage } = require('./basePage');

class CommonPage extends BasePage {
  constructor(page) {
    super(page);

    // ─ Locators
    this.dashboardMenu    = page.getByRole('link', { name: 'Dashboard' });
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.adminMenu        = page.getByText('Admin');
    this.adminHeading     = page.getByRole('heading', { name: 'User Management' });
    this.jobsMenu         = page.getByRole('listitem').filter({ hasText: 'Job' }).locator('i');
    this.jobTitlesOption  = page.getByRole('menuitem', { name: 'Job Titles' });
  }

  // ─ Navigation — all use BasePage methods 

  async navigateToDashboard() {
    await this.click(this.dashboardMenu);                   
    await this.waitForVisible(this.dashboardHeading, 30_000);  
    await this.waitForURL('**/dashboard/index');               
  }

  async navigateToAdmin() {
    await this.click(this.adminMenu);                         
    await this.waitForVisible(this.adminHeading);            
    await this.waitForURL('**/admin/viewSystemUsers');        
  }

  async navigateToJobs() {
    await this.click(this.jobsMenu);                           
    await this.click(this.jobTitlesOption);                    
    await this.waitForURL('**/admin/viewJobTitleList');        
  }
}

module.exports = { CommonPage };