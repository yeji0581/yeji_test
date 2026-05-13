import StyleDictionary from "style-dictionary";

// ── 커스텀 Dart 포맷: AppColors 클래스 ──
StyleDictionary.registerFormat({
  name: "flutter/colors.dart",
  format: ({ dictionary }) => {
    const lines = dictionary.allTokens
      .filter((token) => token.type === "color")
      .map((token) => {
        const hex = token.value.replace("#", "").toUpperCase();
        const name = token.path.slice(1).join("_").replace(/-/g, "_");
        // camelCase 변환
        const camelName = name.replace(/_([a-z0-9])/g, (_, c) =>
          c.toUpperCase(),
        );
        return `  static const ${camelName} = Color(0xFF${hex});`;
      });
    return [
      "// 이 파일은 Style Dictionary가 자동 생성합니다. 직접 수정하지 마세요.",
      "// 원본: tokens/*.json",
      "// 생성: npm run build:tokens",
      "",
      "import 'dart:ui';",
      "",
      "class AppColors {",
      ...lines,
      "}",
      "",
    ].join("\n");
  },
});

// ── 커스텀 Dart 포맷: AppSpacing, AppRadius 클래스 ──
// Dart 식별자는 숫자로 시작할 수 없고, Dart에는 rem/px 같은 단위 리터럴이 없다.
// spacing/radius의 "3xs/2xl/3xl"은 의미적 alias로, font.size의 "10/11/..."은 "size" prefix로 변환한다.
const SPACING_RADIUS_ALIAS = { "3xs": "xxxs", "2xl": "xxl", "3xl": "xxxl" };

const sanitizeIdentifier = (name, category) => {
  if (category === "spacing" || category === "radius") {
    if (SPACING_RADIUS_ALIAS[name]) return SPACING_RADIUS_ALIAS[name];
  }
  if (/^[0-9]/.test(name)) return `size${name}`;
  return name;
};

const toDartDouble = (rawValue) => {
  const num = parseFloat(rawValue);
  if (Number.isNaN(num)) return `${rawValue}`;
  return Number.isInteger(num) ? `${num}.0` : `${num}`;
};

StyleDictionary.registerFormat({
  name: "flutter/dimensions.dart",
  format: ({ dictionary }) => {
    const buildLine = (token, sliceFrom, category) => {
      const raw = token.path.slice(sliceFrom).join("_").replace(/-/g, "_");
      const aliased = sanitizeIdentifier(raw, category);
      const camelName = aliased.replace(/_([a-z0-9])/g, (_, c) =>
        c.toUpperCase(),
      );
      return `  static const double ${camelName} = ${toDartDouble(token.value)};`;
    };

    const spacingLines = dictionary.allTokens
      .filter((token) => token.path[0] === "spacing")
      .map((token) => buildLine(token, 1, "spacing"));

    const radiusLines = dictionary.allTokens
      .filter((token) => token.path[0] === "radius")
      .map((token) => buildLine(token, 1, "radius"));

    const fontSizeLines = dictionary.allTokens
      .filter((token) => token.path[0] === "font" && token.path[1] === "size")
      .map((token) => buildLine(token, 2, "font.size"));

    return [
      "// 이 파일은 Style Dictionary가 자동 생성합니다. 직접 수정하지 마세요.",
      "// 원본: tokens/*.json",
      "// 생성: npm run build:tokens",
      "",
      "class AppSpacing {",
      ...spacingLines,
      "}",
      "",
      "class AppRadius {",
      ...radiusLines,
      "}",
      "",
      "class AppTypography {",
      ...fontSizeLines,
      "}",
      "",
    ].join("\n");
  },
});

// ── 빌드 설정 ──
const sd = new StyleDictionary({
  source: ["tokens/**/*.json"],
  platforms: {
    // CSS 출력 (React용)
    // dimension 값은 size/px로 변환해 px 단위를 붙인다.
    // size/rem(css transformGroup 기본)은 px→rem 변환 없이 단위만 붙여 4 → 4rem(64px)이 되는 문제가 있음.
    css: {
      transforms: [
        "attribute/cti",
        "name/kebab",
        "time/seconds",
        "html/icon",
        "size/px",
        "color/css",
      ],
      buildPath: "src/tokens/",
      files: [
        {
          destination: "_generated.css",
          format: "css/variables",
          options: {
            outputReferences: true, // var(--xxx) 참조 구조 유지
          },
        },
      ],
    },
    // Dart 출력 (Flutter용) — Flutter 프로젝트가 있을 때만 사용
    flutter: {
      transformGroup: "js",
      buildPath: "flutter_output/",
      files: [
        {
          destination: "app_colors.dart",
          format: "flutter/colors.dart",
          filter: (token) => token.type === "color",
        },
        {
          destination: "app_dimensions.dart",
          format: "flutter/dimensions.dart",
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
console.log("\n✅ Style Dictionary 빌드 완료");
console.log("   CSS → src/tokens/_generated.css");
console.log("   Dart → flutter_output/app_colors.dart, app_dimensions.dart");
