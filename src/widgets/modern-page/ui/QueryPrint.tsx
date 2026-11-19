import { useState } from 'react';
import report from '@/pages/fieldwork/model/performance.json';

export function QueryPrint({ en }: { en: boolean }) {
  const [scenario, setScenario] = useState('list_100_first_page');
  const result = report.comparisons.find(row => row.name === scenario)!;
  return <figure className="query-print">
    <figcaption>
      <span>Field Work Manager</span>
      <span>{en ? '20k synthetic sites' : '가상 수용가 2만 건'}</span>
    </figcaption>
    <div className="query-numbers" aria-live="polite">
      <div><small>{en ? 'Before' : '개선 전'}</small><strong>{result.beforeSql}</strong></div>
      <span aria-hidden="true">→</span>
      <div><small>{en ? 'After' : '개선 후'}</small><strong>{result.afterSql}</strong></div>
    </div>
    <div className="query-marks" aria-hidden="true">
      {Array.from({ length: result.beforeSql }, (_, index) =>
        <i key={index} className={index < result.afterSql ? 'retained' : undefined} />)}
    </div>
    <p className="query-key"><i aria-hidden="true" />{en ? 'One mark per query · gold = after' : '눈금 하나당 SQL 1회 · 노란색은 개선 후 호출 수'}</p>
    <div className="query-bottom">
      <label>{en ? 'Query scenario' : '조회 조건'}
        <select value={scenario} onChange={event => setScenario(event.target.value)}>
          {report.comparisons.map(row => <option value={row.name} key={row.name}>{en ? row.labelEn : row.label}</option>)}
        </select>
      </label>
      <a href="#/projects/field-work/performance">{en ? 'Read benchmark' : '측정 기록'} ↗</a>
    </div>
  </figure>;
}
