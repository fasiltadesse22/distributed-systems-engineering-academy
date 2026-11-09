import {test,expect} from '@playwright/test';

for(const lesson of ['1.1.1','1.1.2']){
 test(lesson+' keeps its wide story readable on phone and navigates from the main sidebar',async({page})=>{
  const errors:string[]=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width:390,height:844});
  await page.goto('/#/lesson/'+lesson);
  await expect(page.getByTestId('story-map')).toBeVisible();
  await page.getByRole('button',{name:'Open navigation'}).click();
  const outline=page.getByTestId('course-outline');
  await expect(outline).toBeVisible();
  const target=lesson==='1.1.1'?12:13;
  await outline.getByTestId('outline-section-'+lesson+'-'+target).click();
  await expect(page).toHaveURL(new RegExp('lesson/'+lesson.replaceAll('.','\\.')+'\\?section='+target));
  await expect(page.getByTestId('story-map')).toBeVisible();
  await expect(page.locator('.shade')).toHaveCount(0);
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
