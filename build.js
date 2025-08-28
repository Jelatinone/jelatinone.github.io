/*
  ~~~
  AUTHOR: CODY WASHINGTON
  CREATED: 8.28.2025
  TITLE: A Portfolio: Cody Washington
  DESCRIPTION: Static portfolio website, showcasing several projects, my experience, and relevant skills
  ~~~
*/

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const handlebars = require('handlebars');

const ENVIRONMENT = process.env.CMS_ENV || 'local';
const WP_BASE = ENVIRONMENT === 'live'
  ? 'https://codywashington.com/wp-json/wp/v2'
  : 'http://codywashington.com.local/wp-json/wp/v2';

// Load main template
const TEMPLATE_CONTENT = fs.readFileSync('index.html', 'utf-8');
const TEMPLATE = handlebars.compile(TEMPLATE_CONTENT);

fs.readdirSync(partialDir).forEach((file) => {
  if (file.endsWith('.html')) {
    const PARTIAL_NAME = path.basename(file, '.html'); 
    const CONTENT = fs.readFileSync(path.join(path.join(__dirname, 'templates'), file), 'utf-8');
    handlebars.registerPartial(PARTIAL_NAME, CONTENT);
  }
});

async function fetchFromCMS() {
  const [ABOUT_RES, EXPERIENCE_RES, PROJECT_RES] = await Promise.all([
    fetch(`${WP_BASE}/pages?slug=about`),
    fetch(`${WP_BASE}/experience`),
    fetch(`${WP_BASE}/projects`)
  ]);

  const ABOUT_DATA = await ABOUT_RES.json();
  const EXPERIENCE_DATA = await EXPERIENCE_RES.json();
  const PROJECT_DATA = await PROJECT_RES.json();

  return {
    about: (ABOUT_DATA[0]?.content?.rendered || "").split('\n').filter(Boolean),
    experiences: EXPERIENCE_DATA.map((Entry) => ({
      link: Entry.link || "#",
      period: Entry.acf?.period || "",
      title: Entry.title?.rendered || "",
      description: Entry.content?.rendered || "",
      skills: Entry.acf?.skills || []
    })),
    projects: PROJECT_DATA.map((Entry) => ({
      link: Entry.link || "#",
      period: Entry.acf?.period || "",
      title: Entry.title?.rendered || "",
      description: Entry.content?.rendered || "",
      image: Entry.acf?.image || ""
    }))
  };
}

(async () => {
  const CMS_DATA = await fetchFromCMS();
  const RESULT = TEMPLATE(CMS_DATA);

  fs.mkdirSync('dist', { recursive: true });
  fs.writeFileSync('dist/index.html', RESULT, 'utf-8');

  console.log(`✅ Build complete. Environment: ${ENVIRONMENT}`);
})();