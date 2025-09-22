import type {Movie} from '@/hooks/types';

export const getImageUrl = (baseUrl: string, size: string, path: string) => (
  [baseUrl, size, path].join('')
);

export const convertToFiveStarRating = (score: number) => {
  // 檢查輸入是否為有效數字
  if (typeof score !== 'number' || score < 0 || score > 10) {
    throw new Error('輸入的分數必須是一個介於 0 到 10 之間的數字。');
  }

  // 將 10 分制的分數轉換為 5 分制
  const convertedScore = (score / 10) * 5;

  // 為了精確度，將結果四捨五入到一位小數
  return parseFloat(convertedScore.toFixed(1));
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getRandomItems = <T extends Movie>(arr: T[], num: number): T[] => {
  // 複製一份陣列，避免修改原始陣列
  const shuffled = [...arr].filter(({backdrop_path}) => backdrop_path);
  let i = shuffled.length;
  let temp;
  let randomIndex;

  // 當陣列中還有元素時...
  while (i !== 0) {
    // 隨機選取一個未處理的元素
    randomIndex = Math.floor(Math.random() * i);
    i--;

    // 將該元素與當前元素交換位置
    temp = shuffled[i];
    shuffled[i] = shuffled[randomIndex];
    shuffled[randomIndex] = temp;
  }

  // 回傳前面 n 個元素
  return shuffled.slice(0, num);
};
