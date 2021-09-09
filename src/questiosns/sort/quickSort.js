/**
 * 快速排序（递归实现）
 * @param {Number[]} nums 目标数组
 */
function quickSort (nums) {
  if (nums.length <= 1) return nums

  const midValue = nums[nums.length >> 1]
  const left = []
  const mid = []
  const right = []
  for (const v of nums) {
    if (v < midValue) {
      left.push(v)
    } else if (v === midValue) {
      mid.push(v)
    } else if (v > midValue) {
      right.push(v)
    }
  }
  return [...quickSort(left), ...mid, ...quickSort(right)]
}

/**
 * 快速排序（递归实现，原地排序）
 * @param {Number[]} nums 目标数组
 */
function quickSort2 (nums, left = 0, right = nums.length - 1) {
  if (left >= right) return nums
  let i = left
  let j = right
  let flag = left
  while (i < j) {
    while (nums[j] >= nums[flag] && i < j) j--
    if (i >= j) break
    while (nums[i] <= nums[flag] && i < j) i++
    [nums[flag], nums[j], nums[i]] = [nums[j], nums[i], nums[flag]]
    flag = i
  }
  quickSort2(nums, left, flag - 1)
  quickSort2(nums, flag + 1, right)
  return nums
}

/**
 * 快速排序（非递归实现，原地排序）
 * @param {Number[]} nums 目标数组
 */
function quickSort3 (nums, left = 0, right = nums.length - 1) {
  if (left >= right) return nums

  const stack = [[left, right]]
  while (stack.length > 0) {
    const now = stack.pop() || [] // 弹出list末尾。(也可用list.shift()取出list第一个数组，但在数据量较大时，这种方式效率较低)
    if (now[0] >= now[1]) continue

    let i = now[0]
    let j = now[1]
    let flag = now[0]
    // 以下与递归方法相同，请参考上面的递归详解
    while (i < j) {
      while (nums[j] >= nums[flag] && i < j) j--
      if (i >= j) break
      while (nums[i] <= nums[flag] && i < j) i++
      [nums[flag], nums[j], nums[i]] = [nums[j], nums[i], nums[flag]]
      flag = i
    }
    stack.push([now[0], flag - 1]) // 将flag左边数组作为待排序数组，只需将左右指针放入list即可。
    stack.push([flag + 1, now[1]]) // 将flag右边数组作为待排序数组，只需将左右指针放入list即可。
  }
  return nums
}

export { quickSort, quickSort2, quickSort3 }
