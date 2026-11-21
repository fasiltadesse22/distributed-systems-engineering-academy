import {test,expect} from '@playwright/test';
test('Lesson 1.1.9 retains 31 continuous authored topics with three anchored mechanisms',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/lesson/1.1.9');
 const lesson=page.getByTestId('lesson-1.1.9');
 await expect(lesson).toBeVisible();await expect(lesson.locator('.textbook-topic')).toHaveCount(31);
 for(const id of ['composition-state-inspector','composition-sequence-explorer','composition-prediction-lab'])
  await expect(lesson.getByTestId(id)).toBeAttached();
 expect(errors).toEqual([]);
});
test('classroom sequencing changes merchant acceptance without fake provider facts',async({page})=>{
 await page.goto('/#/lesson/1.1.9?topic=three-synchronized-states-and-their-guard-dependencies');
 const lab=page.getByTestId('composition-state-inspector');await expect(lab).toBeVisible();
 await expect(lab.getByTestId('composition-lanes').locator('[data-lane=merchant]')).toContainText('ACCEPTED');
 await expect(lab.getByTestId('composition-lanes').locator('[data-lane=payment]')).toContainText('NOT_STARTED');
 await lab.getByLabel('Payment sequence policy').selectOption('PAYMENT_FIRST');
 await expect(lab.getByTestId('composition-transition')).toContainText('REJECTED');
 await expect(lab.getByTestId('composition-transition')).toContainText('SEQUENCE');
 await expect(lab.getByTestId('composition-truth')).toContainText('unchanged real Java resource');
});
test('sequence explorer shows unknown refund, later confirmation and cancellation race',async({page})=>{
 await page.goto('/#/lesson/1.1.9?section=19');
 const lab=page.getByTestId('composition-sequence-explorer');await expect(lab).toBeAttached();
 await lab.getByRole('button',{name:/REFUND LOST/}).click();
 await expect(lab.getByTestId('composition-before-after')).toContainText('REFUND_PENDING');
 await expect(lab).toContainText('SimulatedRefundResponseLostUnknown');
 await lab.getByLabel('Sequence view').selectOption('kitchen-race');
 await lab.getByRole('button',{name:/APPROVE CANCELLATION/}).click();
 await expect(lab.getByTestId('sequence-outcome')).toContainText('POL_04_CUTOFF');
});
test('prediction resets and previous links, theme and history remain usable',async({page})=>{
 await page.goto('/#/lesson/1.1.9?section=22');
 const lab=page.getByTestId('composition-prediction-lab');
 await lab.getByRole('radio',{name:'Merchant accepted, payment NOT_STARTED'}).check();
 await lab.getByRole('button',{name:'Reveal causal reasoning'}).click();
 await expect(lab.getByTestId('composition-prediction-result')).toContainText('Prediction matches');
 await lab.getByLabel('Prediction problem').selectOption('2');
 await expect(lab.getByTestId('composition-prediction-result')).toHaveCount(0);
 const nav=page.getByTestId('course-outline');
 await nav.getByTestId('outline-section-1.1.9-17').click();
 await expect(page).toHaveURL(/lesson\/1\.1\.9\?section=17/);
 await page.goBack();
 await expect(page).toHaveURL(/lesson\/1\.1\.9\?section=22/);
 await page.getByRole('button',{name:/Switch to light theme|Switch to dark theme/}).click();
 for(const id of ['1.1.6','1.1.7','1.1.8']){await page.goto('/#/lesson/'+id);
  await expect(page.getByTestId('lesson-'+id)).toBeVisible();}
});
