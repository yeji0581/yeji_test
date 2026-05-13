# 디자인 토큰 매핑 테이블

> Figma 변수명 ↔ CSS custom property 매핑.
> Claude Code가 Figma 디자인 구현 시 이 문서를 참조합니다.
> 토큰 추가/변경 시 이 문서도 업데이트하세요.
>
> 원본 Figma: `voAWXnzqW33gBNPFy3XQHp` (node `3:1036`)

## 네이밍 규칙

- Figma `/` → CSS `-`
- 공백, `%` 제거. 카테고리 prefix 중복(`Spacing/spacing-md`)은 한 번만 사용
- 예: `text/footer link` → `--text-footer-link`, `white/White 60%` → `--white-60`

## 구조

- **Primitive**: 색상 팔레트, 스페이싱, 라디우스, 타이포 원시값
- **Semantic**: Primitive를 `var()` 참조 → 용도 기반 별칭

---

## Primitive — 색상

### Primary (브랜드 블루)

| Figma       | CSS             | 값      |
| ----------- | --------------- | ------- |
| primary/50  | `--primary-50`  | #e6f1ff |
| primary/100 | `--primary-100` | #b1d5ff |
| primary/200 | `--primary-200` | #8bc0ff |
| primary/300 | `--primary-300` | #55a4ff |
| primary/400 | `--primary-400` | #3592ff |
| primary/500 | `--primary-500` | #0277ff |
| primary/600 | `--primary-600` | #026ce8 |
| primary/700 | `--primary-700` | #0154b5 |
| primary/800 | `--primary-800` | #01418c |
| primary/900 | `--primary-900` | #01326b |

### Yellow (실제 색은 오렌지)

| Figma      | CSS            | 값      |
| ---------- | -------------- | ------- |
| yellow/50  | `--yellow-50`  | #fdf2e9 |
| yellow/100 | `--yellow-100` | #f9d6bc |
| yellow/200 | `--yellow-200` | #f7c29c |
| yellow/300 | `--yellow-300` | #f3a66e |
| yellow/400 | `--yellow-400` | #f19552 |
| yellow/500 | `--yellow-500` | #ed7a27 |
| yellow/600 | `--yellow-600` | #d86f23 |
| yellow/700 | `--yellow-700` | #a8571c |
| yellow/800 | `--yellow-800` | #824315 |
| yellow/900 | `--yellow-900` | #643310 |

### Blue (실제 색은 청록/teal)

| Figma    | CSS          | 값      |
| -------- | ------------ | ------- |
| blue/50  | `--blue-50`  | #e6fbfb |
| blue/100 | `--blue-100` | #b0f4f1 |
| blue/200 | `--blue-200` | #8aeeeb |
| blue/300 | `--blue-300` | #54e7e2 |
| blue/400 | `--blue-400` | #33e2dc |
| blue/500 | `--blue-500` | #00dbd3 |
| blue/600 | `--blue-600` | #00c7c0 |
| blue/700 | `--blue-700` | #009b96 |
| blue/800 | `--blue-800` | #007874 |
| blue/900 | `--blue-900` | #005c59 |

### Green

| Figma     | CSS           | 값      |
| --------- | ------------- | ------- |
| green/50  | `--green-50`  | #eafbf2 |
| green/100 | `--green-100` | #bef3d6 |
| green/200 | `--green-200` | #9eedc3 |
| green/300 | `--green-300` | #72e4a7 |
| green/400 | `--green-400` | #56df96 |
| green/500 | `--green-500` | #2cd77c |
| green/600 | `--green-600` | #28c471 |
| green/700 | `--green-700` | #1f9958 |
| green/800 | `--green-800` | #187644 |
| green/900 | `--green-900` | #125a34 |

### Grey

| Figma    | CSS          | 값      |
| -------- | ------------ | ------- |
| grey/50  | `--grey-50`  | #f9f9f9 |
| grey/100 | `--grey-100` | #f2f2f2 |
| grey/200 | `--grey-200` | #dddddd |
| grey/300 | `--grey-300` | #bbbbbb |
| grey/400 | `--grey-400` | #999999 |
| grey/500 | `--grey-500` | #888888 |
| grey/600 | `--grey-600` | #666666 |
| grey/700 | `--grey-700` | #505050 |
| grey/800 | `--grey-800` | #333333 |
| grey/900 | `--grey-900` | #1a1a1a |

### White / Black opacity scale

| Figma            | CSS           | 값        |
| ---------------- | ------------- | --------- |
| white/White 100% | `--white-100` | #ffffff   |
| white/White 90%  | `--white-90`  | #ffffffe5 |
| white/White 80%  | `--white-80`  | #ffffffcc |
| white/White 70%  | `--white-70`  | #ffffffb2 |
| white/White 60%  | `--white-60`  | #ffffff99 |
| white/White 50%  | `--white-50`  | #ffffff80 |
| white/White 40%  | `--white-40`  | #ffffff66 |
| white/White 30%  | `--white-30`  | #ffffff4d |
| white/White 20%  | `--white-20`  | #ffffff33 |
| white/White 10%  | `--white-10`  | #ffffff1a |
| black/Black 100% | `--black-100` | #000000   |
| black/Black 90%  | `--black-90`  | #000000e5 |
| black/Black 80%  | `--black-80`  | #000000cc |
| black/Black 70%  | `--black-70`  | #000000b2 |
| black/Black 60%  | `--black-60`  | #00000099 |
| black/Black 50%  | `--black-50`  | #00000080 |
| black/Black 40%  | `--black-40`  | #00000066 |
| black/Black 30%  | `--black-30`  | #0000004d |
| black/Black 20%  | `--black-20`  | #00000033 |
| black/Black 10%  | `--black-10`  | #0000001a |

---

## Semantic — 색상 (Primitive 참조)

### Text

| Figma               | CSS                     | 참조 Primitive | 용도                   |
| ------------------- | ----------------------- | -------------- | ---------------------- |
| text/primary        | `--text-primary`        | `--grey-900`   | 본문 주요 텍스트       |
| text/secondary      | `--text-secondary`      | `--grey-600`   | 보조 텍스트            |
| text/grey           | `--text-grey`           | `--grey-400`   | 비활성/플레이스홀더    |
| text/inverse        | `--text-inverse`        | `--white-100`  | 어두운 배경 위 텍스트  |
| text/recommend      | `--text-recommend`      | `--blue-500`   | 추천/하이라이트 텍스트 |
| text/footer link    | `--text-footer-link`    | `--white-60`   | 푸터 링크              |
| text/footer caption | `--text-footer-caption` | `--white-50`   | 푸터 캡션              |

### Background

| Figma                    | CSS                          | 참조 Primitive  | 용도                   |
| ------------------------ | ---------------------------- | --------------- | ---------------------- |
| background/white         | `--background-white`         | `--white-100`   | 기본 배경              |
| background/grey          | `--background-grey`          | `--grey-50`     | 보조 배경              |
| background/active        | `--background-active`        | `--primary-500` | 활성 상태              |
| background/pressed       | `--background-pressed`       | `--primary-700` | Pressed 상태           |
| background/recommend     | `--background-recommend`     | `--blue-500`    | 추천 뱃지              |
| background/pick          | `--background-pick`          | `--yellow-500`  | Pick 뱃지              |
| background/update        | `--background-update`        | `--green-500`   | Update 뱃지            |
| background/primary btn   | `--background-primary-btn`   | `--grey-900`    | 주 버튼                |
| background/secondary btn | `--background-secondary-btn` | `--grey-700`    | 보조 버튼              |
| background/footer        | `--background-footer`        | `--grey-800`    | 푸터 배경              |
| background/divider       | `--background-divider`       | `--white-20`    | 어두운 배경의 디바이더 |
| background/pagenation    | `--background-pagenation`    | `--white-10`    | 페이지네이션 배경      |

### Border

| Figma            | CSS                  | 참조 Primitive  | 용도      |
| ---------------- | -------------------- | --------------- | --------- |
| border/primary   | `--border-primary`   | `--grey-900`    | 강조 보더 |
| border/secondary | `--border-secondary` | `--grey-300`    | 기본 보더 |
| border/focus     | `--border-focus`     | `--primary-600` | 포커스 링 |

### Icon

| Figma           | CSS                 | 참조 Primitive | 용도          |
| --------------- | ------------------- | -------------- | ------------- |
| icon/grey       | `--icon-grey`       | `--grey-800`   | 기본 아이콘   |
| icon/light-grey | `--icon-light-grey` | `--grey-300`   | 비활성 아이콘 |

---

## Primitive — 스페이싱

| Figma                | CSS              | 값   |
| -------------------- | ---------------- | ---- |
| Spacing/spacing-none | `--spacing-none` | 0    |
| Spacing/spacing-3xs  | `--spacing-3xs`  | 2px  |
| Spacing/spacing-xxs  | `--spacing-xxs`  | 4px  |
| Spacing/spacing-xs   | `--spacing-xs`   | 8px  |
| Spacing/spacing-sm   | `--spacing-sm`   | 12px |
| Spacing/spacing-md   | `--spacing-md`   | 16px |
| Spacing/spacing-lg   | `--spacing-lg`   | 20px |
| Spacing/spacing-xl   | `--spacing-xl`   | 24px |
| Spacing/spacing-2xl  | `--spacing-2xl`  | 32px |
| Spacing/spacing-3xl  | `--spacing-3xl`  | 40px |

## Primitive — 라디우스

| Figma              | CSS             | 값   |
| ------------------ | --------------- | ---- |
| Radius/radius-none | `--radius-none` | 0    |
| Radius/radius-xxs  | `--radius-xxs`  | 2px  |
| Radius/radius-xs   | `--radius-xs`   | 4px  |
| Radius/radius-sm   | `--radius-sm`   | 8px  |
| Radius/radius-md   | `--radius-md`   | 12px |
| Radius/radius-lg   | `--radius-lg`   | 16px |
| Radius/radius-xl   | `--radius-xl`   | 24px |

---

## Primitive — 타이포그래피

| Figma                   | CSS                                     | 값         |
| ----------------------- | --------------------------------------- | ---------- |
| font family/font family | `--font-family`                         | pretendard |
| font size/10 ~ /28      | `--font-size-10` ~ `--font-size-28`     | 10~28px    |
| line height/14 ~ /32    | `--line-height-14` ~ `--line-height-32` | 14~32px    |
| font weight/400         | `--font-weight-400`                     | 400        |
| font weight/700         | `--font-weight-700`                     | 700        |

## Semantic — 타입 램프 (Type/\*)

각 type 토큰은 `-size`, `-line-height`, `-weight` 3개 변수 묶음(일부는 `-letter-spacing` 포함).

| Figma           | CSS prefix             | size / line-height / weight           |
| --------------- | ---------------------- | ------------------------------------- |
| Type/H1Headline | `--type-h1-headline-*` | 28 / 32 / 700                         |
| Type/H2Headline | `--type-h2-headline-*` | 24 / 28 / 700                         |
| Type/S1Subtitle | `--type-s1-subtitle-*` | 18 / 20 / 700                         |
| Type/S2Subtitle | `--type-s2-subtitle-*` | 16 / 20 / 700                         |
| Type/B1Body     | `--type-b1-body-*`     | 15 / 18 / 700                         |
| Type/B2Body     | `--type-b2-body-*`     | 14 / 16 / 400                         |
| Type/B3Body     | `--type-b3-body-*`     | 14 / 16 / 700                         |
| Type/B4Body     | `--type-b4-body-*`     | 13 / 16 / 700                         |
| Type/B5Body     | `--type-b5-body-*`     | 12 / 14 / 400                         |
| Type/C1Caption  | `--type-c1-caption-*`  | 11 / 16 / 400 (letter-spacing -0.3px) |
| Type/C2Caption  | `--type-c2-caption-*`  | 10 / 16 / 400 (letter-spacing -0.3px) |

사용 예:

```css
.title {
  font-family: var(--font-family);
  font-size: var(--type-h1-headline-size);
  line-height: var(--type-h1-headline-line-height);
  font-weight: var(--type-h1-headline-weight);
}
```

---

## Semantic — 그림자

| Figma     | CSS           | 값 (offset / blur / color)     |
| --------- | ------------- | ------------------------------ |
| shadow/sm | `--shadow-sm` | `0 0 12px 0 var(--black-10)`   |
| shadow/lg | `--shadow-lg` | `0 8px 24px 0 var(--black-10)` |

---

## Claude용 규칙

1. Figma MCP가 hex 색상 반환 → 이 테이블에서 찾아서 `var(--color-name)` 사용
2. Figma가 스페이싱 숫자 반환 → `var(--spacing-*)` 매핑
3. 가능하면 **Semantic 토큰** 우선 (`--text-primary`), Primitive(`--grey-900`)는 semantic이 없을 때만
4. 테이블에 없는 값 → 새 변수 만들지 말고 `/* ⚠️ 누락된 토큰 */` 플래그
5. 타이포는 항상 size + line-height + weight 3개를 함께 지정
