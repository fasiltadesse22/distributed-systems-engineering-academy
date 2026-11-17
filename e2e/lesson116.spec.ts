import {test,expect} from '@playwright/test';

test('Lesson 1.1.6 continuously renders all 19 topics, three graphs and authority inspector',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/lesson/1.1.6');
 const lesson=page.getByTestId('lesson-1.1.6');
 await expect(lesson).toBeVisible();
 await expect(lesson).toContainText('CHAPTER 02');
 await expect(lesson.locator('.textbook-topic')).toHaveCount(19);
 const graphs=lesson.getByTestId('lifecycle-graphs');
 await expect(graphs).toBeAttached();
 await expect(graphs.locator('.l116-machine')).toHaveCount(3);
 await graphs.getByRole('button',{name:/PENDING.*ACCEPTED/}).click();
 await expect(graphs.getByTestId('transition-inspector')).toContainText('IllustrativeRestaurantAccepted');
 await expect(graphs.getByTestId('transition-inspector')).toContainText('NO EXTERNAL FACT');
 await expect(lesson.getByTestId('cross-lifecycle-overlay')).toBeAttached();
 await expect(lesson.getByTestId('lifecycle-prediction-lab')).toBeAttached();
 expect(errors).toEqual([]);
});
test('cross lifecycle overlay retains payment refund pending independently of merchant rejection',async({page})=>{
 await page.goto('/#/lesson/1.1.6?section=9');
 const overlay=page.getByTestId('cross-lifecycle-overlay');
 await overlay.getByRole('combobox',{name:'Composite workflow state'}).selectOption('rejected-refund');
 await expect(overlay).toContainText('REJECTED');
 await expect(overlay).toContainText('REFUND_PENDING');
 await expect(overlay).toContainText('not confirmed');
 await overlay.getByRole('combobox',{name:'Composite workflow state'}).selectOption('authorized-pending');
 await expect(overlay).toContainText('AUTHORIZED');
 await expect(overlay).toContainText('PENDING');
});
test('prediction lab reveals uncertainty and resets when scenario changes',async({page})=>{
 await page.goto('/#/lesson/1.1.6?section=11');
 const lab=page.getByTestId('lifecycle-prediction-lab');
 await lab.getByTestId('lifecycle-scenario').selectOption('unknown-merchant');
 await lab.getByRole('radio',{name:/external outcome is unknown/}).check();
 await lab.getByRole('button',{name:'Reveal state and evidence'}).click();
 await expect(lab.getByTestId('lifecycle-prediction-result')).toContainText('Prediction matches the model');
 await expect(lab.getByTestId('lifecycle-prediction-result')).toContainText('SUBMITTED_UNKNOWN');
 await lab.getByTestId('lifecycle-scenario').selectOption('rejected-refund');
 await expect(lab.getByTestId('lifecycle-prediction-result')).toHaveCount(0);
 await lab.getByRole('radio',{name:/Independent states have progressed/}).check();
 await lab.getByRole('button',{name:'Reveal state and evidence'}).click();
 await expect(lab.getByTestId('lifecycle-prediction-result')).toContainText('POL-05–POL-07');
});
test('desktop sidebar deep links and earlier authored routes still work',async({page})=>{
 await page.goto('/#/lesson/1.1.6?section=15');
 const outline=page.getByTestId('course-outline');
 await expect(outline.getByTestId('outline-section-1.1.6-15')).toHaveAttribute('aria-current','location');
 await outline.getByTestId('outline-section-1.1.6-8').click();
 await expect(page).toHaveURL(/lesson\/1\.1\.6\?section=8/);
 await page.goBack();
 await expect(page).toHaveURL(/lesson\/1\.1\.6\?section=15/);
 await page.getByRole('button',{name:/Switch to light theme|Switch to dark theme/}).click();
 for(const id of ['1.1.1','1.1.2','1.1.3','1.1.4','1.1.5']){
   await page.goto('/#/lesson/'+id);
   await expect(page.getByTestId('lesson-'+id)).toBeVisible();
 }
});
