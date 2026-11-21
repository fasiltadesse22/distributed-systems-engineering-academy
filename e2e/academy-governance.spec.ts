import {test,expect} from '@playwright/test';

test('nine continuous manuscripts retain 183 stable topic IDs and 37 positioned labs',async({page})=>{
 const counts=[13,14,16,16,22,19,26,26,31];
 const labs=[8,8,2,3,3,3,4,3,3];
 const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 for(let n=1;n<=9;n++){
  const id='1.1.'+n;
  await page.goto('/#/lesson/'+id);
  const lesson=page.getByTestId('lesson-'+id);
  await expect(lesson).toBeVisible();
  await expect(lesson.locator('.textbook-topic')).toHaveCount(counts[n-1]);
  await expect(lesson.locator('.textbook-lab')).toHaveCount(labs[n-1]);
  expect(await lesson.locator('.textbook-topic[data-topic-id]').count()).toBe(counts[n-1]);
  expect(await lesson.locator('.textbook-lab[data-lab-id]').count()).toBe(labs[n-1]);
  await expect(lesson.getByRole('alert',{name:/source anchor/})).toHaveCount(0);
  await expect(lesson.locator('.story-map,.story-step-rail,.story-prose-card')).toHaveCount(0);
 }
 expect(errors).toEqual([]);
});

test('permalink topic identities and original numerical links address the same topic',async({page})=>{
 await page.goto('/#/lesson/1.1.7?section=14');
 const topic=page.getByTestId('textbook-topic-14');
 await expect(topic).toBeVisible();
 const id=await topic.getAttribute('data-topic-id');
 expect(id).toBeTruthy();
 await topic.getByRole('link',{name:/Permanent link to/}).click();
 await expect(page).toHaveURL(new RegExp('topic='+id));
 await expect(page.getByTestId('course-outline').getByTestId('outline-section-1.1.7-14')).toHaveAttribute('aria-current','location');
 await expect.poll(async()=>page.evaluate(()=>Math.abs(document.querySelector('#topic-14')!.getBoundingClientRect().top))).toBeLessThan(180);
 await page.goBack();
 await expect(page).toHaveURL(/lesson\/1\.1\.7\?section=14/);
 await expect(page.getByTestId('course-outline').getByTestId('outline-section-1.1.7-14')).toHaveAttribute('aria-current','location');
});

test('next unimplemented lesson stays blueprint-only; homepage and blueprint describe real Java evidence accurately',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.hero-flow')).toContainText('CONCEPTUAL EXAMPLE');
 await expect(page.locator('.repo-banner')).toContainText('Lesson 1.1.9');
 await expect(page.locator('.repo-banner a')).toHaveAttribute('href',/c7d3e2d741883b1aba5fcd1e51f4275ef48344ea/);
 await page.goto('/#/blueprint');
 await expect(page.locator('.page-heading')).toContainText('9 of the 20');
 await page.getByRole('tab',{name:'Project evolution'}).click();
 await expect(page.locator('.page')).toContainText('72 passing JUnit tests');
 await page.goto('/#/lesson/1.1.10');
 await expect(page.locator('.reading-sheet')).toContainText('Blueprint specification, not an authored lesson');
});

test('desktop reading, keyboard focus and themes survive the metadata refactor',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/#/lesson/1.1.6?section=8');
 const outline=page.getByTestId('course-outline');
 await expect(outline.getByTestId('outline-section-1.1.6-8')).toHaveAttribute('aria-current','location');
 await expect(page.getByTestId('lesson-1.1.6')).toBeVisible();
 const width=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 expect(width).toBeLessThanOrEqual(16);
 await page.getByRole('button',{name:/Switch to light theme|Switch to dark theme/}).click();
 await expect(page.getByTestId('lesson-1.1.6')).toBeVisible();
 await page.keyboard.press('Tab');
 expect(await page.evaluate(()=>document.activeElement?.tagName)).not.toBe('BODY');
});
