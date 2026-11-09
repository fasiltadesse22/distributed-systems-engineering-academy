import {test,expect} from '@playwright/test';
const route='/#/lesson/1.1.2';
const section=(page:import('@playwright/test').Page,index:number)=>page.getByTestId('outline-section-1.1.2-'+(index+1));

test('Lesson 1.1.2 mounts without blank screen or JS exception and progresses between sections',async({page})=>{
 const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/blueprint');
 await page.locator('a[href="#/lesson/1.1.2"]').first().click();
 await expect(page.getByTestId('lesson-1.1.2')).toBeVisible();
 await expect(page.getByRole('heading',{name:/Business scenarios/i})).toBeVisible();
 await expect(page.getByRole('heading',{name:/business question behind POST/i})).toBeVisible();
 await page.getByRole('button',{name:/continue: Understand/i}).click();
 await expect(page.getByRole('heading',{name:/capabilities, use cases/i})).toBeVisible();
 expect(errors).toEqual([]);
});

test('Use-Case Explorer distinguishes implemented intake from future merchant authority',async({page})=>{
 await page.goto(route);
 await section(page,6).click();
 const explorer=page.getByTestId('use-case-explorer');
 await expect(explorer).toContainText('Only UC-001 is implemented');
 await explorer.getByRole('button',{name:/UC-002/}).click();
 await expect(explorer).toContainText('Future conceptual');
 await expect(explorer).toContainText('NO Java endpoint');
 await explorer.getByRole('checkbox',{name:/change customer promise/i}).check();
 await expect(page.getByTestId('confirmation-warning')).toContainText('no longer fulfills');
});

test('Scenario Studio changes outcome and keeps non-implemented downstream decisions separate',async({page})=>{
 await page.goto(route);
 await section(page,7).click();
 await page.getByTestId('scenario-studio').getByRole('button',{name:'201',exact:true}).click();
 await page.getByRole('button',{name:/Run modeled scenario/i}).click();
 await expect(page.getByTestId('scenario-result')).toContainText('2500 USD minor units');
 await expect(page.getByTestId('scenario-result')).toContainText('PENDING');
 await expect(page.getByTestId('scenario-result')).toContainText('NOT_STARTED');
 await page.getByTestId('scenario-item').selectOption('seasonal-special');
 await page.getByTestId('scenario-studio').getByRole('button',{name:'422',exact:true}).click();
 await page.getByRole('button',{name:/Run modeled scenario/i}).click();
 await expect(page.getByTestId('scenario-result')).toContainText('ITEM_UNAVAILABLE');
 await page.getByTestId('scenario-future').selectOption('payment-decline');
 await page.getByTestId('scenario-studio').getByRole('button',{name:'422',exact:true}).click();
 await page.getByRole('button',{name:/Run modeled scenario/i}).click();
 await expect(page.getByTestId('scenario-result')).toContainText('FUTURE ONLY');
});

test('Acceptance Explorer shows a real test link and the scoped expected result',async({page})=>{
 await page.goto(route);
 await section(page,8).click();
 await page.getByTestId('acceptance-case').selectOption('AC-04');
 await page.getByTestId('acceptance-explorer').getByRole('button',{name:'422',exact:true}).click();
 await page.getByRole('button',{name:/Reveal acceptance contract/i}).click();
 const result=page.getByTestId('acceptance-result');
 await expect(result).toContainText('ITEM_UNAVAILABLE');
 await expect(result).toContainText('unavailableMenuItemIs422');
 await expect(result.getByRole('link',{name:/immutable source/i})).toHaveAttribute('href',/08b33714431a53f6b1cb1e1e09718b0281da1ce8/);
});

test('Execution Trace links to immutable Java sources and diagnoses semantics',async({page})=>{
 await page.goto(route);
 await section(page,9).click();
 const trace=page.getByTestId('execution-trace');
 await expect(trace).toContainText('reconstructed from source and tests');
 await trace.getByRole('button',{name:/Store the record/i}).click();
 await expect(trace).toContainText('ConcurrentHashMap');
 await expect(trace.getByRole('link',{name:/InMemoryOrderRepository.java/i})).toHaveAttribute('href',/08b33714431a53f6b1cb1e1e09718b0281da1ce8/);
 await section(page,11).click();
 const diag=page.getByTestId('diagnosis-room');
 await diag.getByRole('checkbox',{name:/Read the exact 201 response/i}).check();
 await diag.getByRole('checkbox',{name:/Inspect available Java endpoints/i}).check();
 await diag.getByRole('button',{name:/Form provisional diagnosis/i}).click();
 await expect(page.getByTestId('diagnosis-result')).toContainText('Provisional hypothesis');
});

test('Previous complete Lesson 1.1.1 and Phase 0 race lab still render',async({page})=>{
 await page.goto('/#/lesson/1.1.1');
 await expect(page.getByTestId('lesson-1.1.1')).toBeVisible();
 await page.goto('/#/lab');
 await page.getByRole('button',{name:/Yes, both succeed/i}).click();
 await page.getByRole('button',{name:/Run modeled execution/i}).click();
 await expect(page.getByRole('heading',{name:/Invariant violated/i})).toBeVisible();
});
