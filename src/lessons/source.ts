/** Stable Markdown section identity. Canonical manuscript remains in content/lessons.
 * Display order and index are not a permanent identity. */
export interface AuthoredTopic {
  index:number;
  stage:string;
  title:string;
  body:string;
  slug:string;
}
export function topicSlug(title:string):string {
  return title.normalize('NFKD').toLowerCase()
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'');
}
export function parseAuthoredTopics(markdown:string):AuthoredTopic[] {
  const ids=new Set<string>();
  return markdown.split(/(?=^## )/m)
    .filter(part=>part.startsWith('## '))
    .map((part,index)=>{
      const newline=part.indexOf('\n');
      if(newline<0)throw new Error('Authored topic missing content or newline');
      const heading=part.slice(3,newline).trim();
      const dash=heading.indexOf(' — ');
      const title=dash<0?heading:heading.slice(dash+3);
      const slug=topicSlug(title);
      if(!slug||ids.has(slug))throw new Error('Duplicate/invalid stable topic slug: '+slug);
      ids.add(slug);
      return {index,stage:dash<0?'Study':heading.slice(0,dash),title,body:part.slice(newline+1).trim(),slug};
    });
}
