import {test,expect} from '@playwright/test';

for(const lesson of ['1.1.1','1.1.2']){
 test(lesson+' remains readable on phone and stage navigation works',async({page})=>{
  const errors:string[]=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width:390,height:844});
  await page.goto('/#/lesson/'+lesson);
  const stage=page.getByTestId('stage-journey');
  await expect(stage).toBeVisible();
  await expect(page.getByTestId('story-map')).toBeVisible();
  await stage.getByRole('button',{name:/Defend/i}).click();
  await expect(page.getByTestId('story-map')).toBeVisible();
  const story=page.getByTestId('guided-story');
  await story.getByRole('button',{name:'Read all',exact:true}).click();
  await expect(story.getByTestId('full-reading')).toBeVisible();
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow,'unexpected page-level horizontal overflow on mobile').toBeLessThanOrEqual(16);
  await page.getByRole('button',{name:'Switch to light theme'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await expect(story.getByTestId('story-map')).toBeVisible();
  expect(errors).toEqual([]);
 });
}
