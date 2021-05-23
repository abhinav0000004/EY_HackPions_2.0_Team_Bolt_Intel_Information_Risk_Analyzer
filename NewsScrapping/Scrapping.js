async function scrape(){
  try {
    // open the headless browser
    var browser = await puppeteer.launch({ headless: true });
    // open a new page
    var page = await browser.newPage();
    // enter url in page
    await page.goto(`https://www.ndtv.com/search?searchtext=EY/`,{waitUntil: 'domcontentloaded'});
    await page.waitForSelector('p[class="header fbld"]>a');

    var news = await page.evaluate(() => {
      var titleNodeList = document.querySelectorAll('p[class="header fbld"]>a')
      
      var titleLinkArray = [];
      for (var i = 0; i <10; i++) {
        titleLinkArray[i] = { 
          title: titleNodeList[i] && titleNodeList[i].innerText.trim(),
          link: titleNodeList[i] && titleNodeList[i].getAttribute("href")
          
        }; 
      }
      return titleLinkArray;
    });
    // console.log(news);
    await browser.close();
    // Writing the news inside a json file
    fs.writeFile("ndtv.json", JSON.stringify(news), function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
    console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
}

scrape();
