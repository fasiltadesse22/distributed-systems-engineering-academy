import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';
import Lesson114,{javaCommit,javaVerify,lessonSections,parseIdentitySections} from './Lesson114';
import source from '../../../content/lessons/1.1.4.md?raw';
import {sourceBlocks} from '../shared/TextbookReader';
import {lessonNavigationTitles} from '../../components/sectionNavigation';

describe('Lesson 1.1.4 complete deep Visual Textbook V2',()=>{
 it('contains 16 substantial topics and all nine pedagogical stages',()=>{
  expect(lessonSections).toHaveLength(16);
  expect(lessonNavigationTitles['1.1.4']).toHaveLength(16);
  expect(new Set(lessonSections.map(x=>x.stage))).toEqual(new Set([
   'Orient','Understand','Explore','Predict','Engineer','Verify','Diagnose','Defend','Retain'
  ]));
  expect(lessonSections.every(s=>s.body.length>750)).toBe(true);
  expect(source.trim().split(/\s+/).length).toBeGreaterThan(9500);
  expect(parseIdentitySections(source)).toEqual(lessonSections);
 });
 it('retains source paragraphs in order for each topic without summary substitution',()=>{
  const rawSections=source.split(/(?=^## )/m).filter(x=>x.startsWith('## '));
  expect(rawSections).toHaveLength(16);
  rawSections.forEach((part,i)=>{
   const body=part.slice(part.indexOf('\n')+1).trim();
   expect(lessonSections[i].body).toBe(body);
   expect(sourceBlocks(lessonSections[i].body).join('\n\n')).toBe(body);
  });
  for(const required of ['OrderId','CustomerId','RestaurantId','PaymentAttemptId',
   'correlation','alias','version','putIfAbsent','idempotency','projection',
   'provider','authority','merchant','snapshot','PENDING','NOT_STARTED',
   '30 JUnit tests',javaCommit,'customer-facing']){
   expect(source.toLowerCase()).toContain(required.toLowerCase());
  }
 });
 it('renders all topics with two static visual mechanisms and only one purpose-built lab',()=>{
  const html=renderToStaticMarkup(<MemoryRouter><Lesson114/></MemoryRouter>);
  expect((html.match(/data-testid="textbook-topic-\d+"/g)||[])).toHaveLength(16);
  expect(html).toContain('data-testid="identity-authority-map"');
  expect(html).toContain('data-testid="authority-projection-flow"');
  expect(html).toContain('data-testid="identity-authority-lab"');
  expect(html).toContain('data-testid="embedded-lab-1"');
  expect(html).toContain('data-testid="embedded-lab-6"');
  expect(html).toContain('data-testid="embedded-lab-9"');
  expect(html).toContain('PaymentAttemptId');
  expect(html).toContain(javaCommit);
  expect(html).toContain(javaVerify);
  expect(html).not.toContain('Guided steps');
  expect(html).not.toContain('Three moments worth understanding');
 });
 it('keeps planned payment identities clearly labeled as not implemented',()=>{
  const html=renderToStaticMarkup(<MemoryRouter><Lesson114/></MemoryRouter>);
  expect(html).toContain('NOT IMPLEMENTED');
  expect(html).toContain('NOT AUTHORITATIVE');
  expect(html).toContain('PaymentAttemptId');
  expect(html).toContain('30 verified tests');
  expect(html).toContain('paymentStatus');
 });
});
