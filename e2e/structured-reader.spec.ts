import {test,expect} from '@playwright/test';

test('UC-001 normal flow is a complete eight-step interactive timeline, not a run-on paragraph',async({page})=>{
 const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/lesson/1.1.2?section=3');
 const story=page.getByTestId('guided-story');
 await story.getByRole('button',{name:'Read all',exact:true}).click();
 const flow=story.getByTestId('visual-numbered');
 await expect(flow).toBeVisible();
 await expect(flow.locator('.structured-timeline>li')).toHaveCount(8);
 await expect(flow).toContainText('OrderController parses JSON');
 await expect(flow).toContainText('ConcurrentHashMap');
 await expect(flow).toContainText('201 Created');
 await flow.getByRole('button',{name:'Explain step 7: Persist the intake'}).click();
 await expect(flow.getByRole('status',{name:'Why this step matters'})).toContainText('loses records on restart');
 await flow.getByText('Show original paragraph').click();
 await expect(flow.locator('.structured-source-text')).toContainText('(1) OrderController parses JSON');
 await expect(flow.locator('.structured-source-text')).toContainText('(8) The controller returns');
 expect(errors).toEqual([]);
});
test('acceptance criteria become seven independent cards with selected explanation',async({page})=>{
 await page.goto('/#/lesson/1.1.2?section=9');
 await page.getByTestId('guided-story').getByRole('button',{name:'Read all',exact:true}).click();
 const ac=page.getByTestId('visual-criteria');
 await expect(ac.locator('.structured-tile')).toHaveCount(7);
 await ac.getByRole('button',{name:'Inspect Expose retry limitation'}).click();
 await expect(ac.getByRole('complementary',{name:'Selected item explanation'})).toContainText('missing idempotency');
 await expect(ac).toContainText('AC-05');
});
test('lesson 1.1.1 shows authority distinctions and three incident hypotheses as separate structures',async({page})=>{
 await page.goto('/#/lesson/1.1.1?section=5');
 await page.getByTestId('guided-story').getByRole('button',{name:'Read all',exact:true}).click();
 const authority=page.getByTestId('visual-authorities');
 await expect(authority.locator('.structured-tile')).toHaveCount(4);
 await authority.getByRole('button',{name:'Inspect Fact authority'}).click();
 await expect(authority.getByRole('complementary',{name:'Selected item explanation'})).toContainText('appropriate evidence');
 await page.goto('/#/lesson/1.1.1?section=9');
 await page.getByTestId('guided-story').getByRole('button',{name:'Read all',exact:true}).click();
 await expect(page.getByTestId('visual-numbered').locator('.structured-timeline>li')).toHaveCount(3);
 await expect(page.getByTestId('visual-chain').locator('.structured-timeline>li')).toHaveCount(7);
 await expect(page.locator('.l111-nav')).toHaveCount(0);
});
for(const lesson of ['1.1.1','1.1.2']){
 test(lesson+' structural layouts fit a phone viewport',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  const route=lesson==='1.1.1'?'/#/lesson/1.1.1?section=9':'/#/lesson/1.1.2?section=3';
  await page.goto(route);
  await page.getByTestId('guided-story').getByRole('button',{name:'Read all',exact:true}).click();
  await expect(page.getByTestId('visual-numbered').first()).toBeVisible();
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(16);
 });
}
