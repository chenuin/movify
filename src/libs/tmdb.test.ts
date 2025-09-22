import {describe, it, expect, vi} from 'vitest';
import {
  getImageUrl,
  convertToFiveStarRating,
  formatCurrency,
  getRandomItems,
} from './tmdb';
import type {Movie} from '@/hooks/types';

describe('getImageUrl', () => {
  it('應該正確地將三個字串拼接成一個 URL', () => {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const size = 'w500';
    const path = '/example.jpg';
    const expectedUrl = 'https://image.tmdb.org/t/p/w500/example.jpg';
    
    expect(getImageUrl(baseUrl, size, path)).toBe(expectedUrl);
  });

  it('當有參數為空字串時，也應該能正確拼接', () => {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const size = '';
    const path = '/example.jpg';
    const expectedUrl = 'https://image.tmdb.org/t/p//example.jpg';

    expect(getImageUrl(baseUrl, size, path)).toBe(expectedUrl);
  });
});

describe('convertToFiveStarRating', () => {
  it('應該將 10 分制的分數正確轉換為 5 分制', () => {
    expect(convertToFiveStarRating(10)).toBe(5);
    expect(convertToFiveStarRating(7.5)).toBe(3.8); // (7.5 / 10) * 5 = 3.75 -> toFixed(1) -> 3.8
    expect(convertToFiveStarRating(5)).toBe(2.5);
    expect(convertToFiveStarRating(0)).toBe(0);
  });

  it('應該將結果四捨五入到一位小數', () => {
    expect(convertToFiveStarRating(8.66)).toBe(4.3); // 4.33 -> 4.3
    expect(convertToFiveStarRating(9.99)).toBe(5.0); // 4.995 -> 5.0
  });

  it('當分數小於 0 時應該拋出錯誤', () => {
    expect(() => convertToFiveStarRating(-1)).toThrow('輸入的分數必須是一個介於 0 到 10 之間的數字。');
  });

  it('當分數大於 10 時應該拋出錯誤', () => {
    expect(() => convertToFiveStarRating(11)).toThrow('輸入的分數必須是一個介於 0 到 10 之間的數字。');
  });
});

describe('formatCurrency', () => {
  it('應該將數字格式化為美元貨幣字串', () => {
    expect(formatCurrency(1234567)).toBe('$1,234,567');
  });

  it('應該正確處理 0', () => {
    expect(formatCurrency(0)).toBe('$0');
  });

  it('應該省略小數位', () => {
    // 根據 minimumFractionDigits: 0，小數會被四捨五入
    expect(formatCurrency(99.99)).toBe('$100');
    expect(formatCurrency(123.45)).toBe('$123');
  });
});

describe('getRandomItems', () => {
  // 準備模擬資料
  const mockMovies = [
    {id: 1, title: 'Movie A', backdrop_path: '/path1.jpg', vote_average: 8},
    {id: 2, title: 'Movie B', backdrop_path: '/path2.jpg', vote_average: 7},
    {id: 3, title: 'Movie C (no backdrop)', backdrop_path: null, vote_average: 6},
    {id: 4, title: 'Movie D', backdrop_path: '/path4.jpg', vote_average: 9},
    {id: 5, title: 'Movie E', backdrop_path: '/path5.jpg', vote_average: 5},
  ] as Movie[];
  const validMovies = mockMovies.filter(m => m.backdrop_path);

  it('應該回傳指定數量的項目', () => {
    const result = getRandomItems(mockMovies, 2);
    expect(result.length).toBe(2);
  });

  it('回傳的項目不應該包含 backdrop_path 為空的項目', () => {
    const result = getRandomItems(mockMovies, 5);
    // 檢查結果中是否包含 id 為 3 的電影
    const hasMovieC = result.some((movie) => movie.id === 3);
    expect(hasMovieC).toBe(false);
  });

  it('不應該修改原始陣列', () => {
    const originalMovies = [...mockMovies];
    getRandomItems(mockMovies, 2);
    expect(mockMovies).toEqual(originalMovies);
  });

  it('當要求的數量大於有效項目數量時，應該回傳所有有效項目', () => {
    const result = getRandomItems(mockMovies, 10);
    expect(result.length).toBe(validMovies.length);
  });

  it('處理空陣列的輸入', () => {
    const result = getRandomItems([], 5);
    expect(result.length).toBe(0);
    expect(result).toEqual([]);
  });

  it('使用 mock 指定 Math.floor 回傳值', () => {
    const spy = vi.spyOn(Math, 'floor').mockReturnValue(0);

    const result = getRandomItems(validMovies, 2);

    const expectedIds = [2, 4];
    const resultIds = result.map(m => m.id);

    expect(resultIds).toEqual(expectedIds);

    spy.mockRestore();
  });
});
