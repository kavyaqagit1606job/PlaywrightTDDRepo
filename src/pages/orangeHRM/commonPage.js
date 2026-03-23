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
    await this.waitForVisible(this.adminMenu,80_000);
    await this.click(this.adminMenu);                         
    await this.waitForVisible(this.adminHeading,80_000);            
    await this.waitForURL('**/admin/viewSystemUsers');        
  }

  async navigateToJobs() {
    await this.waitForVisible(this.jobsMenu,80_000);
    await this.click(this.jobsMenu,{force:true});                           
    await this.click(this.jobTitlesOption,{force:true});                    
    await this.waitForURL('**/admin/viewJobTitleList');        
  }
}

module.exports = { CommonPage };