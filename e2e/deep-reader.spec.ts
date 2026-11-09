import {test,expect} from '@playwright/test';

test('Lesson 1.1.1 deep reader has curated meaningful cues and comfortable controls',async({page})=>{
 const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/lesson/1.1.1');
 const story=page.getByTestId('guided-story');
 const highlights=story.getByTestId('reading-highlights');
 await expect(highlights.getByRole('button')).toHaveCount(3);
 await expect(highlights).toContainText('One order, several conflicting facts');
 await expect(story.getByTestId('reading-step').locator('[data-kind="example"]')).toBeVisible();
 await story.getByRole('button',{name:'Increase text size'}).click();
 await expect(story.getByTestId('reading-step').locator('.reader-article')).toHaveAttribute('data-text-size','1');
 await story.getByRole('button',{name:'Wider text'}).click();
 await expect(story.getByTestId('reading-step').locator('.reader-article')).toHaveClass(/reader-wide/);
 await story.getByRole('button',{name:'Highlights on'}).click();
 await expect(story.getByTestId('reading-step').locator('.reader-margin-cue')).toHaveCount(0);
 await story.getByRole('button',{name:'Highlights off'}).click();
 await expect(story.getByTestId('reading-step').locator('.reader-margin-cue').first()).toBeVisible();
 expect(errors).toEqual([]);
});

test('Lesson 1.1.2 jumps to authored mechanism, shows warning cues, and retains full source',async({page})=>{
 await page.goto('/#/lesson/1.1.2?section=3');
 const story=page.getByTestId('guided-story');
 await expect(story.getByTestId('reading-highlights')).toContainText('Follow the end-to-end request flow');
 await story.getByRole('button',{name:'Jump to Follow the end-to-end request flow'}).click();
 await expect(story.getByTestId('reading-step')).toContainText('PlaceOrderService');
 await expect(story.getByTestId('reading-step').getByTestId('visual-numbered')).toContainText('UC-001 · Normal flow');
 await story.getByRole('button',{name:'Read all',exact:true}).click();
 const full=story.getByTestId('full-reading');
 await expect(full.locator('.reader-margin-cue')).toHaveCount(2);
 await expect(full.getByTestId('visual-numbered').locator('.structured-timeline>li')).toHaveCount(8);
 await expect(full).toContainText('Not promised');
 await story.getByRole('button',{name:'Jump to Specify what is not a postcondition'}).click();
 await expect(story.getByTestId('reading-step')).toContainText('merchant');
 await expect(story.getByRole('button',{name:'Guided steps'})).toHaveAttribute('aria-pressed','true');
});

for(const id of ['1.1.1','1.1.2']){
 test(id+' uses semantic reading without page overflow on mobile',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/#/lesson/'+id);
  const story=page.getByTestId('guided-story');
  await story.getByRole('button',{name:'Read all',exact:true}).click();
  await expect(story.getByTestId('full-reading').locator('.reader-passage').first()).toBeVisible();
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(16);
 });
}
