import {test,expect} from '@playwright/test';
test('Lesson 1.1.8 presents complete source and three contextual mechanisms',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/lesson/1.1.8');
 const lesson=page.getByTestId('lesson-1.1.8');await expect(lesson).toBeVisible();
 await expect(lesson).toContainText('CHAPTER 02');await expect(lesson.locator('.textbook-topic')).toHaveCount(26);
 for(const id of ['undo-decision-inspector','effects-fact-timeline','undo-prediction-exercise'])await expect(lesson.getByTestId(id)).toBeAttached();
 expect(errors).toEqual([]);
});
test('classifier preserves captured original, no automatic remedy, and unknown source reconciliation',async({page})=>{
 await page.goto('/#/lesson/1.1.8?topic=a-decision-tree-for-reversal-compensation-and-escalation');
 const lab=page.getByTestId('undo-decision-inspector');
 await expect(lab).toBeVisible();
 await expect(lab.getByTestId('compensation-decision')).toContainText('Escalate for policy');
 await expect(lab.getByTestId('compensation-ledger')).toContainText('C-81');
 await lab.getByLabel('Remedy policy approved for classroom example').check();
 await expect(lab.getByTestId('compensation-decision')).toContainText('Propose separate compensation');
 await expect(lab.getByTestId('compensation-ledger')).toContainText('REMEDY-CANDIDATE');
 await lab.getByLabel('Source fact confirmed for classroom example').uncheck();
 await expect(lab.getByTestId('compensation-decision')).toContainText('Reconcile authoritative source');
});
test('switch history scenario and reset prediction before reveal',async({page})=>{
 await page.goto('/#/lesson/1.1.8?section=18');
 const timeline=page.getByTestId('effects-fact-timeline');
 await timeline.getByRole('button',{name:'Kitchen'}).click();
 await expect(timeline).toContainText('Ingredients consumed');
 const prediction=page.getByTestId('undo-prediction-exercise');
 await prediction.getByRole('radio',{name:'Local reversal / discard'}).check();
 await prediction.getByRole('button',{name:'Reveal causal reasoning'}).click();
 await expect(prediction.getByTestId('undo-prediction-result')).toContainText('Prediction matches');
 await prediction.getByLabel('Prediction scenario').selectOption('2');
 await expect(prediction.getByTestId('undo-prediction-result')).toHaveCount(0);
});
test('stable deep link, history, theme and previous lessons remain available',async({page})=>{
 await page.goto('/#/lesson/1.1.8?topic=a-decision-tree-for-reversal-compensation-and-escalation');
 await expect(page.getByTestId('outline-section-1.1.8-16')).toHaveAttribute('aria-current','location');
 await page.getByTestId('outline-section-1.1.8-18').click();
 await expect(page).toHaveURL(/lesson\/1\.1\.8\?section=18/);
 await page.goBack();
 await expect(page).toHaveURL(/topic=a-decision-tree-for-reversal-compensation-and-escalation/);
 await page.getByRole('button',{name:/Switch to light theme|Switch to dark theme/}).click();
 await expect(page.getByTestId('lesson-1.1.8')).toBeVisible();
 for(const id of ['1.1.1','1.1.2','1.1.3','1.1.4','1.1.5','1.1.6','1.1.7']){
  await page.goto('/#/lesson/'+id);await expect(page.getByTestId('lesson-'+id)).toBeVisible();
 }
});
