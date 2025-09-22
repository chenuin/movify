import {test, expect, Request} from '@playwright/test';

const baseURL = 'https://chenuin.github.io';

test.describe('Explore Page', () => {
  test('should load more movies on infinite scroll', async ({page}) => {
    const requests: Request[] = [];

    await page.route('**/discover/movie*', route => {
      route.continue();
      requests.push(route.request());
    });

    // 1. 導航到探索頁面
    await page.goto(`${baseURL}/movify/#/movie/explore`);

    // 2. 等待初始電影卡片載入
    const initialMovieCards = page.locator('.ant-card');
    await initialMovieCards.first().waitFor();
    const initialCount = await initialMovieCards.count();
    const firstUrl = new URL(requests[0].url());

    expect(firstUrl.searchParams.get('page')).toBe('1');
    expect(initialCount).toBeGreaterThan(0);
    expect(requests.length).toBe(1);

    // 3. 向下滾動頁面來觸發無限滾動
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // 4. 等待載入中的旋轉圖標出現，正在獲取下一頁
    const loadingSpinner = page.locator('.ant-spin');
    await expect(loadingSpinner).toBeVisible();

    // 5. 第二次請求被發送
    await page.waitForResponse(response => response.url().includes('discover/movie') && response.status() === 200);
    await expect(loadingSpinner).not.toBeVisible();

    // 6. 驗證第二次請求的 page 參數、電影卡片的數量已增加
    expect(requests.length).toBe(2);
    const secondUrl = new URL(requests[1].url());
    expect(secondUrl.searchParams.get('page')).toBe('2');

    const newCount = await initialMovieCards.count();
    expect(newCount).toBeGreaterThan(initialCount);
  });
});
