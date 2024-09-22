// import puppeteer from "puppeteer";
// import * as cheerio from "cheerio";

const newsItems = [
  {
    title:
      "Nepal Lube Oil Limited Calls AGM on Ashwin 18; To Endorse 25% Dividend and Discuss On FPO Agenda",
    date: "Thursday, September 12, 2024",
    url: "https://www.sharesansar.com/newsdetail/nepal-lube-oil-limited-calls-agm-on-ashwin-18-to-endorse-25-dividend-and-discuss-on-fpo-agenda-2024-09-12",
    imageUrl:
      "https://content.sharesansar.com/photos/shares/company/1631422300-nepallube.jpg",
  },
  {
    title:
      "Protective Micro Insurance Limited to Issue 2,250,000 Shares to the General Public",
    date: "Tuesday, September 10, 2024",
    url: "https://www.sharesansar.com/newsdetail/protective-micro-insurance-limited-to-issue-2250000-shares-to-the-general-public-2024-09-10",
    imageUrl:
      "https://content.sharesansar.com/photos/Ranjana/Sep 1/Sep 3/nnann.jpg",
  },
  {
    title:
      "Time Pharmaceuticals Limited Calls AGM With Agenda to Discuss IPO Issuance",
    date: "Sunday, September 8, 2024",
    url: "https://www.sharesansar.com/newsdetail/time-pharmaceuticals-limited-calls-agm-with-agenda-to-discuss-ipo-issuance-2024-09-08",
    imageUrl:
      "https://content.sharesansar.com/photos/shares/company/1725771560-time feat.jpg",
  },
  {
    title:
      "Pashupati Renewables Limited Appoints NMB Capital Limited as Issue and Sales Manager for Upcoming IPO",
    date: "Friday, September 6, 2024",
    url: "https://www.sharesansar.com/newsdetail/pashupati-renewables-limited-appoints-nmb-capital-limited-as-issue-and-sales-manager-for-upcoming-ipo-2024-09-06",
    imageUrl:
      "https://content.sharesansar.com/photos/Ranjana/Sep 1/Sep 3/3_30.jpg",
  },
  {
    title:
      "Habitat Power Company Appoints Muktinath Capital as Issue Manager for IPO Issue",
    date: "Wednesday, September 4, 2024",
    url: "https://www.sharesansar.com/newsdetail/habitat-power-company-appoints-muktinath-capital-as-issue-manager-for-ipo-issue-2024-09-04",
    imageUrl:
      "https://content.sharesansar.com/photos/Ranjana/Sep 1/Sep 3/mukti.jpg",
  },
  {
    title:
      "Crest Micro Life Insurance Limited Set to Issue Shares to the General Public",
    date: "Wednesday, September 4, 2024",
    url: "https://www.sharesansar.com/newsdetail/crest-micro-life-insurance-limited-set-to-issue-shares-to-the-general-public-2024-09-04",
    imageUrl:
      "https://content.sharesansar.com/photos/Ranjana/Sep 1/Sep 3/ccrest.jpg",
  },
  {
    title:
      "Kantipur Pharmaceuticals Lab Limited Appoints Muktinath Capital as Sales and Issue Manager for IPO",
    date: "Tuesday, September 3, 2024",
    url: "https://www.sharesansar.com/newsdetail/kantipur-pharmaceuticals-lab-limited-appoints-muktinath-capital-as-sales-and-issue-manager-for-ipo-2024-09-03",
    imageUrl:
      "https://content.sharesansar.com/photos/Ranjana/Sep 1/Septem 1/g.jpg",
  },
  {
    title:
      "Liberty Micro Life Insurance Appoints NIMB Ace Capital as Issue Manager for IPO of 2.25 Million Shares",
    date: "Friday, August 30, 2024",
    url: "https://www.sharesansar.com/newsdetail/liberty-micro-life-insurance-appoints-nimb-ace-capital-as-issue-manager-for-ipo-of-225-million-shares-2024-08-30",
    imageUrl:
      "https://content.sharesansar.com/photos/Ranjana/May/2nd May/liberty.jpg",
  },
  {
    title:
      "Alpha Capital Limited Partners with NMB Capital Limited for Upcoming IPO",
    date: "Thursday, August 29, 2024",
    url: "https://www.sharesansar.com/newsdetail/alpha-capital-limited-partners-with-nmb-capital-limited-for-upcoming-ipo-2024-08-29",
    imageUrl:
      "https://content.sharesansar.com/photos/Ranjana/May/2nd May/nnmmmb.jpg",
  },
  {
    title:
      "Star Micro Insurance Partners with NIMB Ace Capital for Upcoming IPO",
    date: "Wednesday, August 28, 2024",
    url: "https://www.sharesansar.com/newsdetail/star-micro-insurance-partners-with-nimb-ace-capital-for-upcoming-ipo-2024-08-28",
    imageUrl:
      "https://content.sharesansar.com/photos/Ranjana/May/2nd May/nimmm.jpg",
  },
];

export async function GetNews() {
  // const install = require(`puppeteer/internal/node/install.js`).downloadBrowser;
  // await install();

  // let browser;
  try {
    //   browser = await puppeteer.launch({
    //     args: [
    //       "--use-gl=angle",
    //       "--use-angle=swiftshader",
    //       "--single-process",
    //       "--no-sandbox",
    //     ],
    //     headless: true,
    //   });

    //   const page = await browser.newPage();

    //   await page.goto("https://www.sharesansar.com/category/ipo-fpo-news");
    //   const html = await page.content();
    //   const $ = cheerio.load(html);
    //   const newsItems: any[] = [];

    //   $(".featured-news-list").each((index, element) => {
    //     const $element = $(element);

    //     const title = $element.find(".featured-news-title").text().trim();
    //     const date = $element.find(".text-org").text().trim();
    //     const url = $element.find("a").first().attr("href");
    //     const imageUrl = $element.find("img").attr("src");

    //     newsItems.push({
    //       title,
    //       date,
    //       url,
    //       imageUrl,
    //     });
    //   });

    return newsItems;
  } catch (error) {
    return [];
  } finally {
    // if (browser) {
    //   await browser.close();
    // }
  }
}
