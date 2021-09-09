/**
 * 360前端面试笔试题：获得最长连续打卡天数
 */
// 有 N 天未打卡及漏打卡数组 missDays，有 M 张补打卡，总共有 allDays 天，使用补打卡，获得最长连续打卡天数。
// 例如：
// 输入：5, [10, 30, 55, 56, 90], 2, 120
// 输出：65
// 代码示例：
// const getLongest = (M, missDays, N, allDays) => {
// }
// getLongest(5, [11, 32, 53, 84, 95], 2, 120) // 72
// getLongest(5, [11, 32, 53, 84, 95], 3, 120) // 88
// getLongest(5, [11, 32, 53, 84, 95], 6, 120) // 120

function getLongest (missDays, N, allDays) {
  if (N >= missDays.length) return allDays
  missDays = [0, ...missDays, allDays + 1]
  const missAreas = []
  for (let i = 1; i < missDays.length; i++) {
    missAreas.push(missDays[i] - missDays[i - 1] - 1)
  }

  let result = 0
  let sum = 0
  const queue = []
  for (const d of missAreas) {
    if (queue.length === N + 1) {
      sum -= queue.shift() || 0
    }
    queue.push(d)
    sum += d
    result = Math.max(sum, result)
  }
  return result + N
};

export default getLongest
