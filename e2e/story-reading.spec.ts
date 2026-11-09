import {test,expect} from '@playwright/test';

test('1.1.1 teaches visually and preserves source depth with an accessible full reading mode',async({page})=>{
 const failures:string[]=[];
 page.on('pageerror',error=>failures.push(error.message));
 await page.goto('/#/lesson/1.1.1');
 const story=page.getByTestId('guided-story');
 await expect(story.getByTestId('story-map')).toBeVisible();
 await expect(story.getByRole('heading',{name:/Who decides what happens/i})).toBeVisible();
 await story.getByRole('button',{name:'Inspect Restaurant'}).click();
 await expect(story.getByRole('region',{name:'Selected step explanation'})).toContainText('merchant decides feasibility');
 await story.getByRole('button',{name:/What changes if/i}).click();
 await expect(story).toContainText('falsely promotes local intake evidence');
 const preview=story.getByTestId('reading-step');
 await expect(preview).toBeVisible();
 await story.getByRole('button',{name:/Next idea/i}).click();
 await expect(preview).toContainText('READING STEP 02');
 await story.getByRole('button',{name:'Read all',exact:true}).click();
 await expect(story.getByTestId('full-reading')).toBeVisible();
 await expect(story.getByTestId('full-reading').locator('.story-prose-card').count()).resolves.toBeGreaterThan(1);
 expect(failures).toEqual([]);
});

test('1.1.2 presents actual/future boundaries and surfaces the existing scenario lab first',async({page})=>{
 const failures:string[]=[];
 page.on('pageerror',error=>failures.push(error.message));
 await page.goto('/#/lesson/1.1.2');
 const story=page.getByTestId('guided-story');
 await expect(story.getByTestId('story-map')).toBeVisible();
 await expect(story.getByTestId('story-map')).toContainText('IN CODE');
 await expect(story.getByTestId('story-map')).toContainText('FUTURE');
 await story.getByRole('button',{name:'Inspect Payment provider'}).click();
 await expect(story.getByRole('region',{name:'Selected step explanation'})).toContainText('No authorization, capture');
 await page.locator('nav[aria-label="Lesson 1.1.2 study sections"] button').nth(7).click();
 const refreshed=page.getByTestId('guided-story');
 await expect(refreshed.getByTestId('scenario-studio')).toBeVisible();
 await refreshed.getByRole('button',{name:'201',exact:true}).click();
 await refreshed.getByRole('button',{name:/Run modeled scenario/i}).click();
 await expect(refreshed.getByTestId('scenario-result')).toContainText('NOT_STARTED');
 await refreshed.getByRole('button',{name:'Read all',exact:true}).click();
 await expect(refreshed.getByTestId('full-reading')).toBeVisible();
 expect(failures).toEqual([]);
});
