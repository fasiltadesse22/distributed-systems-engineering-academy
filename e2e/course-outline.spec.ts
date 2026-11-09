import {test,expect} from '@playwright/test';

test('primary sidebar supports chapters, lessons, section deep links and browser history',async({page})=>{
 const errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#/lesson/1.1.1');
 const nav=page.getByTestId('course-outline');
 await expect(nav.getByRole('button',{name:/Collapse chapter 1/})).toHaveAttribute('aria-expanded','true');
 await expect(nav.getByRole('button',{name:/Collapse sections for Lesson 1.1.1/})).toHaveAttribute('aria-expanded','true');
 await nav.getByTestId('outline-section-1.1.1-6').click();
 await expect(page).toHaveURL(/lesson\/1\.1\.1\?section=6/);
 await expect(page.getByTestId('authority-atlas')).toBeVisible();
 await expect(nav.getByTestId('outline-section-1.1.1-6')).toHaveAttribute('aria-current','location');
 await page.goBack();
 await expect(page.getByTestId('textbook-topic-1')).toContainText('Why the business comes first');
 await nav.getByRole('button',{name:/Expand chapter 2/}).click();
 await expect(nav.getByRole('link',{name:/1\.1\.6.*Workflows versus state machines/i})).toBeVisible();
 await nav.getByRole('button',{name:/Expand chapter 1/}).click();
 await nav.getByRole('link',{name:/1\.1\.2.*Business scenarios/i}).click();
 await expect(page.getByTestId('lesson-1.1.2')).toBeVisible();
 await expect(nav.getByRole('button',{name:/Collapse sections for Lesson 1.1.2/})).toHaveAttribute('aria-expanded','true');
 await nav.getByTestId('outline-section-1.1.2-10').click();
 await expect(page.getByTestId('execution-trace')).toBeVisible();
 expect(errors).toEqual([]);
});

test('direct section URL is navigable and the content area has no duplicate sidebar',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/#/lesson/1.1.2?section=8');
 await expect(page.getByTestId('scenario-studio')).toBeVisible();
 await expect(page.getByTestId('outline-section-1.1.2-8')).toHaveAttribute('aria-current','location');
 await expect(page.locator('.l112-nav')).toHaveCount(0);
 await expect(page.getByTestId('stage-journey')).toHaveCount(0);
 const geometry=await page.evaluate(()=>{
  const app=document.querySelector('.content-lesson')!.getBoundingClientRect();
  const reader=document.querySelector('.textbook-lesson')!.getBoundingClientRect();
  return {appWidth:app.width,readerWidth:reader.width};
 });
 expect(geometry.readerWidth/geometry.appWidth).toBeGreaterThan(.84);
});

test('chapter and lesson outline toggles are keyboard operable',async({page})=>{
 await page.goto('/#/lesson/1.1.1');
 const nav=page.getByTestId('course-outline');
 const lesson=nav.getByRole('button',{name:/Collapse sections for Lesson 1.1.1/});
 await lesson.focus();
 await page.keyboard.press('Enter');
 await expect(nav.getByRole('button',{name:/Expand sections for Lesson 1.1.1/})).toHaveAttribute('aria-expanded','false');
 await page.keyboard.press('Enter');
 await expect(nav.getByTestId('outline-section-1.1.1-13')).toBeVisible();
});
