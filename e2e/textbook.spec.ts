import {test,expect} from '@playwright/test';

test('both complete lessons read continuously, with no card-based reading gates',async({page})=>{
 const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/lesson/1.1.1');
 await expect(page.locator('.textbook-topic')).toHaveCount(13);
 await expect(page.locator('.textbook-markdown').first()).toContainText('Imagine a customer ordering dinner');
 await expect(page.getByTestId('embedded-lab-6')).toBeAttached();
 await expect(page.locator('.story-map,.story-step-rail,.story-prose-card')).toHaveCount(0);
 await page.goto('/#/lesson/1.1.2');
 await expect(page.locator('.textbook-topic')).toHaveCount(14);
 await expect(page.getByTestId('embedded-lab-10')).toBeAttached();
 await expect(page.locator('.story-map,.story-step-rail,.story-prose-card')).toHaveCount(0);
 expect(errors).toEqual([]);
});

test('four distinct business definitions are immediately readable without clicking',async({page})=>{
 await page.goto('/#/lesson/1.1.2?section=2');
 const gallery=page.getByTestId('textbook-topic-2').getByTestId('textbook-definitions').first();
 await expect(gallery.locator('dt')).toHaveText(['Business capability','Use case','User story','Endpoint']);
 await expect(gallery.locator('dd')).toHaveCount(4);
 await expect(gallery).toContainText('observable outcome');
 await expect(gallery.getByRole('button')).toHaveCount(0);
});

test('UC-001 execution is presented as eight visible and complete stages',async({page})=>{
 await page.goto('/#/lesson/1.1.2?section=3');
 const flow=page.getByTestId('textbook-topic-3').getByTestId('textbook-steps');
 await expect(flow.locator('ol>li')).toHaveCount(8);
 await expect(flow).toContainText('OrderController parses JSON');
 await expect(flow).toContainText('ConcurrentHashMap');
 await expect(flow).toContainText('201 Created');
 await flow.getByText('Compare with original paragraph').click();
 await expect(flow).toContainText('Normal flow');
});

test('acceptance criteria remain seven independently legible outcomes',async({page})=>{
 await page.goto('/#/lesson/1.1.2?section=9');
 const criteria=page.getByTestId('textbook-topic-9').getByTestId('textbook-criteria');
 await expect(criteria.locator('dt')).toHaveText(['AC-01','AC-02','AC-03','AC-04','AC-05','AC-06','AC-07']);
 await expect(criteria).toContainText('ITEM_UNAVAILABLE');
 await expect(criteria).toContainText('distinct order IDs');
});

test('sidebar deep links scroll to their topic without a second navigation layer',async({page})=>{
 await page.goto('/#/lesson/1.1.2?section=10');
 const nav=page.getByTestId('course-outline');
 await expect(nav.getByTestId('outline-section-1.1.2-10')).toHaveAttribute('aria-current','location');
 await expect.poll(()=>page.evaluate(()=>Math.abs(document.querySelector('#topic-10')!.getBoundingClientRect().top))).toBeLessThan(180);
 await nav.getByTestId('outline-section-1.1.2-3').click();
 await expect(page).toHaveURL(/lesson\/1\.1\.2\?section=3/);
 await expect.poll(()=>page.evaluate(()=>Math.abs(document.querySelector('#topic-3')!.getBoundingClientRect().top))).toBeLessThan(180);
 await expect(page.locator('.stage-journey,.l112-nav,.l111-nav')).toHaveCount(0);
});

test('actual Java source links and non-guarantees survive the presentation migration',async({page})=>{
 await page.goto('/#/lesson/1.1.2');
 const lesson=page.getByTestId('lesson-1.1.2');
 await expect(lesson).toContainText('restaurantDecision PENDING');
 await expect(lesson).toContainText('paymentStatus NOT_STARTED');
 await expect(lesson.getByRole('link',{name:/Executed Java CI evidence/i})).toHaveAttribute('href',/42514283048/);
 await expect(lesson.getByRole('link',{name:/Immutable Java implementation/i})).toHaveAttribute('href',/08b33714431a53f6b1cb1e1e09718b0281da1ce8/);
});

for(const lesson of ['1.1.1','1.1.2']){
 test(lesson+' has no horizontal overflow and preserved topic reading on phone',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  const target=lesson==='1.1.1'?5:3;
  await page.goto('/#/lesson/'+lesson+'?section='+target);
  await expect(page.getByTestId('textbook-topic-'+target)).toBeAttached();
  await page.getByRole('button',{name:'Open navigation'}).click();
  await expect(page.getByTestId('course-outline')).toBeVisible();
  await page.getByTestId('outline-section-'+lesson+'-2').click();
  await expect(page.locator('.shade')).toHaveCount(0);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(16);
 });
}
