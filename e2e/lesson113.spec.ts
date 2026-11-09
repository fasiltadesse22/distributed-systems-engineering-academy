import {test,expect} from '@playwright/test';

test('Lesson 1.1.3 is a complete 16-topic Visual Textbook V2 manuscript',async({page})=>{
 const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/lesson/1.1.3');
 const lesson=page.getByTestId('lesson-1.1.3');
 await expect(lesson).toBeVisible();
 await expect(lesson.locator('.textbook-topic')).toHaveCount(16);
 await expect(lesson.getByTestId('textbook-topic-1')).toContainText('From request to historical fact');
 await expect(lesson.getByTestId('textbook-topic-16')).toContainText('Transfer and mastery gate');
 await expect(lesson.getByTestId('command-fact-flow').locator('ol>li')).toHaveCount(6);
 await expect(lesson.locator('.story-step-rail,.story-prose-card')).toHaveCount(0);
 expect(errors).toEqual([]);
});

test('Lesson 1.1.3 rejects invalid fixture requests without recording success facts',async({page})=>{
 await page.goto('/#/lesson/1.1.3?section=11');
 const lab=page.getByTestId('command-fact-lab');
 await lab.getByTestId('command-scenario').selectOption('unavailable');
 await lab.getByRole('radio',{name:'Business rejection, no intake fact'}).check();
 await lab.getByRole('button',{name:'Run the model and inspect the evidence'}).click();
 const result=lab.getByTestId('command-model-result');
 await expect(result).toContainText('Prediction matches model');
 await expect(result.getByTestId('modeled-intakes')).toHaveText('0');
 await expect(result.getByTestId('modeled-facts')).toHaveText('0');
 await expect(result).toContainText('422');
 await expect(result).toContainText('NOT LIVE JAVA');
});

test('retry and lost acknowledgements are distinguished without inventing payment',async({page})=>{
 await page.goto('/#/lesson/1.1.3?section=11');
 const lab=page.getByTestId('command-fact-lab');
 await lab.getByTestId('command-scenario').selectOption('repeat');
 await lab.getByRole('radio',{name:'Two different intake records'}).check();
 await lab.getByRole('button',{name:'Run the model and inspect the evidence'}).click();
 await expect(lab.getByTestId('modeled-intakes')).toHaveText('2');
 await expect(lab.getByTestId('modeled-facts')).toHaveText('2');
 await expect(lab).toContainText('NOT duplicate merchant acceptances or payments');
 await lab.getByTestId('command-scenario').selectOption('lost-ack');
 await expect(lab.getByTestId('command-model-result')).toHaveCount(0);
 await lab.getByRole('radio',{name:'One intake recorded, acknowledgement unseen'}).check();
 await lab.getByRole('button',{name:'Run the model and inspect the evidence'}).click();
 await expect(lab.getByTestId('modeled-intakes')).toHaveText('1');
 await expect(lab.getByTestId('modeled-facts')).toHaveText('1');
 await expect(lab).toContainText('Timeout');
 await lab.getByTestId('command-scenario').selectOption('write-then-throw');
 await lab.getByRole('radio',{name:'Storage effect may exist, no success result returned'}).check();
 await lab.getByRole('button',{name:'Run the model and inspect the evidence'}).click();
 await expect(lab.getByTestId('modeled-facts')).toHaveText('0');
 await expect(lab).toContainText('adapter writes then throws');
});

test('The expandable left lesson outline uses meaningful 1.1.3 topics and deep links',async({page})=>{
 await page.goto('/#/lesson/1.1.3?section=12');
 const nav=page.getByTestId('course-outline');
 await expect(nav.getByTestId('outline-section-1.1.3-12')).toHaveAttribute('aria-current','location');
 await expect(nav).toContainText('Trace the new Java handler');
 await expect.poll(()=>page.evaluate(()=>Math.abs(document.querySelector('#topic-12')!.getBoundingClientRect().top))).toBeLessThan(190);
 await nav.getByTestId('outline-section-1.1.3-7').click();
 await expect(page).toHaveURL(/lesson\/1\.1\.3\?section=7/);
 await expect.poll(()=>page.evaluate(()=>Math.abs(document.querySelector('#topic-7')!.getBoundingClientRect().top))).toBeLessThan(190);
});

for(const theme of ['dark','light']){
 test('1.1.3 works on a 390px '+theme+' mobile reader without horizontal overflow',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/#/lesson/1.1.3?section=11');
  const themeButton=page.getByRole('button',{name:/Switch to (light|dark) theme/});
  if(theme==='light'&&await themeButton.getAttribute('aria-label')==='Switch to light theme')await themeButton.click();
  await expect(page.getByTestId('command-fact-lab')).toBeAttached();
  await page.getByRole('button',{name:'Open navigation'}).click();
  await expect(page.getByTestId('course-outline')).toBeVisible();
  await page.getByTestId('outline-section-1.1.3-2').click();
  await expect(page).toHaveURL(/lesson\/1\.1\.3\?section=2/);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(16);
 });
}
