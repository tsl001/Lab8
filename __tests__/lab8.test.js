describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5501');
    //await page.waitForNavigation();
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000); 

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    const entries = await page.$$('journal-entry');
    await entries[0].click();
    await page.waitForTimeout(4000);
    let currentURL = await page.url();
    
    expect(currentURL).toBe('http://127.0.0.1:5501/#entry1');
  },30000);

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const titleElement = await page.$eval("header > h1",e => e.textContent);
    expect(titleElement).toBe("Entry 1");
  },30000);

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */

      const entryTitle = await page.evaluate(() => {
        let title = document.querySelector('entry-page').
                    shadowRoot.querySelector('section[class="post"] > section[class="entry-title-section"] > h2[class="entry-title"]').innerHTML;
        return title;
      });

      const entryDate = await page.evaluate(() => {
        let date = document.querySelector('entry-page').
                    shadowRoot.querySelector('section[class="post"] > section[class="entry-title-section"] > p[class="entry-date"]').innerHTML;
        return date;
      });

      const entryContent = await page.evaluate(() => {
        let content = document.querySelector('entry-page').
                    shadowRoot.querySelector('section[class="post"] > section[class="entry-content-section"] > p[class="entry-content"]').innerHTML;
        return content;
      });

      const entryImgSrc = await page.evaluate(() => {
        let imgSrc = document.querySelector('entry-page').
                    shadowRoot.querySelector('section[class="post"] > img[class="entry-image"]').src;
        return imgSrc;
      });

      const entryImgAlt = await page.evaluate(() => {
        let imgAlt = document.querySelector('entry-page').
                    shadowRoot.querySelector('section[class="post"] > img[class="entry-image"]').alt;
        return imgAlt;
      });

      const ObjRet = {
        title: entryTitle,
        date: entryDate,
        content: entryContent,
        image: {
          src: entryImgSrc,
          alt: entryImgAlt
        }
      }

      expect(ObjRet).toEqual({title: 'You like jazz?',
        date: '4/25/2021',
        content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
        image: {
          src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
          alt: 'bee with sunglasses'
        }});
  }, 30000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const bodyClass = await page.evaluate(() => {
      return document.querySelector('body').className;
    });

    expect(bodyClass).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    const settingsElement = await page.evaluate(() => {
      return document.querySelector('[src="./styles/settings.svg"]').click();
    });

    //await settingsElement.click();
    await page.waitForTimeout(7000);
    let currentURL = await page.url();

    expect(currentURL).toBe('http://127.0.0.1:5501/#settings');
  },30000);

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const titleElement = await page.$eval("header > h1",e => e.textContent);
    expect(titleElement).toBe("Settings");
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const bodyClass = await page.evaluate(() => {
      return document.querySelector('body').className;
    });

    expect(bodyClass).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    let currentURL = await page.url();
    expect(currentURL).toBe('http://127.0.0.1:5501/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, new URL should be the homepage', async() => {

    await page.goBack();
    let currentURL = await page.url();
    expect(currentURL).toBe('http://127.0.0.1:5501/');
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: Clicking the back button, new URL should be the homepage', async() => {
    const pageTitle = await page.evaluate(() => {
      return document.querySelector('header > h1').innerText;
    });
    expect(pageTitle).toBe('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute ', async () => {
    const bodyClass = await page.evaluate(() => {
      return document.querySelector('body').className;
    });

    expect(bodyClass).toBe("");
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async () => {
    const entries = await page.$$('journal-entry');
    await entries[1].click();
    await page.waitForTimeout(4000);

    let currentURL = await page.url();
    expect(currentURL).toBe('http://127.0.0.1:5501/#entry2');
  },30000);

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async () => {
    const entry2Title = await page.evaluate(() => {
      return document.querySelector('header > h1').innerText;
    });

    expect(entry2Title).toBe('Entry 2');
  },30000);

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
    const entry2Title = await page.evaluate(() => {
      return document.querySelector('entry-page').
            shadowRoot.querySelector('section[class="post"] > section[class="entry-title-section"] > h2[class="entry-title"]').innerText;
    });

    const entry2Date = await page.evaluate(() => {
      return document.querySelector('entry-page').
            shadowRoot.querySelector('section[class="post"] > section[class="entry-title-section"] > p[class="entry-date"]').innerText;
    });

    const entry2Content = await page.evaluate(() => {
      return document.querySelector('entry-page').
            shadowRoot.querySelector('section[class="post"] > section[class="entry-content-section"] > p[class="entry-content"]').innerText;
    });

    const entry2ImgSrc = await page.evaluate(() => {
      return document.querySelector('entry-page').
            shadowRoot.querySelector('section[class="post"] >  img[class="entry-image"]').src;
    });

    const entry2ImgAlt = await page.evaluate(() => {
      return document.querySelector('entry-page').
            shadowRoot.querySelector('section[class="post"] >  img[class="entry-image"]').alt;
    });

    const entry2Obj = {
      title: entry2Title,
      date: entry2Date,
      content: entry2Content,
      image: {
        src: entry2ImgSrc,
        alt: entry2ImgAlt
      }
    };

    expect(entry2Obj).toEqual({
      title: 'Run, Forrest! Run!',
      date: '4/26/2021',
      content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
        alt: 'forrest running'
      }
    });
  });

  // create your own test 17
  it('Test17: Verify on correct url after going back twice from settings to entry 2 then to homepage', async () => {
    const settingsElement = await page.evaluate(() => {
      return document.querySelector('[src="./styles/settings.svg"]').click();
    });

    await page.goBack();
    await page.goBack();

    let currentURL = await page.url();
    expect(currentURL).toBe('http://127.0.0.1:5501/');
  },30000);
  // create your own test 18
  it('Test18: Verify starwars entry url is correct', async () => {
    const entries = await page.$$('journal-entry');
    await entries[9].click();
    await page.waitForTimeout(4000);
    const currentURL = await page.url();

    expect(currentURL).toBe('http://127.0.0.1:5501/#entry10');
  },30000);

  // create your own test 19
  it('Test19: Verify starwars audio src is correct', async () => {
    const entryAudioSrc = await page.evaluate(() => {
      return document.querySelector('entry-page').
            shadowRoot.querySelector('section[class="post"] > section[class="entry-audio-section"] > audio[class="entry-audio"]').src;
    });

    expect(entryAudioSrc).toBe('https://drive.google.com/uc?export=download&id=1luYh909US7ZBFe6uo440Vv_LNnRdnErT');
  },30000);

  // create your own test 20
  it('Test20: Verify number of entries is 9 after removing starwars', async () => {
    await page.goBack();
    
    await page.evaluate(() => {
      let pageEntries = document.querySelectorAll('journal-entry');
      pageEntries[9].remove();
    });
    
    let entries = await page.$$('journal-entry');
    //await entries[9].remove();
    entries = await page.$$('journal-entry');

    expect(entries.length).toBe(9);
  },30000);
});
