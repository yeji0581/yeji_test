import * as React from "react";

export interface FooterLink {
  label: string;
  href?: string;
}

export interface FooterProps {
  primaryLinks?: FooterLink[];
  secondaryLinks?: FooterLink[];
  companyInfo?: React.ReactNode;
  copyright?: React.ReactNode;
  className?: string;
}

function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}

const DEFAULT_PRIMARY_LINKS: FooterLink[] = [
  { label: "이용약관" },
  { label: "개인정보처리방침" },
  { label: "청소년보호정책" },
  { label: "게임IP사용가이드" },
  { label: "게임시간선택제" },
  { label: "고객센터" },
  { label: "전체서비스" },
];

const DEFAULT_SECONDARY_LINKS: FooterLink[] = [
  { label: "회사소개" },
  { label: "채용안내" },
  { label: "윤리경영" },
  { label: "넥슨브랜드가이드" },
  { label: "광고문의" },
  { label: "넥슨PC방" },
  { label: "넥슨에센셜" },
];

const DEFAULT_COMPANY_INFO = (
  <>
    <p>
      ㈜넥슨코리아 대표이사 강대현·김정욱 경기도 성남시 분당구 판교로 256번길 7
      전화 : 1588-7701 팩스 : 0502-258-8322
    </p>
    <p>
      E-mail : contact-us@nexon.co.kr 사업자등록번호 : 220-87-17483호 통신판매업
      신고번호 : 제2013-경기성남-1659호 사업자정보확인
    </p>
  </>
);

const DEFAULT_COPYRIGHT = "© NEXON Korea Corporation All Rights Reserved.";

const rootClass =
  "flex flex-col items-start w-full bg-[var(--background-footer)] " +
  "p-[var(--spacing-2xl)] gap-[var(--spacing-md)]";

const listClass =
  "flex flex-wrap items-center gap-x-[var(--spacing-sm)] gap-y-[var(--spacing-sm)]";

const linkClass =
  "inline-flex items-center justify-center whitespace-nowrap " +
  "font-[family-name:var(--font-family)] font-[number:var(--font-weight-400)] " +
  "text-[length:var(--font-size-12)] leading-[var(--line-height-14)] " +
  "uppercase text-[color:var(--text-footer-link)]";

const dividerClass =
  "block h-[12px] w-px bg-[var(--background-divider)] shrink-0";

const captionLgClass =
  "font-[family-name:var(--font-family)] font-[number:var(--font-weight-400)] " +
  "text-[length:var(--font-size-11)] leading-[var(--line-height-16)] " +
  "tracking-[-0.3px] text-[color:var(--text-footer-caption)]";

const captionSmClass =
  "font-[family-name:var(--font-family)] font-[number:var(--font-weight-400)] " +
  "text-[length:var(--font-size-10)] leading-[var(--line-height-16)] " +
  "tracking-[-0.3px] text-[color:var(--text-footer-caption)]";

function LinkList({ links, label }: { links: FooterLink[]; label: string }) {
  return (
    <ul className={listClass} aria-label={label}>
      {links.map((link, index) => (
        <React.Fragment key={`${link.label}-${index}`}>
          <li>
            <a className={linkClass} href={link.href ?? "#"}>
              {link.label}
            </a>
          </li>
          {index < links.length - 1 && (
            <li aria-hidden="true" className={dividerClass} />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
}

export function Footer({
  primaryLinks = DEFAULT_PRIMARY_LINKS,
  secondaryLinks = DEFAULT_SECONDARY_LINKS,
  companyInfo = DEFAULT_COMPANY_INFO,
  copyright = DEFAULT_COPYRIGHT,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(rootClass, className)}
      data-node-id="17:289"
      data-name="footer"
    >
      <LinkList links={primaryLinks} label="primary footer links" />
      <LinkList links={secondaryLinks} label="secondary footer links" />
      <div className={captionLgClass}>{companyInfo}</div>
      <div className={captionSmClass}>{copyright}</div>
    </footer>
  );
}
