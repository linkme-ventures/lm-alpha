import { Linkmev1Page } from './app.po';

describe('linkmev1 App', () => {
  let page: Linkmev1Page;

  beforeEach(() => {
    page = new Linkmev1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
