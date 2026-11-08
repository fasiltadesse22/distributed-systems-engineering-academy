import { test,expect } from '@playwright/test';

test('authored Lesson 1.1.1 loads from blueprint without a blank screen',async({page})=>{
  const errors:string[]=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text())});
  await page.goto('/#/blueprint');
  await expect(page.locator('#root')).not.toBeEmpty();
  await page.locator('a[href="#/lesson/1.1.1"]').first().click();
  await expect(page.getByTestId('lesson-1.1.1')).toBeVisible();
  await expect(page.getByRole('heading',{name:/actors, goals/i})).toBeVisible();
  await expect(page.getByRole('heading',{name:/start with the business/i})).toBeVisible();
  await page.getByRole('button',{name:/continue: Understand/i}).click();
  await expect(page.getByRole('heading',{name:/actor, stakeholder, role/i})).toBeVisible();
  expect(errors,'Browser runtime errors').toEqual([]);
});

test('authority map changes decision ownership and flags conflicts',async({page})=>{
  await page.goto('/#/lesson/1.1.1');
  await page.locator('nav[aria-label="Lesson study sections"] button').nth(5).click();
  await expect(page.getByTestId('authority-atlas')).toBeVisible();
  await expect(page.getByTestId('authority-feedback')).toContainText('Consistent with the example policy');
  await page.getByTestId('authority-owner').selectOption('operations');
  await expect(page.getByTestId('authority-feedback')).toContainText('Ownership conflict flagged');
  await expect(page.getByTestId('authority-feedback')).toContainText('merchant');
  await page.getByRole('button',{name:/reset ownership model/i}).click();
  await expect(page.getByTestId('authority-feedback')).toContainText('Consistent');
});

test('branching workflow changes customer-facing financial truth',async({page})=>{
  await page.goto('/#/lesson/1.1.1');
  await page.locator('nav[aria-label="Lesson study sections"] button').nth(6).click();
  await page.getByTestId('journey-provider').selectOption('unknown');
  await page.getByRole('button',{name:'No, preparation does not begin'}).click();
  await page.getByRole('button',{name:/run illustrated business journey/i}).click();
  await expect(page.getByTestId('journey-outcome')).toContainText('Unknown / requires evidence');
  await expect(page.getByTestId('journey-outcome')).toContainText('cannot yet say paid or declined');
  await page.getByTestId('journey-restaurant').selectOption('reject');
  await page.getByRole('button',{name:'No, preparation does not begin'}).click();
  await page.getByRole('button',{name:/run illustrated business journey/i}).click();
  await expect(page.getByTestId('journey-outcome')).toContainText('No payment attempt');
});

test('learner can answer authority challenges and investigate competing hypotheses',async({page})=>{
  await page.goto('/#/lesson/1.1.1');
  await page.locator('nav[aria-label="Lesson study sections"] button').nth(7).click();
  await page.getByTestId('challenge-answer').selectOption('restaurant');
  await page.getByRole('button',{name:'Reveal reasoning'}).click();
  await expect(page.getByTestId('challenge-feedback')).toContainText('Correct under the stated policy');
  await page.locator('nav[aria-label="Lesson study sections"] button').nth(8).click();
  await page.getByRole('checkbox',{name:/Read the effective cancellation policy/i}).check();
  await page.getByRole('checkbox',{name:/Compare decision acknowledgements/i}).check();
  await expect(page.getByTestId('incident-caseboard')).toContainText('Merchant contract says');
  await page.getByRole('button',{name:/form a provisional diagnosis/i}).click();
  await expect(page.getByTestId('incident-caseboard')).toContainText('Provisional:');
});

test('existing race laboratory remains functional after lesson integration',async({page})=>{
  await page.goto('/#/lab');
  await page.getByRole('button',{name:/yes, both succeed/i}).click();
  await page.getByRole('button',{name:/run modeled execution/i}).click();
  await expect(page.getByRole('heading',{name:/invariant violated/i})).toBeVisible();
});
