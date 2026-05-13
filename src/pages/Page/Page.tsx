import * as React from "react";

import { Badge } from "@/components/ui/Badge";
import { Banner } from "@/components/ui/Banner";
import { Button } from "@/components/ui/Button";
import { CardItem } from "@/components/ui/CardItem";
import { FilterChip } from "@/components/ui/FilterChip";
import { Footer } from "@/components/ui/Footer";
import { GnbBar } from "@/components/ui/GnbBar";
import { Icon } from "@/components/ui/Icon";
import { SearchBar } from "@/components/ui/SearchBar";

const BANNER_SRC = "/images/showcase/banner.png";
const RECOMMEND_THUMB_SRC = "/images/showcase/recommend-thumb.png";
const CARD_THUMB_SRC = "/images/showcase/card-thumb.png";

const RECOMMEND_COUNT = 5;
const CARD_COUNT = 8;

const FILTER_LABELS = [
  "#전체",
  "#얼리스테이지",
  "#Windows",
  "#macOS",
  "#Steam",
  "#EPIC",
  "#Android",
  "#iOS",
  "#PlayStation",
  "#XBOX",
  "#SWITCH",
  "#SWITCH2",
  "#SWITCH2",
  "#RPG",
  "#액션 RPG",
  "#캐주얼",
  "#FPS",
  "#AOS/MOBA",
  "#이벤트",
];

function RecommendItem() {
  const titleStyle: React.CSSProperties = {
    fontSize: "var(--type-b2-body-size)",
    lineHeight: "var(--type-b2-body-line-height)",
    fontWeight:
      "var(--type-b3-body-weight)" as React.CSSProperties["fontWeight"],
    color: "var(--text-primary)",
    margin: 0,
  };

  return (
    <article
      className="flex flex-col bg-[var(--background-white)] w-[153px] h-[324px] overflow-hidden"
      data-name="recommend item"
    >
      <div className="relative w-[153px] h-[192px] overflow-hidden shrink-0">
        <img
          src={RECOMMEND_THUMB_SRC}
          alt="추천 게임 썸네일"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div
        className="flex flex-col items-start w-full"
        style={{
          gap: "var(--spacing-xs)",
          padding: "var(--spacing-md) var(--spacing-sm)",
          flex: "1 0 0",
        }}
      >
        <Badge variant="pick" />
        <p style={titleStyle}>Game name</p>
      </div>
    </article>
  );
}

function Section1Recommend() {
  const headlineStyle: React.CSSProperties = {
    fontSize: "var(--type-h1-headline-size)",
    lineHeight: "var(--type-h1-headline-line-height)",
    fontWeight:
      "var(--type-h1-headline-weight)" as React.CSSProperties["fontWeight"],
    color: "var(--text-primary)",
    margin: 0,
  };

  const tagStyle: React.CSSProperties = {
    fontSize: "var(--type-s2-subtitle-size)",
    lineHeight: "var(--type-s2-subtitle-line-height)",
    fontWeight:
      "var(--type-s2-subtitle-weight)" as React.CSSProperties["fontWeight"],
    color: "var(--text-recommend)",
    margin: 0,
  };

  return (
    <div
      className="flex flex-col items-start shrink-0"
      style={{ gap: "var(--spacing-xl)", width: "797px" }}
      data-name="recommend game"
    >
      <h2 style={headlineStyle}>추천게임</h2>
      <p style={tagStyle}>#최근에 많이 검색된</p>
      <div
        className="flex items-center shrink-0"
        style={{ gap: "var(--spacing-xs)" }}
        data-name="recommend list"
      >
        {Array.from({ length: RECOMMEND_COUNT }).map((_, i) => (
          <RecommendItem key={i} />
        ))}
      </div>
    </div>
  );
}

function Section1Login() {
  const linkStyle: React.CSSProperties = {
    fontSize: "var(--type-b5-body-size)",
    lineHeight: "var(--type-b5-body-line-height)",
    fontWeight:
      "var(--type-b5-body-weight)" as React.CSSProperties["fontWeight"],
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-[var(--background-white)]"
      style={{
        flex: "1 0 0",
        height: "324px",
        minWidth: 0,
        padding: "60px 30px",
        gap: "14px",
      }}
      data-name="LogIn"
    >
      <div
        className="flex flex-col items-start w-full shrink-0"
        style={{ gap: "var(--spacing-xxs)" }}
        data-name="button group"
      >
        <Button variant="primary" size="lg" className="w-full">
          NEXON ID 로그인
        </Button>
        <div className="flex items-center w-full shrink-0">
          <Button
            variant="secondary"
            size="md"
            className="flex-1 min-w-0"
            style={{ flex: "1 0 0" }}
          >
            일회용 로그인
          </Button>
          <Button
            variant="secondary"
            size="md"
            className="flex-1 min-w-0"
            style={{ flex: "1 0 0" }}
          >
            QR 로그인
          </Button>
        </div>
      </div>
      <div
        className="flex items-center justify-between w-full shrink-0"
        data-name="link group"
      >
        <div
          className="flex items-center shrink-0"
          style={{ gap: "var(--spacing-lg)" }}
        >
          <a href="#" style={linkStyle}>
            넥슨 ID 찾기
          </a>
          <a href="#" style={linkStyle}>
            비밀번호 찾기
          </a>
        </div>
        <a href="#" style={linkStyle}>
          회원가입
        </a>
      </div>
    </div>
  );
}

function Section1() {
  return (
    <section
      className="flex items-end justify-end w-full"
      style={{ gap: "var(--spacing-lg)" }}
      data-name="section 1"
    >
      <Section1Recommend />
      <Section1Login />
    </section>
  );
}

function GamesHeader() {
  const headlineStyle: React.CSSProperties = {
    fontSize: "var(--type-h1-headline-size)",
    lineHeight: "var(--type-h1-headline-line-height)",
    fontWeight:
      "var(--type-h1-headline-weight)" as React.CSSProperties["fontWeight"],
    color: "var(--text-primary)",
    margin: 0,
    whiteSpace: "nowrap",
  };

  const communityStyle: React.CSSProperties = {
    fontSize: "var(--type-b2-body-size)",
    lineHeight: "var(--type-b2-body-line-height)",
    fontWeight:
      "var(--type-b2-body-weight)" as React.CSSProperties["fontWeight"],
    color: "var(--text-primary)",
    margin: 0,
    whiteSpace: "nowrap",
  };

  return (
    <div className="flex items-center justify-between w-full shrink-0">
      <div
        className="flex items-end shrink-0"
        style={{ gap: "var(--spacing-xs)" }}
      >
        <h2 style={headlineStyle}>전체 게임</h2>
        <a
          href="#"
          className="flex items-center shrink-0 pb-1"
          style={{ gap: "var(--spacing-xs)" }}
        >
          <span style={communityStyle}>모바일게임 커뮤니티 모아보기</span>
          <Icon
            name="newpage"
            size={24}
            color="var(--icon-grey)"
            aria-label="새창으로 이동"
          />
        </a>
      </div>
      <div className="shrink-0" style={{ width: "300px" }}>
        <SearchBar placeholder="게임명 검색" />
      </div>
    </div>
  );
}

function GameFilter() {
  return (
    <div
      className="flex flex-wrap items-end content-end w-full shrink-0 bg-[var(--background-white)]"
      style={{
        gap: "var(--spacing-md)",
        padding: "var(--spacing-2xl)",
      }}
      data-name="game filter"
    >
      {FILTER_LABELS.map((label, idx) => (
        <FilterChip key={`${label}-${idx}`} active={idx === 0}>
          {label}
        </FilterChip>
      ))}
    </div>
  );
}

function GameCardList() {
  return (
    <div
      className="flex flex-wrap items-center w-full shrink-0"
      style={{ gap: "50px var(--spacing-xl)" }}
      data-name="card list"
    >
      {Array.from({ length: CARD_COUNT }).map((_, i) => (
        <CardItem
          key={i}
          imageSrc={CARD_THUMB_SRC}
          imageAlt="게임 썸네일"
          title="game name"
          category="game category"
          showUpdateBadge
          supportedDevices={["desktop", "mobile"]}
        />
      ))}
    </div>
  );
}

function Section2Games() {
  return (
    <section
      className="flex flex-col items-start justify-center w-full"
      style={{ gap: "var(--spacing-lg)" }}
      data-name="games"
    >
      <GamesHeader />
      <GameFilter />
      <GameCardList />
    </section>
  );
}

export function Page() {
  return (
    <div
      className="flex flex-col w-full min-h-screen"
      style={{ background: "var(--background-grey)" }}
    >
      <GnbBar />
      <Banner
        imageSrc={BANNER_SRC}
        alt="마비노기 모바일 - 달밤의 늑대인간"
        aspectRatio="1920/560"
      />
      <main
        className="mx-auto w-full"
        style={{
          maxWidth: "1280px",
          paddingTop: "80px",
          paddingBottom: "80px",
          display: "flex",
          flexDirection: "column",
          gap: "59px",
        }}
      >
        <Section1 />
        <Section2Games />
      </main>
      <Footer />
    </div>
  );
}
