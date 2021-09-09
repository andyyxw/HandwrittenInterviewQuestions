/**
 * 插入排序
 * @param {Number[]} nums 目标数组
 */
function insertSort (nums) {
  const length = nums.length
  for (let i = 1; i < length; i++) {
    const n = nums[i]
    let j = i - 1
    while (j >= 0 && nums[j] > n) {
      nums[j + i] = nums[j]
      j--
    }
    nums[j + 1] = n
  }
  return nums
}

export default insertSort
