import {test,expect} from '@playwright/test';

test('Lesson 1.1.7 presents 26 readable topics, four embedded mechanisms and chapter 2',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/lesson/1.1.7');
 const lesson=page.getByTestId('lesson-1.1.7');
 await expect(lesson).toBeVisible();
 await expect(lesson).toContainText('CHAPTER 02');
 await expect(lesson.locator('.textbook-topic')).toHaveCount(26);
 for(const id of ['guarded-transition-studio','guard-decision-table','guard-commit-boundary','guard-prediction-lab'])
   await expect(lesson.getByTestId(id)).toBeAttached();
 await expect(lesson.locator('.story-map,.story-step-rail,.story-prose-card')).toHaveCount(0);
 expect(errors).toEqual([]);
});

test('select actor role and policy to demonstrate rejection preserves state and has no fact',async({page})=>{
 await page.goto('/#/lesson/1.1.7?section=10');
 const lab=page.getByTestId('guarded-transition-studio');
 await expect(lab).toBeAttached();
 await expect(lab.getByTestId('guard-evaluation-result')).toContainText('Eligible illustrative candidate');
 await expect(lab.locator('.l117-guard-list li')).toHaveCount(11);
 await lab.getByRole('combobox',{name:'Actor role'}).selectOption('CUSTOMER');
 await expect(lab.getByTestId('guard-evaluation-result')).toContainText('ACTOR ROLE');
 await expect(lab.getByTestId('guard-evaluation-result')).toContainText('Rejected — no transition');
 await expect(lab.getByTestId('guard-before-after')).toContainText('same original; unchanged');
 await expect(lab.getByTestId('guard-success-fact')).toContainText('Success fact = None');
 await lab.getByRole('combobox',{name:'Actor role'}).selectOption('MERCHANT_OPERATOR');
 await lab.getByRole('combobox',{name:'POL-02 teaching policy'}).selectOption('UNRESOLVED');
 await expect(lab.getByTestId('guard-evaluation-result')).toContainText('POL 02 EDUCATIONAL ONLY');
 await expect(lab.getByTestId('guard-success-fact')).toContainText('No fact');
});

test('preparation probe refuses start-before-accept and complete-before-preparation',async({page})=>{
 await page.goto('/#/lesson/1.1.7?section=10');
 const lab=page.getByTestId('guarded-transition-studio');
 await lab.getByRole('button',{name:'Preparation guard probe'}).click();
 await expect(lab.getByTestId('preparation-guard-controls')).toBeVisible();
 await expect(lab.locator('.l117-guard-list li')).toHaveCount(6);
 await lab.getByRole('combobox',{name:'Merchant decision state'}).selectOption('PENDING');
 await expect(lab.getByTestId('guard-evaluation-result')).toContainText('MERCHANT ACCEPTED');
 await expect(lab.getByTestId('guard-success-fact')).toContainText('Success fact = None');
 await lab.getByRole('combobox',{name:'Merchant decision state'}).selectOption('ACCEPTED');
 await lab.getByRole('combobox',{name:'Preparation command'}).selectOption('COMPLETE_PREPARATION');
 await expect(lab.getByTestId('guard-evaluation-result')).toContainText('CURRENT STAGE');
 await expect(lab.getByTestId('guard-before-after')).toContainText('NOT_STARTED');
 await expect(lab.getByTestId('guard-success-fact')).toContainText('No fact');
});

test('interactive six-row tables preserve illegal transitions, and boundary timeline is explicit',async({page})=>{
 await page.goto('/#/lesson/1.1.7?section=14');
 const table=page.getByTestId('guard-decision-table');
 await expect(table.locator('tbody tr')).toHaveCount(6);
 await table.getByRole('button',{name:'Inspect row 5'}).click();
 await expect(table.getByTestId('decision-table-result')).toContainText('Rejected; unchanged prior state');
 await table.getByRole('button',{name:'Preparation: 3 × 2'}).click();
 await expect(table.locator('tbody tr')).toHaveCount(6);
 await table.getByRole('button',{name:'Inspect row 2'}).click();
 await expect(table.getByTestId('decision-table-result')).toContainText('No');
 const timeline=page.getByTestId('guard-commit-boundary');
 await expect(timeline.locator('ol li')).toHaveCount(6);
 await expect(timeline).toContainText('NOT IMPLEMENTED');
});

test('prediction resets, section deep links, browser history and previous lesson regressions',async({page})=>{
 await page.goto('/#/lesson/1.1.7?section=21');
 const lab=page.getByTestId('guard-prediction-lab');
 await lab.getByTestId('guard-scenario').selectOption('already-rejected');
 await lab.getByRole('radio',{name:/Rejected — state unchanged/}).check();
 await lab.getByRole('button',{name:'Reveal guard reasoning'}).click();
 await expect(lab.getByTestId('guard-prediction-result')).toContainText('Prediction matches the model');
 await expect(lab.getByTestId('guard-prediction-result')).toContainText('STATE_PENDING');
 await lab.getByTestId('guard-scenario').selectOption('prep-before-accept');
 await expect(lab.getByTestId('guard-prediction-result')).toHaveCount(0);
 const outline=page.getByTestId('course-outline');
 await expect(outline.getByTestId('outline-section-1.1.7-21')).toHaveAttribute('aria-current','location');
 await outline.getByTestId('outline-section-1.1.7-10').click();
 await expect(page).toHaveURL(/lesson\/1\.1\.7\?section=10/);
 await page.goBack();
 await expect(page).toHaveURL(/lesson\/1\.1\.7\?section=21/);
 await page.getByRole('button',{name:/Switch to light theme|Switch to dark theme/}).click();
 await expect(page.getByTestId('lesson-1.1.7')).toBeVisible();
 for(const id of ['1.1.1','1.1.2','1.1.3','1.1.4','1.1.5','1.1.6']){
  await page.goto('/#/lesson/'+id);
  await expect(page.getByTestId('lesson-'+id)).toBeVisible();
 }
});
