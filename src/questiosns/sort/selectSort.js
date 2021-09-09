/**
 * 选择排序
 * @param {Number[]} nums 目标数组
 */
function selectSort (nums) {
  for (let i = 0; i < nums.length; i++) {
    let min = i
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[min]) {
        min = j
      }
    }
    [nums[min], nums[i]] = [nums[i], nums[min]]
  }

  return nums
}

export default selectSort
