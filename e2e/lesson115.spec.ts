import {test,expect} from '@playwright/test';

test('Lesson 1.1.5 renders all 22 continuously readable topics with factual authority visuals',async({page})=>{
 const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/lesson/1.1.5');
 const lesson=page.getByTestId('lesson-1.1.5');
 await expect(lesson).toBeVisible();
 await expect(lesson.locator('.textbook-topic')).toHaveCount(22);
 await expect(lesson.getByTestId('workflow-swimlane')).toBeAttached();
 await expect(lesson.getByTestId('workflow-swimlane').locator('.l115-lanes li')).toHaveCount(7);
 await expect(lesson.getByTestId('workflow-authority-ledger')).toBeAttached();
 await expect(lesson.getByTestId('workflow-authority-ledger').locator('tbody tr')).toHaveCount(13);
 await expect(lesson).toContainText('OrderRequestRecorded');
 await expect(lesson).toContainText('POL-09');
 expect(errors).toEqual([]);
});
test('branching workshop preserves unknown refund and explicitly unresolved merchant policy',async({page})=>{
 await page.goto('/#/lesson/1.1.5?section=17');
 const lab=page.getByTestId('workflow-scenario-explorer');
 await expect(lab).toBeAttached();
 await lab.getByTestId('workflow-scenario').selectOption('refund-unknown');
 await lab.getByRole('radio',{name:/Some facts are known/}).check();
 await lab.getByRole('button',{name:'Reveal authority and obligations'}).click();
 await expect(lab.getByTestId('workflow-scenario-result')).toContainText('completion is not yet confirmed');
 await expect(lab.getByTestId('workflow-scenario-result')).toContainText('POL-06');
 await lab.getByTestId('workflow-scenario').selectOption('cancel-after-prep');
 await expect(lab.getByTestId('workflow-scenario-result')).toHaveCount(0);
 await lab.getByRole('radio',{name:/Some facts are known/}).check();
 await lab.getByRole('button',{name:'Reveal authority and obligations'}).click();
 await expect(lab.getByTestId('workflow-scenario-result')).toContainText('POL-03');
});
test('desktop sidebar deep links, browser history, dark/light and prior lessons survive',async({page})=>{
 await page.goto('/#/lesson/1.1.5?section=16');
 const nav=page.getByTestId('course-outline');
 await expect(nav.getByTestId('outline-section-1.1.5-16')).toHaveAttribute('aria-current','location');
 await nav.getByTestId('outline-section-1.1.5-7').click();
 await expect(page).toHaveURL(/lesson\/1\.1\.5\?section=7/);
 await page.goBack();
 await expect(page).toHaveURL(/lesson\/1\.1\.5\?section=16/);
 await page.getByRole('button',{name:/Switch to light theme|Switch to dark theme/}).click();
 await expect(page.getByTestId('lesson-1.1.5')).toBeVisible();
 for(const id of ['1.1.1','1.1.2','1.1.3','1.1.4']){
  await page.goto('/#/lesson/'+id);
  await expect(page.getByTestId('lesson-'+id)).toBeVisible();
 }
});
