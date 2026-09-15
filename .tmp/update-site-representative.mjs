import { readFileSync, writeFileSync } from 'node:fs';

const file = 'index.html';
let text = readFileSync(file, 'utf8');
const old = `  <meta name="description" content="스타세이비어 구원자별 PVE 장비와 아르카나 조합을 확인하는 비공식 가이드 데이터베이스">
  <meta name="theme-color" content="#0d111b">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>스타세이비어 구원자 가이드 DB</title>
  <link rel="icon" href="./favicon.svg" type="image/svg+xml">`;
const updated = `  <meta name="description" content="스타세이비어 구원자별 PVE 장비와 아르카나 조합을 확인하는 비공식 가이드 데이터베이스">
  <meta name="theme-color" content="#0d111b">
  <meta property="og:type" content="website">
  <meta property="og:title" content="스타세이비어 구원자 가이드 DB">
  <meta property="og:description" content="스타세이비어 구원자별 PVE 장비와 아르카나 조합을 확인하는 비공식 가이드 데이터베이스">
  <meta property="og:url" content="https://starsavior-guide.github.io/">
  <meta property="og:image" content="https://starsavior-guide.github.io/images/home-button.png?v=20260915">
  <meta property="og:image:alt" content="스타세이비어 구원자 가이드 DB 대표 이미지">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="스타세이비어 구원자 가이드 DB">
  <meta name="twitter:description" content="스타세이비어 구원자별 PVE 장비와 아르카나 조합을 확인하는 비공식 가이드 데이터베이스">
  <meta name="twitter:image" content="https://starsavior-guide.github.io/images/home-button.png?v=20260915">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>스타세이비어 구원자 가이드 DB</title>
  <link rel="icon" href="./images/home-button.png?v=20260915" type="image/png">
  <link rel="apple-touch-icon" href="./images/home-button.png?v=20260915">`;
if (!text.includes(old)) {
  if (text.includes('property="og:image"') && text.includes('images/home-button.png')) {
    console.log('Representative image metadata already applied.');
    process.exit(0);
  }
  throw new Error('index metadata marker not found');
}
text = text.replace(old, updated);
writeFileSync(file, text, 'utf8');
