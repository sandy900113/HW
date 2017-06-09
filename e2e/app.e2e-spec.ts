import { Project0524Page } from './app.po';

describe('project0524 App', () => {
  let page: Project0524Page;

  beforeEach(() => {
    page = new Project0524Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
