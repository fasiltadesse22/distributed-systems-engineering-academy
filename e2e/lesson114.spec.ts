import {test,expect} from '@playwright/test';

test('Lesson 1.1.4 renders all 16 chapters as continuous Visual Textbook V2',async({page})=>{
 const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/lesson/1.1.4');
 const lesson=page.getByTestId('lesson-1.1.4');
 await expect(lesson).toBeVisible();
 await expect(lesson.locator('.textbook-topic')).toHaveCount(16);
 await expect(lesson.getByTestId('textbook-topic-1')).toContainText('Why identity and authority matter');
 await expect(lesson.getByTestId('textbook-topic-16')).toContainText('Transfer and mastery gate');
 const diagram=lesson.getByTestId('identity-authority-map');
 await expect(diagram).toBeAttached();
 await expect(diagram.locator('.l114-map-node')).toHaveCount(6);
 await expect(diagram).toContainText('IN JAVA');
 await expect(diagram).toContainText('NOT IMPLEMENTED');
 await expect(lesson.getByTestId('authority-projection-flow').locator('ol>li')).toHaveCount(4);
 await expect(lesson.locator('.story-step-rail,.story-prose-card')).toHaveCount(0);
 expect(errors).toEqual([]);
});

test('identity lab distinguishes one order with two payment attempts from actual Java',async({page})=>{
 await page.goto('/#/lesson/1.1.4?section=9');
 const lab=page.getByTestId('identity-authority-lab');
 await expect(lab).toBeAttached();
 await lab.getByTestId('identity-scenario').selectOption('two-attempts');
 await lab.getByRole('radio',{name:'Same OrderId, distinct attempt identities'}).check();
 await lab.getByRole('button',{name:'Run model and inspect evidence'}).click();
 const result=lab.getByTestId('identity-model-result');
 await expect(result).toContainText('Prediction matches the model');
 await expect(result.getByTestId('stable-identity')).toContainText('O-17');
 await expect(result.getByTestId('changed-identity')).toContainText('P-101');
 await expect(result).toContainText('CONCEPTUAL FUTURE DOMAIN');
 await expect(result).toContainText('PaymentAttemptId and provider calls do not exist in the Java application');
});

test('duplicate same ID create differs from identical repeated PlaceOrder POST',async({page})=>{
 await page.goto('/#/lesson/1.1.4?section=9');
 const lab=page.getByTestId('identity-authority-lab');
 await lab.getByTestId('identity-scenario').selectOption('duplicate-id');
 await lab.getByRole('radio',{name:'Duplicate create rejected; original snapshot unchanged'}).check();
 await lab.getByRole('button',{name:'Run model and inspect evidence'}).click();
 await expect(lab.getByTestId('identity-model-result')).toContainText('IMPLEMENTED LOCAL JAVA CONTRACT');
 await expect(lab.getByTestId('identity-model-result')).toContainText('putIfAbsent');
 await lab.getByTestId('identity-scenario').selectOption('duplicate-post');
 await expect(lab.getByTestId('identity-model-result')).toHaveCount(0);
 await lab.getByRole('radio',{name:'Two new OrderIds are generated'}).check();
 await lab.getByRole('button',{name:'Run model and inspect evidence'}).click();
 await expect(lab.getByTestId('changed-identity')).toContainText('O-2');
 await expect(lab.getByTestId('identity-model-result')).toContainText('non-idempotent');
});

test('status projection cannot claim capture without provider evidence',async({page})=>{
 await page.goto('/#/lesson/1.1.4?section=9');
 const lab=page.getByTestId('identity-authority-lab');
 await lab.getByTestId('identity-scenario').selectOption('stale-projection');
 await lab.getByRole('radio',{name:'Payment capture is not verified'}).check();
 await lab.getByRole('button',{name:'Run model and inspect evidence'}).click();
 const result=lab.getByTestId('identity-model-result');
 await expect(result).toContainText('CONCEPTUAL FUTURE DOMAIN');
 await expect(result).toContainText('Payment status being confirmed');
 await expect(result).toContainText('NOT_STARTED');
});

test('existing left navigation exposes meaningful 1.1.4 topics and deep links',async({page})=>{
 await page.goto('/#/lesson/1.1.4?section=12');
 const outline=page.getByTestId('course-outline');
 await expect(outline.getByTestId('outline-section-1.1.4-12')).toHaveAttribute('aria-current','location');
 await expect(outline).toContainText('Trace the typed Java IDs');
 await expect.poll(()=>page.evaluate(()=>Math.abs(document.querySelector('#topic-12')!.getBoundingClientRect().top))).toBeLessThan(190);
 await outline.getByTestId('outline-section-1.1.4-7').click();
 await expect(page).toHaveURL(/lesson\/1\.1\.4\?section=7/);
 await expect.poll(()=>page.evaluate(()=>Math.abs(document.querySelector('#topic-7')!.getBoundingClientRect().top))).toBeLessThan(190);
});

test('exact Java source evidence is immutable and old lesson routes remain available',async({page})=>{
 await page.goto('/#/lesson/1.1.4');
 const lesson=page.getByTestId('lesson-1.1.4');
 await expect(lesson.getByRole('link',{name:/Verified Java CI/})).toHaveAttribute('href',/42782082917/);
 await expect(lesson.getByRole('link',{name:/Strongly typed Order model/})).toHaveAttribute('href',/ea17135cdc1974d89d78ce78931bb63cc5e9544e/);
 for(const id of ['1.1.1','1.1.2','1.1.3']){
  await page.goto('/#/lesson/'+id);
  await expect(page.getByTestId('lesson-'+id)).toBeVisible();
 }
});

for(const theme of ['dark','light']){
 test('1.1.4 remains readable without horizontal overflow in mobile '+theme,async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/#/lesson/1.1.4?section=9');
  if(theme==='light'){
   const toggle=page.getByRole('button',{name:/Switch to (light|dark) theme/});
   if(await toggle.getAttribute('aria-label')==='Switch to light theme')await toggle.click();
  }
  await expect(page.getByTestId('identity-authority-lab')).toBeAttached();
  await page.getByRole('button',{name:'Open navigation'}).click();
  await expect(page.getByTestId('course-outline')).toBeVisible();
  await page.getByTestId('outline-section-1.1.4-3').click();
  await expect(page).toHaveURL(/lesson\/1\.1\.4\?section=3/);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(16);
 });
}
