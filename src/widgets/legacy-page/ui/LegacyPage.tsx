import { experiences } from '@/entities/experience/model/data';
import { projects } from '@/entities/project/model/data';

function LegacyTable({ rows }: { rows: { name: string; tags: string[]; period: string; ongoing?: boolean }[] }) {
  return (
    <table className="w-full border-collapse text-xs">
      <thead>
        <tr>
          {['프로젝트명', '스택', '기간', '상태'].map((h) => (
            <th key={h} className="border border-[#ddd] bg-[#f9f9f9] text-[#555] px-2.5 py-1.5 text-left">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name} className="even:bg-[#fbfbfb]">
            <td className="border border-[#ddd] px-2.5 py-1.5">{r.name}</td>
            <td className="border border-[#ddd] px-2.5 py-1.5">{r.tags.slice(0, 2).join(', ')}</td>
            <td className="border border-[#ddd] px-2.5 py-1.5">{r.period}</td>
            <td className="border border-[#ddd] px-2.5 py-1.5">{r.ongoing ? '진행중' : '완료'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function LegacyPage() {
  return (
    <div className="relative z-[1] font-legacy bg-lgbg text-[#333] min-h-screen">
      <div className="bg-lgnav text-[#ccc] text-xs px-4 h-10 flex items-center justify-between">
        <div className="text-white font-bold">
          Issac 포트폴리오{' '}
          <span className="bg-[#5cb85c] text-white text-[10px] px-1.5 py-0.5 rounded ml-2">INTRANET</span>
        </div>
        <div className="[&>span]:ml-3.5 [&>span:hover]:text-white [&>span:hover]:underline">
          <span>자기소개</span><span>경력</span><span>프로젝트</span><span>기술스택</span><span>연락처</span>
        </div>
      </div>
      <div className="bg-[#fcf8e3] border-b border-[#faebcc] text-[#8a6d3b] text-[11px] px-4 py-1.5 flex justify-between">
        <span>🖥 권장 브라우저: Internet Explorer 9 이상 · 해상도 1024×768</span>
        <span>총 방문자수: 003,482</span>
      </div>

      <div className="m-4 p-5 rounded text-white bg-gradient-to-b from-lgblue-top to-lgblue-bot shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_1px_2px_rgba(0,0,0,.2)]">
        <h1 className="text-xl mb-1.5 [text-shadow:0_1px_1px_rgba(0,0,0,.3)]">환영합니다, 방문자님</h1>
        <p className="text-xs opacity-90 mb-3">본 페이지는 사내 인트라넷 스타일로 제작된 자기소개 화면입니다.</p>
        <table className="w-full border-collapse text-xs bg-white/10 rounded overflow-hidden">
          <tbody>
            {[
              ['이름', 'Issac'],
              ['경력', '프론트엔드 개발 4년차'],
              ['소속', 'MG신용정보 (PowerBuilder→Java/Vue3 마이그레이션 TF)'],
              ['관심분야', '레거시 마이그레이션, FSD 아키텍처, 상태관리'],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-white/10">
                <th className="w-[90px] text-left px-2.5 py-1.5 bg-black/10 font-normal">{k}</th>
                <td className="px-2.5 py-1.5">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="m-4 bg-white border border-[#ddd] rounded shadow-sm">
        <div className="bg-[#f5f5f5] border-b border-[#ddd] px-3 py-2 font-bold text-xs">경력 사항</div>
        <LegacyTable rows={experiences} />
      </div>
      <div className="m-4 bg-white border border-[#ddd] rounded shadow-sm">
        <div className="bg-[#f5f5f5] border-b border-[#ddd] px-3 py-2 font-bold text-xs">개인 프로젝트 목록</div>
        <LegacyTable rows={projects} />
        <div className="px-3 py-2 text-[11px] text-[#666]">
          «이전 <span className="inline-block border border-[#ddd] px-1.5 py-0.5 rounded mr-1 bg-white">1</span>
          <span className="inline-block border border-[#ddd] px-1.5 py-0.5 rounded mr-1 bg-white">2</span>
          <span className="inline-block border border-[#ddd] px-1.5 py-0.5 rounded mr-1 bg-white">3</span> 다음»
        </div>
      </div>

      <div className="px-4 py-3.5 text-center text-[11px] text-[#999] border-t border-[#ddd] mt-1">
        Copyright (c) 2016 Issac. All rights reserved. Best viewed at 1024x768 with IE9.
      </div>
    </div>
  );
}
