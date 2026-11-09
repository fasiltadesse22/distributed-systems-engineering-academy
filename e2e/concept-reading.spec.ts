import {test,expect} from '@playwright/test';

test('Capability, use case, user story and endpoint are FOUR independent reader cards',async({page})=>{
 const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/lesson/1.1.2?section=2');
 const story=page.getByTestId('guided-story');
 await story.getByRole('button',{name:'Read all',exact:true}).click();
 const gallery=story.getByTestId('visual-definitions');
 await expect(gallery.locator('.structured-tile')).toHaveCount(4);
 await expect(gallery).toContainText('Business capability');
 await expect(gallery).toContainText('Use case');
 await expect(gallery).toContainText('User story');
 await expect(gallery).toContainText('Endpoint');
 await gallery.getByRole('button',{name:'Inspect Use case'}).click();
 await expect(gallery.getByRole('complementary',{name:'Selected item explanation'})).toContainText('testable interaction contract');
 await gallery.getByText('Show original paragraph').click();
 await expect(gallery.locator('.structured-source-text')).toContainText('An endpoint');
 expect(errors).toEqual([]);
});

test('Definitions, incident hypotheses and Staff Q&A use separate visual structures',async({page})=>{
 await page.goto('/#/lesson/1.1.2?section=4');
 await page.getByTestId('guided-story').getByRole('button',{name:'Read all',exact:true}).click();
 const concepts=page.getByTestId('visual-definitions');
 await expect(concepts.locator('.structured-tile')).toHaveCount(4);
 await concepts.getByRole('button',{name:'Inspect Postcondition'}).click();
 await expect(concepts.getByRole('complementary',{name:'Selected item explanation'})).toContainText('observable fact');
 await page.goto('/#/lesson/1.1.2?section=12');
 await page.getByTestId('guided-story').getByRole('button',{name:'Read all',exact:true}).click();
 await expect(page.getByTestId('visual-hypotheses').locator('.structured-tile')).toHaveCount(5);
 await page.goto('/#/lesson/1.1.2?section=13');
 await page.getByTestId('guided-story').getByRole('button',{name:'Read all',exact:true}).click();
 await expect(page.getByTestId('visual-qa').locator('.structured-tile')).toHaveCount(5);
});

test('Actor definition and long narrative are separated into readable visual paragraphs',async({page})=>{
 await page.goto('/#/lesson/1.1.1?section=2');
 const story=page.getByTestId('guided-story');
 await story.getByRole('button',{name:'Read all',exact:true}).click();
 const definition=story.getByTestId('reader-term-spotlight').first();
 await expect(definition).toContainText('actor');
 await expect(definition).toContainText('modeling viewpoint');
 await expect(story.locator('.reader-term-spotlight').count()).resolves.toBeGreaterThanOrEqual(4);
 await expect(story.locator('.reader-narrative-thought').count()).resolves.toBeGreaterThan(2);
});

test('Main left navigation shows subject titles instead of repeating Understand',async({page})=>{
 await page.goto('/#/lesson/1.1.2?section=2');
 const outline=page.getByTestId('course-outline');
 await expect(outline.getByRole('link',{name:/Capability vs use case vs API/})).toBeVisible();
 await expect(outline.getByRole('link',{name:/UC-001: Eight-step request flow/})).toBeVisible();
 await expect(outline.locator('.outline-section-link b')).toHaveCount(0);
 await outline.getByRole('link',{name:/UC-001: Eight-step request flow/}).click();
 await expect(page).toHaveURL(/lesson\/1\.1\.2\?section=3/);
 await expect(page.getByTestId('story-map')).toBeVisible();
});

for(const lesson of ['1.1.1','1.1.2']){
 test(lesson+' readable concepts and sidebar work at 390px mobile width',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto(lesson==='1.1.1'?'/#/lesson/1.1.1?section=2':'/#/lesson/1.1.2?section=2');
  await page.getByTestId('guided-story').getByRole('button',{name:'Read all',exact:true}).click();
  const component=lesson==='1.1.1'?page.getByTestId('reader-term-spotlight').first():page.getByTestId('visual-definitions');
  await expect(component).toBeVisible();
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(16);
 });
}
