import { Ng4jwtudemyPage } from './app.po';

describe('ng4jwtudemy App', () => {
  let page: Ng4jwtudemyPage;

  beforeEach(() => {
    page = new Ng4jwtudemyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
